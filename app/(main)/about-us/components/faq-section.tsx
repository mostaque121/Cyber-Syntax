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
      <div className="flex border-b pb-4 mb-4 border-[#dee2e6] gap-4 flex-wrap justify-between items-center">
        <h2 className="text-[18px] uppercase  px-1  md:text-[32px]  font-bold text-black">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.slice(0, Math.ceil(faqs.length / 2)).map((faq, index) => (
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
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.slice(Math.ceil(faqs.length / 2)).map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index + Math.ceil(faqs.length / 2)}`}
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
