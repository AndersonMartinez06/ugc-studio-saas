import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { createClient as createAdminClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

/** Cliente ligado a la sesión del usuario (respeta RLS). Uso en Server Components / Route Handlers. */
export function createClient() {
  const cookieStore = cookies();
  return createServerClient(URL, ANON, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(
        cookiesToSet: { name: string; value: string; options: CookieOptions }[],
      ) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // llamado desde un Server Component: ignorable si hay middleware refrescando sesión
        }
      },
    },
  });
}

/**
 * Cliente con service_role: OMITE RLS. Úsalo SOLO en el servidor
 * (webhooks, jobs). Nunca lo importes en un componente cliente.
 */
export function createServiceClient() {
  return createAdminClient(URL, SERVICE, { auth: { persistSession: false } });
}
