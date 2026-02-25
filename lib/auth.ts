import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "blog_admin_token";
const MAX_AGE = 60 * 60 * 24; // 24 hours

function getSecret() {
  const secret = process.env.BLOG_ADMIN_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("BLOG_ADMIN_SECRET must be set and at least 32 characters");
  }
  return new TextEncoder().encode(secret);
}

export async function createBlogAdminToken(): Promise<string> {
  return new SignJWT({ purpose: "blog-admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(getSecret());
}

export async function verifyBlogAdminToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

export function getBlogAdminCookieAttributes() {
  return {
    name: COOKIE_NAME,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      maxAge: MAX_AGE,
      path: "/",
    },
  };
}

export { COOKIE_NAME };
