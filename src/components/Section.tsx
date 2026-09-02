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
  title,
  subtitle,
}: {
  title: React.ReactNode;
  subtitle: string;
}) {
  return (
    <Reveal className="mx-auto mb-14 max-w-[640px] text-center">
      <h2 className="text-[clamp(1.9rem,4.2vw,2.9rem)] font-semibold">{title}</h2>
      <p className="mt-3.5 text-[1.03rem] text-text-mid">{subtitle}</p>
    </Reveal>
  );
}
