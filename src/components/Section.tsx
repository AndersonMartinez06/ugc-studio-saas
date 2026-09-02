"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <Reveal className="mx-auto mb-14 max-w-[640px] text-center min-[1920px]:max-w-[780px]">
      {eyebrow && (
        <span className="mb-3 inline-block font-mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-accent-soft">
          {eyebrow}
        </span>
      )}
      <h2 className="text-[clamp(1.9rem,4.2vw,2.9rem)] font-extrabold min-[1920px]:text-[3.6rem]">{title}</h2>
      {subtitle && (
        <p className="mt-3.5 text-[1.03rem] text-text-mid min-[1920px]:text-[1.25rem]">{subtitle}</p>
      )}
    </Reveal>
  );
}
