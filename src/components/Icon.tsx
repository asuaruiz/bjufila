import {
  Building2,
  UtensilsCrossed,
  Stethoscope,
  Store,
  Sparkles,
  HardHat,
  ShieldCheck,
  Clock,
  Leaf,
  MessageSquare,
  ClipboardCheck,
  BadgeDollarSign,
  type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  Building2,
  UtensilsCrossed,
  Stethoscope,
  Store,
  Sparkles,
  HardHat,
  ShieldCheck,
  Clock,
  Leaf,
  MessageSquare,
  ClipboardCheck,
  BadgeDollarSign,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = MAP[name] ?? Sparkles;
  return <Cmp className={className} strokeWidth={1.6} aria-hidden />;
}
