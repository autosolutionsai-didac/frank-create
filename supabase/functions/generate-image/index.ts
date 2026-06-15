// Streams Lovable AI Gateway image generation to the client as SSE.
// Supports three models: nano-banana-pro, nano-banana-2 (Gemini) and gpt-image-2 (OpenAI).

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type Body = {
  prompt: string;
  model?: "nano-banana-pro" | "nano-banana-2" | "gpt-image-2";
  size?: string;
  reference_images?: string[]; // data URLs for Gemini edits
};

const MODEL_MAP: Record<string, string> = {
  "nano-banana-pro": "google/gemini-3-pro-image-preview",
  "nano-banana-2": "google/gemini-3.1-flash-image-preview",
  "gpt-image-2": "openai/gpt-image-2",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405, headers: corsHeaders });

  const key = Deno.env.get("LOVABLE_API_KEY");
  if (!key) {
    return new Response(JSON.stringify({ error: "LOVABLE_API_KEY missing" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const prompt = (body.prompt ?? "").trim();
  if (!prompt) {
    return new Response(JSON.stringify({ error: "prompt required" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const modelKey = body.model ?? "nano-banana-pro";
  const upstreamModel = MODEL_MAP[modelKey];
  if (!upstreamModel) {
    return new Response(JSON.stringify({ error: `unknown model ${modelKey}` }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Build per-model body
  let upstreamBody: Record<string, unknown>;
  if (upstreamModel.startsWith("openai/")) {
    upstreamBody = {
      model: upstreamModel,
      prompt,
      size: body.size ?? "1024x1024",
      quality: "low",
      n: 1,
      stream: true,
      partial_images: 1,
    };
  } else {
    // Gemini chat-completions image shape
    const content: Array<Record<string, unknown>> = [{ type: "text", text: prompt }];
    for (const url of body.reference_images ?? []) {
      content.push({ type: "image_url", image_url: { url } });
    }
    upstreamBody = {
      model: upstreamModel,
      messages: [{ role: "user", content: content.length === 1 ? prompt : content }],
      modalities: ["image", "text"],
      stream: true,
    };
  }

  const upstream = await fetch("https://ai.gateway.lovable.dev/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(upstreamBody),
  });

  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text().catch(() => "");
    return new Response(
      JSON.stringify({ error: `Upstream ${upstream.status}: ${text.slice(0, 500)}` }),
      { status: upstream.status, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  return new Response(upstream.body, {
    headers: {
      ...corsHeaders,
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    },
  });
});
