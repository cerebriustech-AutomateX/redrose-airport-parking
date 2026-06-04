"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AnimatedWords } from "@/components/AnimatedText";

export type ServiceCardItem = {
  number: string;
  title: string;
  description: string;
};

type ServiceCardProps = {
  item: ServiceCardItem;
  index?: number;
};

export default function ServiceCard({ item, index = 0 }: ServiceCardProps) {
  const reduceMotion = useReducedMotion();

  const card = (
    <article className="services-card">
      <span className="services-card-number">{item.number}</span>
      <h3 className="services-card-title">
        <AnimatedWords text={item.title} delay={index * 0.04} />
      </h3>
      <p className="services-card-body">
        <AnimatedWords text={item.description} delay={0.08 + index * 0.04} />
      </p>
    </article>
  );

  if (reduceMotion) {
    return card;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: 0.55,
        delay: 0.08 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {card}
    </motion.div>
  );
}
