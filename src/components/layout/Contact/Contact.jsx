import { TailwindStyle } from "@/utils/Enum";
import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    alert("Thank you for your message! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-yellow via-yellow-secondary to-yellow-light px-5 py-20 text-center overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 text-6xl animate-bounce">
            🎨
          </div>
          <div className="absolute top-3/4 right-1/4 text-6xl animate-bounce delay-500">
            🖌️
          </div>
          <div className="absolute bottom-1/4 left-3/4 text-6xl animate-bounce delay-1000">
            ✏️
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-primary-black mb-6 font-serif">
            Get in Touch
          </h1>
          <p className="text-xl text-primary-black/90 leading-relaxed max-w-2xl mx-auto">
            Have questions about ArtJourney? We'd love to hear from you. Send us
            a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-20">
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-primary-black mb-5 font-serif">
                Contact Information
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Reach out to us through any of the following channels. Our team
                is here to help you on your artistic journey.
              </p>
            </div>

            <div className="space-y-6">
              {/* Address */}
              <div
                className={`p-8 rounded-2xl bg-primary-white border border-primary-yellow/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-15 h-15 ${TailwindStyle.HIGHLIGHT_FRAME} rounded-xl flex items-center justify-center flex-shrink-0`}
                  >
                    <svg
                      className="w-7 h-7 text-primary-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary-black mb-2 font-serif">
                      Visit Us
                    </h3>
                    <p className="text-gray-600">610 Nguyen Thuong Hien</p>
                    <p className="text-gray-600">
                      District 10, Ho Chi Minh City
                    </p>
                    <p className="text-gray-600">Vietnam</p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="p-8 rounded-2xl border border-primary-yellow/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-15 h-15 ${TailwindStyle.HIGHLIGHT_FRAME} rounded-xl flex items-center justify-center flex-shrink-0`}
                  >
                    <svg
                      className="w-7 h-7 text-primary-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary-black mb-2 font-serif">
                      Call Us
                    </h3>
                    <p className="text-gray-800 font-medium">+84 98 174 5930</p>
                    <p className="text-sm text-gray-500">
                      Mon - Fri: 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-sm text-gray-500">
                      Sat: 9:00 AM - 12:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="p-8 rounded-2xl border border-primary-yellow/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-15 h-15 ${TailwindStyle.HIGHLIGHT_FRAME} rounded-xl flex items-center justify-center flex-shrink-0`}
                  >
                    <svg
                      className="w-7 h-7 text-primary-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary-black mb-2 font-serif">
                      Email Us
                    </h3>
                    <p className="text-gray-800 font-medium">
                      contact.artjourney01@gmail.com
                    </p>
                    <p className="text-sm text-gray-500">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-primary-yellow/10">
              <h3 className="text-xl font-semibold text-primary-black mb-6 font-serif">
                Follow Us
              </h3>
              <div className="space-y-4">
                <a
                  href="https://www.facebook.com/artjourney123/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 rounded-xl border-2 border-blue-100 text-blue-600 hover:bg-blue-50 hover:translate-x-2 transition-all duration-300"
                >
                  <svg
                    className="w-6 h-6 mr-3"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="font-medium">Facebook</span>
                </a>
                <a
                  href="https://www.instagram.com/artjourney_midnightmeowers/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 rounded-xl border-2 border-pink-100 text-pink-600 hover:bg-pink-50 hover:translate-x-2 transition-all duration-300"
                >
                  <svg
                    className="w-6 h-6 mr-3"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span className="font-medium">Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-10 rounded-2xl shadow-lg border border-primary-yellow/10">
            <h2 className="text-4xl font-bold text-primary-black mb-8 font-serif">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-primary-black mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border-2 border-primary-yellow/20 rounded-xl bg-gray-50 focus:bg-white focus:border-primary-yellow focus:outline-none focus:ring-4 focus:ring-border-primary-yellow transition-all duration-300"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-primary-black mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border-2 border-primary-yellow/20 rounded-xl bg-gray-50 focus:bg-white focus:border-primary-yellow focus:outline-none focus:ring-4 focus:ring-primary-yellow/10 transition-all duration-300"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold text-primary-black mb-2"
                >
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-primary-yellow/20 rounded-xl bg-gray-50 focus:bg-white focus:border-primary-yellow focus:outline-none focus:ring-4 focus:ring-primary-yellow/10 transition-all duration-300"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="course">Course Information</option>
                  <option value="technical">Technical Support</option>
                  <option value="partnership">Partnership</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-primary-black mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  placeholder="Tell us more about your inquiry..."
                  className="w-full px-4 py-3 border-2 border-primary-yellow/20 rounded-xl bg-gray-50 focus:bg-white focus:border-primary-yellow focus:outline-none focus:ring-4 focus:ring-primary-yellow/10 transition-all duration-300 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className={`w-full ${TailwindStyle.HIGHLIGHT_FRAME} text-white font-semibold py-4 px-8 rounded-xl  hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 text-lg`}
              >
                <span>Send Message</span>
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white p-10 rounded-2xl shadow-lg border border-primary-yellow/10">
          <h2 className="text-4xl font-bold text-primary-black text-center mb-12 font-serif">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 border-2 border-primary-yellow/10 rounded-xl hover:border-primary-yellow/30 hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-xl font-semibold text-primary-yellow mb-4 font-serif">
                How do I enroll in a course?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                You can browse our courses and enroll directly through our
                website. Simply select a course and follow the enrollment
                process.
              </p>
            </div>
            <div className="p-6 border-2 border-primary-yellow/10 rounded-xl hover:border-primary-yellow/30 hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-xl font-semibold text-primary-yellow mb-4 font-serif">
                Do you offer certificates?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes, we provide certificates of completion for all our courses.
                These certificates showcase your learning achievements.
              </p>
            </div>
            <div className="p-6 border-2 border-primary-yellow/10 rounded-xl hover:border-primary-yellow/30 hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-xl font-semibold text-primary-yellow mb-4 font-serif">
                Can I access courses on mobile?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Absolutely! Our platform is fully responsive and works
                seamlessly on all devices including smartphones and tablets.
              </p>
            </div>
            <div className="p-6 border-2 border-primary-yellow/10 rounded-xl hover:border-primary-yellow/30 hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-xl font-semibold text-primary-yellow mb-4 font-serif">
                Is there a free trial available?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We offer free preview lessons for most courses so you can
                experience our teaching style before enrolling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}