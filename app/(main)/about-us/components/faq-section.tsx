"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
  const faqs = [
    {
      question: "What services does Cyber Syntax and Engineering Ltd provide?",
      answer:
        "We offer IT support, CCTV installation for homes and businesses, custom software development, networking solutions, and a wide range of tech products including laptops, PCs, and hardware components.",
    },
    {
      question: "Do you provide on-site support?",
      answer:
        "Yes, we provide both on-site and remote support services. Our technicians can visit your location for installations, repairs, and maintenance work.",
    },
    {
      question: "What areas do you serve?",
      answer:
        "We serve clients across the region. Contact us to check if we cover your area for on-site services. Remote IT support is available anywhere.",
    },
    {
      question: "Do you offer warranty on products?",
      answer:
        "Yes, all our products come with manufacturer warranty. We also provide extended warranty options and after-sales support.",
    },
    {
      question: "Can you build custom software for my business?",
      answer:
        "Absolutely! Our development team specializes in creating custom web and mobile applications tailored to your specific business needs.",
    },
    {
      question: "How can I get a quote for your services?",
      answer:
        "You can contact us through our contact page, call us directly, or send an email. We'll assess your requirements and provide a detailed quote.",
    },
  ];

  return (
    <section className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Got questions? We&apos;ve got answers
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white border border-gray-200 rounded-[5px] px-6"
            >
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
