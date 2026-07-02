import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(url, key, {
  auth: { persistSession: false },
});

export type QuotePayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_type?: string;
  facility_type?: string;
  square_footage?: string;
  frequency?: string;
  message?: string;
};

export async function submitQuote(payload: QuotePayload) {
  const { error } = await supabase.from("bjufila_quotes").insert([{ ...payload }]);
  if (error) throw error;
  // Fire confirmation + sales notification email (best-effort — never blocks the lead capture).
  try {
    await supabase.functions.invoke("bjufila-quote-notify", { body: payload });
  } catch {
    /* email is non-critical; the lead is already saved */
  }
}

export async function subscribe(email: string) {
  const { error } = await supabase.from("bjufila_subscribers").insert([{ email }]);
  // Ignore duplicate email uniqueness violations gracefully
  if (error && !`${error.message}`.toLowerCase().includes("duplicate")) throw error;
}
