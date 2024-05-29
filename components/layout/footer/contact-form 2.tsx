"use client";

import React from 'react';
import { UiContent } from '@/types/ui-content';
import PhoneInput from 'react-phone-input-2';
import { Phone } from 'lucide-react';
import 'react-phone-input-2/lib/style.css';

const ContactForm: React.FC = () => {

    const handleSubmit = (e: React.FormEvent) => {

    };

    return (
<form onSubmit={handleSubmit} className="flex flex-col max-w-48 mx-auto space-y-4">
    <input
        type="text"
        name="name"
        placeholder="Your Name"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
    <input
        type="email"
        name="email"
        placeholder="Your Email"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
    <input
        type="text"
        placeholder="Your Message"
        name="message"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        Submit
    </button>
</form>
    );
};

export default ContactForm;