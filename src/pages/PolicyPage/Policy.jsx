import React from 'react';
import { Shield, Lock, Eye, UserCheck, Globe, Mail, Phone, MapPin } from 'lucide-react';

export default function Policy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section - Using your platform colors */}
      <div className="bg-gradient-to-r from-primary-yellow to-secondary-yellow text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-6">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary-black equila-bold">
              Privacy Policy
            </h1>
            <p className="text-xl opacity-90 text-primary-black">
              Your privacy and data protection are our top priorities
            </p>
            <p className="text-sm opacity-75 mt-2 text-primary-black">
              Last updated: August 3, 2025
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-amber-100">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-primary-yellow/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <UserCheck className="w-6 h-6 text-primary-yellow" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary-black mb-3 equila-bold">
                  Welcome to ArtJourney
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  At ArtJourney, we are committed to protecting your privacy and
                  ensuring the security of your personal information. This
                  Privacy Policy explains how we collect, use, disclose, and
                  safeguard your information when you visit our platform and use
                  our services.
                </p>
              </div>
            </div>
          </div>

          {/* Information We Collect */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-amber-100">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-secondary-yellow/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Eye className="w-6 h-6 text-secondary-yellow" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-primary-black mb-6 equila-bold">
                  Information We Collect
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-primary-black mb-3">
                      Personal Information
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                      <li>Name and email address when you create an account</li>
                      <li>
                        Profile information such as bio, profile picture, and
                        artistic preferences
                      </li>
                      <li>
                        Payment information when you enroll in courses
                        (processed securely through third-party payment
                        processors)
                      </li>
                      <li>
                        Communication records when you contact our support team
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-primary-black mb-3">
                      Automatically Collected Information
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                      <li>
                        Device information (browser type, operating system,
                        device identifiers)
                      </li>
                      <li>
                        Usage data (pages visited, time spent, course progress,
                        interaction patterns)
                      </li>
                      <li>
                        IP address and location data (if permitted by your
                        device settings)
                      </li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-primary-black mb-3">
                      Content and Submissions
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                      <li>
                        Artwork and creative content you upload to our platform
                      </li>
                      <li>Comments, reviews, and feedback you provide</li>
                      <li>
                        Messages sent through our platform communication
                        features
                      </li>
                      <li>Course assignments and project submissions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-amber-100">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-primary-yellow/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6 text-primary-yellow" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-primary-black mb-6 equila-bold">
                  How We Use Your Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-100">
                    <h3 className="text-lg font-semibold text-primary-black mb-3">
                      Service Provision
                    </h3>
                    <ul className="text-gray-600 space-y-2 ">
                      <li>
                        • Provide access to courses and learning materials
                      </li>
                      <li>• Track your learning progress and achievements</li>
                      <li>• Generate certificates upon course completion</li>
                      <li>• Customize your learning experience</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-100">
                    <h3 className="text-lg font-semibold text-primary-black mb-3">
                      Communication
                    </h3>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Send course updates and notifications</li>
                      <li>• Provide customer support and assistance</li>
                      <li>• Share platform news and new features</li>
                      <li>• Send promotional content (with your consent)</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-100">
                    <h3 className="text-lg font-semibold text-primary-black mb-3 ">
                      Platform Improvement
                    </h3>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Analyze usage patterns to improve our services</li>
                      <li>• Develop new features and content</li>
                      <li>• Optimize platform performance</li>
                      <li>• Conduct research and analytics</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-100">
                    <h3 className="text-lg font-semibold text-primary-black mb-3">
                      Legal and Security
                    </h3>
                    <ul className="text-gray-600 space-y-2 ">
                      <li>• Ensure platform security and prevent fraud</li>
                      <li>• Comply with legal obligations</li>
                      <li>• Enforce our terms of service</li>
                      <li>• Protect user rights and safety</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Information Sharing */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-amber-100">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-secondary-yellow/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Globe className="w-6 h-6 text-secondary-yellow" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-primary-black mb-6 equila-bold">
                  Information Sharing and Disclosure
                </h2>

                <div className="space-y-6">
                  <div className="border-l-4 border-primary-yellow pl-6 bg-amber-50 p-4 rounded-r-lg">
                    <h3 className="text-lg font-semibold text-primary-black mb-2 ">
                      We DO NOT sell your personal information
                    </h3>
                    <p className="text-gray-600 ">
                      ArtJourney does not sell, rent, or trade your personal
                      information to third parties for marketing purposes.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-primary-black mb-3 ">
                      We may share information in the following circumstances:
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 ">
                      <li>
                        <strong>Service Providers:</strong> With trusted
                        third-party service providers who assist in operating
                        our platform (hosting, payment processing, analytics)
                      </li>
                      <li>
                        <strong>Legal Requirements:</strong> When required by
                        law, court order, or government regulation
                      </li>
                      <li>
                        <strong>Safety and Security:</strong> To protect the
                        rights, property, or safety of ArtJourney, our users, or
                        others
                      </li>
                      <li>
                        <strong>Business Transfers:</strong> In connection with
                        a merger, acquisition, or sale of assets (with prior
                        notice)
                      </li>
                      <li>
                        <strong>With Your Consent:</strong> When you explicitly
                        agree to share information with third parties
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Security */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-amber-100">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-primary-yellow/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-primary-yellow" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-primary-black mb-6 equila-bold">
                  Data Security
                </h2>

                <div className="space-y-4">
                  <p className="text-gray-600 leading-relaxed ">
                    We implement appropriate technical and organizational
                    security measures to protect your personal information
                    against unauthorized access, alteration, disclosure, or
                    destruction. These measures include:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-4 border border-amber-200">
                      <h4 className="font-semibold text-primary-black mb-2 ">
                        Technical Safeguards
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1 ">
                        <li>• SSL/TLS encryption for data transmission</li>
                        <li>• Encrypted data storage</li>
                        <li>• Regular security updates and patches</li>
                        <li>• Secure hosting infrastructure</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-4 border border-amber-200">
                      <h4 className="font-semibold text-primary-black mb-2 ">
                        Administrative Safeguards
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1 ">
                        <li>• Access controls and authentication</li>
                        <li>• Employee training on data protection</li>
                        <li>• Regular security assessments</li>
                        <li>• Incident response procedures</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-amber-100">
            <h2 className="text-2xl font-bold text-primary-black mb-6 equila-bold">
              Your Privacy Rights
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-primary-black ">
                      Access
                    </h3>
                    <p className="text-sm text-gray-600 ">
                      Request a copy of your personal information
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-secondary-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-primary-black ">
                      Correction
                    </h3>
                    <p className="text-sm text-gray-600 ">
                      Update or correct inaccurate information
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-third-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-primary-black ">
                      Deletion
                    </h3>
                    <p className="text-sm text-gray-600 ">
                      Request deletion of your personal information
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-primary-black ">
                      Portability
                    </h3>
                    <p className="text-sm text-gray-600 ">
                      Export your data in a machine-readable format
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-secondary-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-primary-black ">
                      Opt-out
                    </h3>
                    <p className="text-sm text-gray-600 ">
                      Unsubscribe from marketing communications
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-third-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-primary-black ">
                      Restriction
                    </h3>
                    <p className="text-sm text-gray-600 ">
                      Limit how we process your information
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cookies Policy */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-amber-100">
            <h2 className="text-2xl font-bold text-primary-black mb-6 equila-bold">
              Cookies and Tracking Technologies
            </h2>

            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed ">
                We use cookies and similar technologies to enhance your
                experience on our platform. You can control cookie preferences
                through your browser settings.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-4 border border-amber-200">
                  <h4 className="font-semibold text-primary-black mb-2 ">
                    Essential Cookies
                  </h4>
                  <p className="text-sm text-gray-600 ">
                    Required for basic platform functionality
                  </p>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-4 border border-amber-200">
                  <h4 className="font-semibold text-primary-black mb-2 ">
                    Analytics Cookies
                  </h4>
                  <p className="text-sm text-gray-600 ">
                    Help us understand platform usage patterns
                  </p>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-4 border border-amber-200">
                  <h4 className="font-semibold text-primary-black mb-2 ">
                    Preference Cookies
                  </h4>
                  <p className="text-sm text-gray-600 ">
                    Remember your settings and preferences
                  </p>
                </div>
              </div>
            </div>
          </div>

          

          {/* Updates */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-8 border border-amber-100">
            <h2 className="text-2xl font-bold text-primary-black mb-4 equila-bold">
              Policy Updates
            </h2>
            <p className="text-gray-600 leading-relaxed ">
              We may update this Privacy Policy from time to time. We will
              notify you of any material changes by posting the new Privacy
              Policy on this page and updating the "Last updated" date. We
              encourage you to review this Privacy Policy periodically for any
              changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}