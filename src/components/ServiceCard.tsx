"use client";

import { motion, useReducedMotion } from "framer-motion";

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
      <h3 className="services-card-title">{item.title}</h3>
      <p className="services-card-body">{item.description}</p>
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
