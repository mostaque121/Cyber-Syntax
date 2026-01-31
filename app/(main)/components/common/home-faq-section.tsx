"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function HomeFaqSection() {
  const faqs = [
    {
      question: "What services does Cyber Syntax and Engineering Ltd provide?",
      answer:
        "We provide IT support, CCTV security camera installation, custom software development, and networking solutions for homes and businesses. We also sell quality tech products including laptops, PCs, and hardware components.",
    },
    {
      question: "Do you provide on-site service?",
      answer:
        "Yes, we provide both on-site and remote support. Our technicians can visit your location for CCTV installation, network setup, IT troubleshooting, and hardware repairs.",
    },
    {
      question: "How long does CCTV installation take?",
      answer:
        "Installation time depends on the number of cameras and complexity. A basic 4-camera setup typically takes 4-6 hours, while larger commercial installations may take 1-2 days.",
    },
    {
      question: "Do you offer warranty on products?",
      answer:
        "Yes, all our products come with manufacturer warranty. We also provide extended warranty options and after-sales support for all items purchased from us.",
    },
    {
      question: "Can you develop custom software for my business?",
      answer:
        "Absolutely! Our development team specializes in creating custom web applications, mobile apps, and enterprise software tailored to your specific business requirements.",
    },
    {
      question: "What are your support hours?",
      answer:
        "We offer 24/7 emergency support for critical issues. Regular support hours are Monday to Friday, 9:00 AM to 6:00 PM. You can reach us anytime via phone or email.",
    },
    {
      question: "Do you provide maintenance services?",
      answer:
        "Yes, we offer ongoing maintenance and support packages for all our services including IT infrastructure, CCTV systems, networks, and software applications.",
    },
    {
      question: "How can I get a quote for your services?",
      answer:
        "Contact us through our website, call us directly, or send an email. We'll assess your requirements and provide a detailed quote within 24 hours.",
    },
  ];

  return (
    <section className="container w-full py-16 px-4 md:px-8 mx-auto">
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
              className="bg-white border border-primary rounded-[5px] px-6"
            >
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">
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
              className="bg-white border border-primary rounded-[5px] px-6"
            >
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
