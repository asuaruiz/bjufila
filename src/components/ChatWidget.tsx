import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { SITE } from "../lib/site";
import { useLang } from "../lib/useTranslation";
import { sendChatMessage, submitQuote, type ChatMessage, type ChatLead } from "../lib/supabase";

function whatsappLink(message: string) {
  const digits = SITE.phoneHref.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

function getSessionId() {
  const key = "bjufila_chat_session";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

const STARTERS_EN = ["What areas do you serve?", "How much does it cost?", "I'd like a quote"];
const STARTERS_ES = ["¿Qué zonas cubren?", "¿Cuánto cuesta?", "Quiero una cotización"];

export function ChatWidget() {
  const { lang } = useLang();
  const es = lang === "es";
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [errored, setErrored] = useState(false);
  const [lead, setLead] = useState<ChatLead | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const seeded = useRef(false);

  useEffect(() => {
    if (!open || seeded.current) return;
    seeded.current = true;
    setMessages([
      {
        role: "assistant",
        content: es
          ? "¡Hola! 👋 Soy el asistente de BJUFILA. Pregúntame lo que quieras, o cuéntame qué servicio buscas."
          : "Hi! 👋 I'm the BJUFILA assistant. Ask me anything, or tell me what service you're looking for.",
      },
    ]);
  }, [open, es]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking, lead]);

  async function send(text: string) {
    const clean = text.trim();
    if (!clean || thinking) return;
    setInput("");
    setErrored(false);
    const next = [...messages, { role: "user" as const, content: clean }];
    setMessages(next);
    setThinking(true);
    try {
      const { reply, lead: capturedLead } = await sendChatMessage(next, getSessionId(), lang);
      if (reply) setMessages((m) => [...m, { role: "assistant", content: reply }]);
      if (capturedLead) {
        setLead(capturedLead);
        submitQuote({
          name: capturedLead.name,
          email: "",
          phone: capturedLead.phone,
          service_type: capturedLead.service,
          message: "Captured via AI chatbot widget",
        }).catch(() => {});
      }
    } catch {
      setErrored(true);
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: es
            ? `Tuve un problema para responder. Llámanos al ${SITE.phone} o escríbenos por WhatsApp.`
            : `I had trouble replying. Call us at ${SITE.phone} or message us on WhatsApp.`,
        },
      ]);
    } finally {
      setThinking(false);
    }
  }

  const starters = es ? STARTERS_ES : STARTERS_EN;

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-[60] grid h-14 w-14 place-items-center rounded-full bg-royal-600 text-white shadow-[0_10px_30px_-8px_rgba(30,79,214,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-royal-500 sm:bottom-6 sm:right-6"
        aria-label={open ? (es ? "Cerrar chat" : "Close chat") : (es ? "Abrir chat" : "Open chat")}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-[60] flex h-[520px] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-navy-900/10 sm:bottom-28 sm:right-6">
          <div className="flex items-center gap-3 bg-navy-950 px-5 py-4 text-white">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-royal-600">
              <MessageCircle className="h-4 w-4" />
            </div>
            <div>
              <div className="font-display text-sm font-bold">BJUFILA</div>
              <div className="text-xs text-white/60">{es ? "Asistente con IA" : "AI assistant"}</div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user" ? "bg-royal-600 text-white" : "bg-mist text-navy-900"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {thinking && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl bg-mist px-4 py-2.5 text-sm text-muted">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  {es ? "Escribiendo…" : "Typing…"}
                </div>
              </div>
            )}

            {messages.length === 1 && !thinking && (
              <div className="flex flex-wrap gap-2 pt-1">
                {starters.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-royal-500/30 bg-royal-50 px-3.5 py-2 text-xs font-semibold text-royal-600 transition-colors hover:bg-royal-100"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {lead && (
              <a
                href={whatsappLink(
                  es
                    ? `Hola BJUFILA! Soy ${lead.name}. Mi teléfono es ${lead.phone}. Necesito el servicio de: ${lead.service}.`
                    : `Hi BJUFILA! I'm ${lead.name}. My phone is ${lead.phone}. I need: ${lead.service}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4" /> {es ? "Abrir WhatsApp" : "Open WhatsApp"}
              </a>
            )}

            {errored && (
              <a
                href={whatsappLink(es ? "Hola BJUFILA, tengo una pregunta." : "Hi BJUFILA, I have a question.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            )}
          </div>

          <div className="flex items-center gap-2 border-t border-mist px-3 py-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder={es ? "Escribe tu mensaje…" : "Type your message…"}
              disabled={thinking}
              className="flex-1 rounded-full border border-navy-900/12 bg-white px-4 py-2.5 text-sm text-navy-900 placeholder:text-muted/70 focus:border-royal-500 focus:outline-none focus:ring-4 focus:ring-royal-500/12 disabled:opacity-60"
            />
            <button
              onClick={() => send(input)}
              disabled={thinking || !input.trim()}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-royal-600 text-white transition-transform hover:-translate-y-0.5 disabled:opacity-50"
              aria-label={es ? "Enviar" : "Send"}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
