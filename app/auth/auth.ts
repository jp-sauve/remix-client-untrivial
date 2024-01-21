import { type DataFunctionArgs, createCookie, redirect } from "@remix-run/node";

let secret = process.env.COOKIE_SECRET || 'default'

if (secret === 'default') {
  console.warn("No COOKIE_SECRET set, the app is insecure!");
  secret = 'unsecret'
}

let cookie = createCookie("auth", {
  secrets: [secret],
  // 30 days
  maxAge: 30 * 24 * 60 * 60,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
});

export async function createAccount(email: string, password: string) {
  console.log(`Create new user, id 1`)
  return { id: 1 }
}

export async function getAuthFromRequest(
  request: Request,
): Promise<string | null> {
  let userId = await cookie.parse(request.headers.get("Cookie"));
  return userId ?? null;
}