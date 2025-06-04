import { TailwindStyle } from "@/utils/Enum";
import React, { useState, useEffect } from "react";

export default function Terms() {
  

  return (
    <div className="min-h-screen pt-12">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-yellow via-secondary-yellow to-yellow-light px-5 py-20 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 text-6xl animate-pulse">
            📜
          </div>
          <div className="absolute top-3/4 right-1/4 text-6xl animate-pulse delay-500">
            ⚖️
          </div>
          <div className="absolute bottom-1/4 left-3/4 text-6xl animate-pulse delay-1000">
            📋
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-dark-primary mb-6 font-serif">
            Terms of Service
          </h1>
          <p className="text-xl text-dark-primary/90 leading-relaxed max-w-2xl mx-auto">
            Please read these terms carefully before using ArtJourney's
            educational platform and services.
          </p>
          <div className={`mt-8 ${TailwindStyle.HIGHLIGHT_FRAME} backdrop-blur-sm rounded-xl p-4 inline-block `}>
            <p className="text-sm text-dark-primary font-medium">
              Last Updated: May 30, 2025
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-20">
        <div className="">
          {/* Content */}
          <div className="lg:col-span-3">
            <div className="space-y-12">
              {/* Introduction */}
              <section
                id="introduction"
                className="bg-white rounded-2xl shadow-lg border border-primary-yellow/10 p-8"
              >
                <h2 className="text-3xl font-bold text-dark-primary mb-6 font-serif flex items-center">
                  <span className="text-4xl mr-3">📋</span>
                  Introduction
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Welcome to ArtJourney, a premier online learning platform
                    dedicated to art history education. These Terms of Service
                    ("Terms") govern your use of our website, mobile
                    applications, and educational services (collectively, the
                    "Service") operated by ArtJourney ("we," "us," or "our").
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    By accessing or using our Service, you agree to be bound by
                    these Terms. If you disagree with any part of these terms,
                    then you may not access the Service.
                  </p>
                </div>
              </section>

              {/* Acceptance of Terms */}
              <section
                id="acceptance"
                className="bg-white rounded-2xl shadow-lg border border-primary-yellow/10 p-8"
              >
                <h2 className="text-3xl font-bold text-dark-primary mb-6 font-serif flex items-center">
                  <span className="text-4xl mr-3">✅</span>
                  Acceptance of Terms
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    By creating an account, accessing our courses, or using any
                    part of ArtJourney's services, you:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>
                      Acknowledge that you have read and understood these Terms
                    </li>
                    <li>
                      Agree to be legally bound by these Terms and our Privacy
                      Policy
                    </li>
                    <li>
                      Confirm that you are at least 13 years old or have
                      parental consent
                    </li>
                    <li>
                      Represent that you have the legal capacity to enter into
                      this agreement
                    </li>
                  </ul>
                </div>
              </section>

              {/* Description of Services */}
              <section
                id="services"
                className="bg-white rounded-2xl shadow-lg border border-primary-yellow/10 p-8"
              >
                <h2 className="text-3xl font-bold text-dark-primary mb-6 font-serif flex items-center">
                  <span className="text-4xl mr-3">🎨</span>
                  Description of Services
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    ArtJourney provides online art history education through:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-primary-yellow/5 p-4 rounded-xl">
                      <h4 className="font-semibold text-dark-primary mb-2">
                        📚 Educational Content
                      </h4>
                      <p className="text-sm text-gray-600">
                        Comprehensive courses covering art history from ancient
                        to contemporary periods
                      </p>
                    </div>
                    <div className="bg-primary-yellow/5 p-4 rounded-xl">
                      <h4 className="font-semibold text-dark-primary mb-2">
                        🎬 Interactive Media
                      </h4>
                      <p className="text-sm text-gray-600">
                        Video lectures, virtual museum tours, and multimedia
                        presentations
                      </p>
                    </div>
                    <div className="bg-primary-yellow/5 p-4 rounded-xl">
                      <h4 className="font-semibold text-dark-primary mb-2">
                        🏆 Assessments
                      </h4>
                      <p className="text-sm text-gray-600">
                        Quizzes, assignments, and certification programs
                      </p>
                    </div>
                    <div className="bg-primary-yellow/5 p-4 rounded-xl">
                      <h4 className="font-semibold text-dark-primary mb-2">
                        👥 Community
                      </h4>
                      <p className="text-sm text-gray-600">
                        Discussion forums and peer-to-peer learning
                        opportunities
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Account Registration */}
              <section
                id="account"
                className="bg-white rounded-2xl shadow-lg border border-primary-yellow/10 p-8"
              >
                <h2 className="text-3xl font-bold text-dark-primary mb-6 font-serif flex items-center">
                  <span className="text-4xl mr-3">👤</span>
                  Account Registration
                </h2>
                <div className="prose prose-gray max-w-none">
                  <h4 className="font-semibold text-dark-primary mb-3">
                    Account Requirements:
                  </h4>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                    <li>
                      Provide accurate, complete, and current information during
                      registration
                    </li>
                    <li>
                      Maintain the security of your password and account
                      credentials
                    </li>
                    <li>
                      Accept responsibility for all activities under your
                      account
                    </li>
                    <li>
                      Notify us immediately of any unauthorized use of your
                      account
                    </li>
                  </ul>

                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                    <h4 className="font-semibold text-amber-800 mb-2">
                      ⚠️ Important Notice
                    </h4>
                    <p className="text-amber-700 text-sm">
                      You are responsible for maintaining the confidentiality of
                      your account and password. ArtJourney will not be liable
                      for any loss or damage arising from your failure to comply
                      with this security obligation.
                    </p>
                  </div>
                </div>
              </section>

              {/* User Conduct */}
              <section
                id="conduct"
                className="bg-white rounded-2xl shadow-lg border border-primary-yellow/10 p-8"
              >
                <h2 className="text-3xl font-bold text-dark-primary mb-6 font-serif flex items-center">
                  <span className="text-4xl mr-3">⚖️</span>
                  User Conduct
                </h2>
                <div className="prose prose-gray max-w-none">
                  <h4 className="font-semibold text-dark-primary mb-3">
                    You agree NOT to:
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <span className="text-red-500 mt-1">❌</span>
                        <p className="text-gray-700 text-sm">
                          Share course content outside the platform
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-red-500 mt-1">❌</span>
                        <p className="text-gray-700 text-sm">
                          Upload malicious software or harmful content
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-red-500 mt-1">❌</span>
                        <p className="text-gray-700 text-sm">
                          Harass, abuse, or harm other users
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-red-500 mt-1">❌</span>
                        <p className="text-gray-700 text-sm">
                          Violate any applicable laws or regulations
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <span className="text-red-500 mt-1">❌</span>
                        <p className="text-gray-700 text-sm">
                          Use the service for commercial purposes without
                          permission
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-red-500 mt-1">❌</span>
                        <p className="text-gray-700 text-sm">
                          Attempt to gain unauthorized access to our systems
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-red-500 mt-1">❌</span>
                        <p className="text-gray-700 text-sm">
                          Impersonate other users or entities
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-red-500 mt-1">❌</span>
                        <p className="text-gray-700 text-sm">
                          Distribute spam or unsolicited communications
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Content & Intellectual Property */}
              <section
                id="content"
                className="bg-white rounded-2xl shadow-lg border border-primary-yellow/10 p-8"
              >
                <h2 className="text-3xl font-bold text-dark-primary mb-6 font-serif flex items-center">
                  <span className="text-4xl mr-3">📚</span>
                  Content & Intellectual Property
                </h2>
                <div className="prose prose-gray max-w-none">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                        <span className="mr-2">🏛️</span>
                        Our Content
                      </h4>
                      <ul className="text-sm text-green-700 space-y-2">
                        <li>• All course materials are owned by ArtJourney</li>
                        <li>
                          • Protected by copyright and intellectual property
                          laws
                        </li>
                        <li>
                          • Licensed to you for personal, non-commercial use
                          only
                        </li>
                        <li>• Cannot be redistributed or shared externally</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                        <span className="mr-2">👤</span>
                        Your Content
                      </h4>
                      <ul className="text-sm text-blue-700 space-y-2">
                        <li>• You retain ownership of content you create</li>
                        <li>
                          • Grant us license to use, display, and distribute
                        </li>
                        <li>
                          • Must not infringe on others' intellectual property
                        </li>
                        <li>• Should comply with our community guidelines</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Payment & Refunds */}
              <section
                id="payment"
                className="bg-white rounded-2xl shadow-lg border border-primary-yellow/10 p-8"
              >
                <h2 className="text-3xl font-bold text-dark-primary mb-6 font-serif flex items-center">
                  <span className="text-4xl mr-3">💳</span>
                  Payment & Refunds
                </h2>
                <div className="prose prose-gray max-w-none">
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-primary-yellow/5 p-4 rounded-xl text-center">
                      <div className="text-2xl mb-2">💰</div>
                      <h4 className="font-semibold text-dark-primary">
                        Payment Methods
                      </h4>
                      <p className="text-sm text-gray-600 mt-2">
                        Credit cards, PayPal, bank transfers
                      </p>
                    </div>
                    <div className="bg-primary-yellow/5 p-4 rounded-xl text-center">
                      <div className="text-2xl mb-2">↩️</div>
                      <h4 className="font-semibold text-dark-primary">
                        Refund Policy
                      </h4>
                      <p className="text-sm text-gray-600 mt-2">
                        30-day money-back guarantee
                      </p>
                    </div>
                    <div className="bg-primary-yellow/5 p-4 rounded-xl text-center">
                      <div className="text-2xl mb-2">🔄</div>
                      <h4 className="font-semibold text-dark-primary">
                        Subscription
                      </h4>
                      <p className="text-sm text-gray-600 mt-2">
                        Auto-renewal with cancellation options
                      </p>
                    </div>
                  </div>

                  <h4 className="font-semibold text-dark-primary mb-3">
                    Refund Conditions:
                  </h4>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>
                      Refunds must be requested within 30 days of purchase
                    </li>
                    <li>
                      Limited course completion (less than 20% of content
                      accessed)
                    </li>
                    <li>
                      No refunds for completed courses or certificates issued
                    </li>
                    <li>Processing time: 5-10 business days</li>
                  </ul>
                </div>
              </section>

              {/* Privacy & Data Protection */}
              <section
                id="privacy"
                className="bg-white rounded-2xl shadow-lg border border-primary-yellow/10 p-8"
              >
                <h2 className="text-3xl font-bold text-dark-primary mb-6 font-serif flex items-center">
                  <span className="text-4xl mr-3">🔒</span>
                  Privacy & Data Protection
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Your privacy is important to us. Our Privacy Policy details
                    how we collect, use, and protect your information.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h4 className="font-semibold text-blue-800 mb-3">
                      🛡️ Data Protection Highlights:
                    </h4>
                    <ul className="text-blue-700 space-y-2 text-sm">
                      <li>
                        • We collect only necessary information for service
                        provision
                      </li>
                      <li>• Data is encrypted and stored securely</li>
                      <li>
                        • We never sell your personal information to third
                        parties
                      </li>
                      <li>
                        • You have rights to access, modify, and delete your
                        data
                      </li>
                      <li>
                        • We comply with GDPR and other applicable privacy laws
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Account Termination */}
              <section
                id="termination"
                className="bg-white rounded-2xl shadow-lg border border-primary-yellow/10 p-8"
              >
                <h2 className="text-3xl font-bold text-dark-primary mb-6 font-serif flex items-center">
                  <span className="text-4xl mr-3">🚪</span>
                  Account Termination
                </h2>
                <div className="prose prose-gray max-w-none">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-dark-primary mb-3">
                        You may terminate your account:
                      </h4>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm">
                        <li>At any time by contacting our support team</li>
                        <li>Through your account settings</li>
                        <li>Account data will be deleted within 30 days</li>
                        <li>Course access will cease immediately</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-dark-primary mb-3">
                        We may terminate accounts for:
                      </h4>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm">
                        <li>Violation of these Terms of Service</li>
                        <li>Fraudulent or illegal activities</li>
                        <li>Abuse of our platform or other users</li>
                        <li>Non-payment of fees</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Limitation of Liability */}
              <section
                id="liability"
                className="bg-white rounded-2xl shadow-lg border border-primary-yellow/10 p-8"
              >
                <h2 className="text-3xl font-bold text-dark-primary mb-6 font-serif flex items-center">
                  <span className="text-4xl mr-3">⚠️</span>
                  Limitation of Liability
                </h2>
                <div className="prose prose-gray max-w-none">
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg mb-6">
                    <h4 className="font-semibold text-amber-800 mb-3">
                      ⚠️ Important Legal Notice
                    </h4>
                    <p className="text-amber-700 text-sm leading-relaxed">
                      ArtJourney provides educational services "as is" without
                      warranties of any kind. We strive for accuracy in our
                      content but cannot guarantee completeness or currency of
                      all information.
                    </p>
                  </div>

                  <h4 className="font-semibold text-dark-primary mb-3">
                    Liability Limitations:
                  </h4>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm">
                    <li>
                      We are not liable for indirect, incidental, or
                      consequential damages
                    </li>
                    <li>
                      Our total liability is limited to the amount you paid for
                      our services
                    </li>
                    <li>
                      We do not guarantee continuous, uninterrupted access to
                      our platform
                    </li>
                    <li>
                      Technical issues, maintenance, or force majeure events may
                      affect service availability
                    </li>
                  </ul>
                </div>
              </section>

              {/* Changes to Terms */}
              <section
                id="changes"
                className="bg-white rounded-2xl shadow-lg border border-primary-yellow/10 p-8"
              >
                <h2 className="text-3xl font-bold text-dark-primary mb-6 font-serif flex items-center">
                  <span className="text-4xl mr-3">🔄</span>
                  Changes to Terms
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We reserve the right to modify these Terms at any time. When
                    we make changes:
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <h4 className="font-semibold text-green-800 mb-3">
                      📋 Our Commitment to Transparency:
                    </h4>
                    <ul className="text-green-700 space-y-2 text-sm">
                      <li>
                        • We will notify you of significant changes via email
                      </li>
                      <li>
                        • Updates will be posted on our website with the
                        revision date
                      </li>
                      <li>
                        • You'll have 30 days to review changes before they take
                        effect
                      </li>
                      <li>
                        • Continued use of our service constitutes acceptance of
                        new terms
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Contact Information */}
              <section
                id="contact"
                className="bg-white rounded-2xl shadow-lg border border-primary-yellow/10 p-8"
              >
                <h2 className="text-3xl font-bold text-dark-primary mb-6 font-serif flex items-center">
                  <span className="text-4xl mr-3">📞</span>
                  Contact Information
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    If you have questions about these Terms of Service, please
                    contact us:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 bg-primary-yellow/5 rounded-xl">
                        <span className="text-2xl">📧</span>
                        <div>
                          <h4 className="font-semibold text-dark-primary">
                            Email
                          </h4>
                          <p className="text-gray-600">
                            contact.artjourney01@gmail.com
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-4 bg-primary-yellow/5 rounded-xl">
                        <span className="text-2xl">📱</span>
                        <div>
                          <h4 className="font-semibold text-dark-primary">
                            Phone
                          </h4>
                          <p className="text-gray-600">+84 98 174 5930</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 bg-primary-yellow/5 rounded-xl">
                        <span className="text-2xl">📍</span>
                        <div>
                          <h4 className="font-semibold text-dark-primary">
                            Address
                          </h4>
                          <p className="text-gray-600">
                            610 Nguyen Thuong Hien
                            <br />
                            District 10, Ho Chi Minh City
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-4 bg-primary-yellow/5 rounded-xl">
                        <span className="text-2xl">🕒</span>
                        <div>
                          <h4 className="font-semibold text-dark-primary">
                            Support Hours
                          </h4>
                          <p className="text-gray-600">
                            Mon-Fri: 9AM-6PM (GMT+7)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
