import type { Metadata } from "next";
import { ContactContent } from "@/components/sections/ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Omar Chouman. Building something complex? Let's talk.",
};

export default function ContactPage() {
  return <ContactContent />;
}
