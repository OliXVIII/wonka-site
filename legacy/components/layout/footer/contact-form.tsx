"use client";

import { Phone } from "lucide-react";
import React from "react";
import PhoneInput from "react-phone-input-2";
import { UiContent } from "@/types/ui-content";
import "react-phone-input-2/lib/style.css";

const ContactForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {};

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-48 flex-col space-y-4"
    >
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        required
        className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        required
        className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Your Message"
        name="message"
        required
        className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="rounded-lg bg-blue-500 px-4 py-2 text-light shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
