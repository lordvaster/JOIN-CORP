import "server-only";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "join_admin_token";
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 12; // 12 jam, samakan dengan access_token_expire_minutes di FastAPI

export async function getAdminToken(): Promise<string | null> {
  return (await cookies()).get(ADMIN_COOKIE)?.value ?? null;
}
