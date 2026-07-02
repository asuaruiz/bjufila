import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

type BtnProps = {
  children: React.ReactNode;
  to?: string;
  href?: string;
  variant?: "primary" | "ghost" | "white" | "outline";
  size?: "md" | "lg";
  className?: string;
  arrow?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({
  children,
  to,
  href,
  variant = "primary",
  size = "md",
  className = "",
  arrow = false,
  type = "button",
  disabled,
  onClick,
}: BtnProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-royal-500/30 disabled:opacity-60 disabled:cursor-not-allowed";
  const sizes = size === "lg" ? "px-7 py-4 text-[15px]" : "px-5 py-3 text-sm";
  const variants: Record<string, string> = {
    primary:
      "bg-royal-600 text-white shadow-[0_10px_30px_-8px_rgba(30,79,214,0.6)] hover:bg-royal-500 hover:shadow-[0_16px_40px_-10px_rgba(30,79,214,0.7)] hover:-translate-y-0.5",
    white:
      "bg-white text-navy-900 shadow-soft hover:-translate-y-0.5 hover:shadow-lift",
    outline:
      "border border-navy-900/15 bg-white/60 text-navy-900 hover:border-royal-500/40 hover:bg-white",
    ghost: "text-white/90 hover:text-white",
  };
  const cls = `${base} ${sizes} ${variants[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.2} />
      )}
    </>
  );
  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  if (href) return <a href={href} className={cls}>{inner}</a>;
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] ${
        light ? "text-royal-100" : "text-royal-600"
      }`}
    >
      <span className={`h-px w-6 ${light ? "bg-royal-400" : "bg-flag-red"}`} />
      {children}
    </span>
  );
}
