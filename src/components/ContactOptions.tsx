"use client";

import { useSearchParams } from "next/navigation";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { contact, telHref, whatsappHref } from "@/data/programmes";

/** The two contact cards. `topic` (from "Enquire about …" links) is added to the WhatsApp message. */
export function ContactCards({ topic }: { topic: string | null }) {
  const cards = [
    {
      href: whatsappHref(topic),
      icon: MessageCircle,
      title: "Send a message",
      text: topic ? `Start a WhatsApp conversation about ${topic}.` : "Start a WhatsApp conversation.",
    },
    {
      href: telHref(contact.phone),
      icon: Phone,
      title: "Call an advisor",
      text: contact.phone,
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <a
            key={card.title}
            href={card.href}
            data-delay={index}
            className="reveal card-rule group relative flex flex-col rounded-lg border border-slate-200 bg-white p-7 sm:p-8"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-ink-900 text-white transition-colors duration-300 group-hover:bg-brand-600">
              <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
            </span>
            <span className="mt-6 font-display text-[1.35rem] font-semibold text-ink-900">{card.title}</span>
            <span className="mt-2 text-[16px] font-medium leading-6 text-slate-700">{card.text}</span>
            <ArrowRight
              aria-hidden="true"
              className="absolute right-6 top-7 h-5 w-5 text-slate-400 transition-all duration-300 ease-out-soft group-hover:translate-x-1 group-hover:text-ink-900"
            />
          </a>
        );
      })}
    </div>
  );
}

export default function ContactOptions() {
  const topic = useSearchParams().get("topic");
  return <ContactCards topic={topic ? topic.slice(0, 80) : null} />;
}
