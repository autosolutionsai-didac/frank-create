// Server-side access guard. Lovable owns auth (Bearer-token middleware); this
// preserves the original "@frankbody.com only" restriction by checking the
// verified JWT claims handed to us by `requireSupabaseAuth`. Robust enforcement
// (rejecting accounts at sign-up) belongs in Supabase Auth config; this is the
// app-level backstop.

const ALLOWED_DOMAIN = "frankbody.com";
const ALLOWLIST = new Set<string>([
  // Add explicit non-domain emails here if ever needed.
]);

export function assertAllowedEmail(claims: unknown): void {
  const email = (claims as { email?: unknown } | null | undefined)?.email;
  // If the token carries no email we can't decide here — don't block (rely on
  // Supabase-level domain config); RLS still scopes all data to this user.
  if (typeof email !== "string") return;
  const e = email.toLowerCase();
  if (e.endsWith(`@${ALLOWED_DOMAIN}`) || ALLOWLIST.has(e)) return;
  throw new Error("Access is restricted to Frank Body accounts.");
}
