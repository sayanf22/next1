"use client";

import { useSearchParams } from "next/navigation";
import { ArrowRight, CalendarDays, ClipboardList, Mail, MessageCircle, Phone } from "lucide-react";
import { contact, mailtoHref, telHref, whatsappHref } from "@/data/programmes";

/**
 * Contact options for the Let's Talk page: a featured booking card, then the other ways to reach us.
 * `topic` (from "Enquire about …" links) is added to the WhatsApp message and email subject.
 */
export function ContactCards({ topic }: { topic: string | null }) {
  const cards = [
    {
      href: contact.form,
      external: true,
      icon: ClipboardList,
      title: "Fill the enquiry form",
      text: "Share your details and what you need, and we will get back to you.",
    },
    {
      href: mailtoHref(topic),
      external: false,
      icon: Mail,
      title: "Send an email",
      text: contact.email,
    },
    {
      href: whatsappHref(topic),
      external: true,
      icon: MessageCircle,
      title: "Message on WhatsApp",
      text: topic ? `Start a conversation about ${topic}.` : "Start a WhatsApp conversation.",
    },
    {
      href: telHref(contact.phone),
      external: false,
      icon: Phone,
      title: "Call an advisor",
      text: contact.phone,
    },
  ];

  return (
    <div className="space-y-5">
      {/* Featured: book a consultation */}
      <a
        href={contact.calendly}
        target="_blank"
        rel="noopener"
        className="reveal btn-sweep group relative flex flex-col gap-6 overflow-hidden rounded-lg bg-ink-900 p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-9"
      >
        <span className="flex items-center gap-5">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
            <CalendarDays aria-hidden="true" className="h-6 w-6" strokeWidth={1.9} />
          </span>
          <span>
            <span className="block font-display text-[1.4rem] font-semibold">Schedule a consultation</span>
            <span className="mt-1 block text-[16px] leading-7 text-slate-300">
              Pick a time that suits you and book a one-on-one conversation with an advisor.
            </span>
          </span>
        </span>
        <span className="inline-flex h-12 shrink-0 items-center justify-center gap-2.5 rounded-md bg-white px-6 font-display text-[14.5px] font-semibold text-ink-900">
          Book a time
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-1"
            strokeWidth={2.4}
          />
          <span className="sr-only"> (opens in a new tab)</span>
        </span>
      </a>

      <div className="grid gap-5 sm:grid-cols-2">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <a
              key={card.title}
              href={card.href}
              {...(card.external ? { target: "_blank", rel: "noopener" } : {})}
              data-delay={index}
              className="reveal card-rule group relative flex flex-col rounded-lg border border-slate-200 bg-white p-7 sm:p-8"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-ink-900 text-white transition-colors duration-300 group-hover:bg-brand-600">
                <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="mt-6 font-display text-[1.35rem] font-semibold text-ink-900">
                {card.title}
                {card.external && <span className="sr-only"> (opens in a new tab)</span>}
              </span>
              <span className="mt-2 break-words text-[16px] font-medium leading-6 text-slate-700">{card.text}</span>
              <ArrowRight
                aria-hidden="true"
                className="absolute right-6 top-7 h-5 w-5 text-slate-400 transition-all duration-300 ease-out-soft group-hover:translate-x-1 group-hover:text-ink-900"
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default function ContactOptions() {
  const topic = useSearchParams().get("topic");
  return <ContactCards topic={topic ? topic.slice(0, 80) : null} />;
}
