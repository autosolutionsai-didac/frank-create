// Frank Create – Image generation via Lovable AI Gateway.
// Public function: accepts { prompt, count } and returns { images: dataUrl[] }.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) {
    return json({ error: "LOVABLE_API_KEY not configured" }, 500);
  }

  let body: { prompt?: string; count?: number; model?: string } = {};
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const prompt = (body.prompt ?? "").trim();
  if (!prompt) return json({ error: "prompt is required" }, 400);

  const count = Math.min(Math.max(Number(body.count) || 1, 1), 4);
  const model = body.model || "google/gemini-2.5-flash-image";

  const images: string[] = [];
  const errors: string[] = [];

  for (let i = 0; i < count; i++) {
    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: prompt }],
          modalities: ["image", "text"],
        }),
      });

      if (res.status === 429) return json({ error: "Rate limit hit. Try again shortly." }, 429);
      if (res.status === 402) return json({ error: "Lovable AI credits exhausted." }, 402);

      if (!res.ok) {
        const text = await res.text();
        errors.push(`status ${res.status}: ${text.slice(0, 200)}`);
        continue;
      }

      const data = await res.json();
      const imageUrl: string | undefined = data?.choices?.[0]?.message?.images?.[0]?.image_url?.url;
      if (imageUrl) images.push(imageUrl);
      else errors.push("no image in response");
    } catch (err) {
      errors.push(err instanceof Error ? err.message : String(err));
    }
  }

  if (!images.length) {
    return json({ error: "Generation failed", details: errors }, 502);
  }

  return json({ images, errors: errors.length ? errors : undefined });
});

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
