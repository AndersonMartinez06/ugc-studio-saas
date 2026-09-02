import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient as createAdminClient } from "@supabase/supabase-js";

// Fallbacks a "" para que el build no rompa cuando faltan las llaves.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

type CookieItem = {
  name: string;
  value: string;
  options?: Record<string, unknown>;
};

/** Cliente ligado a la sesión del usuario (respeta RLS). Uso en Server Components / Route Handlers. */
export function createClient() {
  const cookieStore = cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: CookieItem[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set({ name, value, ...(options || {}) });
          });
        } catch {
          // Server Component: el middleware se encarga de refrescar la sesión.
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
  return createAdminClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });
}
