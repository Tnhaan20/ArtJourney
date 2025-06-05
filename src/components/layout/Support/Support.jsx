import { TailwindStyle } from "@/utils/Enum";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Support() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState("faq");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Error and Success Codes Data (static data from API)
  const errorCodes = [
    { code: "1001", httpStatus: "404", messageVie: "Không tìm thấy người dùng có email này", messageEng: "No user found with this email" },
    { code: "1002", httpStatus: "404", messageVie: "Không tìm thấy email", messageEng: "Email not found" },
    { code: "1003", httpStatus: "500", messageVie: "Cập nhật thông tin người dùng thất bại", messageEng: "Failed to update user information" },
    { code: "1004", httpStatus: "500", messageVie: "Tạo hoặc cập nhật thông tin người dùng khi đăng nhập bằng gmail thất bại", messageEng: "Failed to create/update user info during Gmail login" },
    { code: "1005", httpStatus: "500", messageVie: "Cập nhật hoặc tạo user thành công nhưng không trả về (Login bằng gmail)", messageEng: "User created/updated successfully but no response returned" },
    { code: "1006", httpStatus: "404", messageVie: "Email này đã được sử dụng bởi một tài khoản khác", messageEng: "This email is already used by another account" },
    { code: "1007", httpStatus: "404", messageVie: "Email hoặc password không hợp lệ", messageEng: "Invalid email or password" },
    { code: "1008", httpStatus: "404", messageVie: "Tài khoản của bạn đã bị ban", messageEng: "Your account has been banned" },
    { code: "1009", httpStatus: "404", messageVie: "Không tìm thấy tài khoản với id này", messageEng: "No account found with this ID" },
    { code: "1010", httpStatus: "500", messageVie: "Có lỗi xảy ra khi tạo LoginHistory", messageEng: "Error occurred while creating LoginHistory" },
    { code: "1011", httpStatus: "500", messageVie: "Có lỗi xảy ra khi lấy id lớn nhất trong bảng LoginHistory", messageEng: "Error getting max ID from LoginHistory table" },
    { code: "1012", httpStatus: "500", messageVie: "Có lỗi xảy ra khi đếm số record trong bảng LoginHistory theo field userId", messageEng: "Error counting records in LoginHistory by userId" },
    { code: "1013", httpStatus: "404", messageVie: "Tài khoản này đã được xác thực trước đó", messageEng: "This account has been verified before" },
    { code: "1014", httpStatus: "404", messageVie: "Thời hạn xác thực email đã hết hạn hoặc thông tin xác thực không hợp lệ", messageEng: "Email verification expired or invalid" },
    { code: "1015", httpStatus: "500", messageVie: "Có lỗi xảy ra trong quá trình xác thực email người dùng", messageEng: "Error during email verification process" }
  ];

  const successCodes = [
    { code: "2001", httpStatus: "200", messageVie: "Đăng nhập thành công", messageEng: "Login successful" },
    { code: "2002", httpStatus: "200", messageVie: "Truy xuất tài khoản thành công", messageEng: "Account retrieved successfully" },
    { code: "2003", httpStatus: "201", messageVie: "Tạo LoginHistory thành công", messageEng: "LoginHistory created successfully" },
    { code: "2004", httpStatus: "201", messageVie: "Xác thực email người dùng thành công", messageEng: "User email verification successful" }
  ];

  // Get current language
  const currentLanguage = i18n.language;
  const isVietnamese = currentLanguage === 'vi';

  // Get localized data
  const faqData = t('support.faq.questions', { returnObjects: true });
  const categories = [
    { value: "all", label: t('support.categories.all') },
    { value: "account", label: t('support.categories.account') },
    { value: "course", label: t('support.categories.course') },
    { value: "payment", label: t('support.categories.payment') },
    { value: "certificate", label: t('support.categories.certificate') },
    { value: "technical", label: t('support.categories.technical') }
  ];

  const filteredFAQ = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredErrorCodes = errorCodes.filter(item => {
    const currentMessage = isVietnamese ? item.messageVie : item.messageEng;
    return item.code.includes(searchTerm) || 
           currentMessage.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredSuccessCodes = successCodes.filter(item => {
    const currentMessage = isVietnamese ? item.messageVie : item.messageEng;
    return item.code.includes(searchTerm) || 
           currentMessage.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-yellow via-secondary-yellow to-yellow-light px-5 py-20 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 text-6xl animate-pulse">
            🛠️
          </div>
          <div className="absolute top-3/4 right-1/4 text-6xl animate-pulse delay-500">
            💡
          </div>
          <div className="absolute bottom-1/4 left-3/4 text-6xl animate-pulse delay-1000">
            ❓
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-dark-primary mb-6 font-serif">
            {t("support.hero.title")}
          </h1>
          <p className="text-xl text-dark-primary/90 leading-relaxed max-w-2xl mx-auto">
            {t("support.hero.description")}
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto px-5 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder={t("support.search.placeholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-primary-yellow/20 rounded-xl focus:border-primary-yellow focus:outline-none focus:ring-4 focus:ring-primary-yellow/10 transition-all duration-300"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-20">
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-2 inline-flex">
            <button
              onClick={() => setActiveTab("faq")}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "faq"
                  ? `{${TailwindStyle.HIGHLIGHT_FRAME} text-white shadow-lg}`
                  : "text-gray-600 hover:text-gray-800 cursor-pointer"
              }`}
            >
              {t("support.tabs.faq")}
            </button>
            <button
              onClick={() => setActiveTab("codes")}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "codes"
                  ? `{${TailwindStyle.HIGHLIGHT_FRAME} text-white shadow-lg}`
                  : "text-gray-600 hover:text-gray-800 cursor-pointer"
              }`}
            >
              {t("support.tabs.codes")}
            </button>
          </div>
        </div>

        {/* FAQ Tab */}
        {activeTab === "faq" && (
          <div>
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.value
                      ? `{${TailwindStyle.HIGHLIGHT_FRAME} text-white shadow-lg}`
                      : "bg-white text-gray-600 hover:bg-primary-yellow/10 border border-primary-yellow/20"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFAQ.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg border border-primary-yellow/10 overflow-hidden"
                >
                  <details className="group">
                    <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-primary-yellow/5 transition-all duration-300">
                      <h3 className="text-lg font-semibold text-dark-primary pr-4">
                        {faq.question}
                      </h3>
                      <svg
                        className="w-5 h-5 text-primary-yellow group-open:rotate-180 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                      <span className="inline-block mt-3 px-3 py-1 bg-primary-yellow/10 text-primary-yellow text-sm font-medium rounded-full">
                        {
                          categories.find((cat) => cat.value === faq.category)
                            ?.label
                        }
                      </span>
                    </div>
                  </details>
                </div>
              ))}
            </div>

            {filteredFAQ.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-dark-primary mb-2">
                  {t("support.faq.noResults.title")}
                </h3>
                <p className="text-gray-600">
                  {t("support.faq.noResults.description")}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Codes Tab */}
        {activeTab === "codes" && (
          <div>
            {/* Error Codes Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-dark-primary mb-8 font-serif text-center">
                {t("support.codes.errorSection.title")}
              </h2>
              <div className="grid gap-6">
                {filteredErrorCodes.map((error, index) => (
                  <div
                    key={error.code}
                    className="bg-white rounded-2xl shadow-lg border-l-4 border-red-500 p-6"
                  >
                    <div className="flex flex-wrap items-start justify-between mb-4">
                      <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                        <span className="bg-red-100 text-red-800 text-sm font-bold px-3 py-1 rounded-full">
                          {error.code}
                        </span>
                        <span className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
                          HTTP {error.httpStatus}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-dark-primary mb-2">
                          {isVietnamese
                            ? "📝 Thông báo lỗi:"
                            : "📝 Error Message:"}
                        </h4>
                        <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                          {isVietnamese ? error.messageVie : error.messageEng}
                        </p>
                      </div>
                      <div className="bg-red-50 rounded-lg p-4">
                        <h4 className="font-semibold text-red-800 mb-2">
                          {t("support.codes.labels.description")}
                        </h4>
                        <p className="text-red-700">
                          {t(`support.codes.errors.${index}.description`)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Success Codes Section */}
            <div>
              <h2 className="text-3xl font-bold text-dark-primary mb-8 font-serif text-center">
                {t("support.codes.successSection.title")}
              </h2>
              <div className="grid gap-6">
                {filteredSuccessCodes.map((success, index) => (
                  <div
                    key={success.code}
                    className="bg-white rounded-2xl shadow-lg border-l-4 border-green-500 p-6"
                  >
                    <div className="flex flex-wrap items-start justify-between mb-4">
                      <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                        <span className="bg-green-100 text-green-800 text-sm font-bold px-3 py-1 rounded-full">
                          {success.code}
                        </span>
                        <span className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
                          HTTP {success.httpStatus}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-dark-primary mb-2">
                          {isVietnamese
                            ? "✅ Thông báo thành công:"
                            : "✅ Success Message:"}
                        </h4>
                        <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                          {isVietnamese
                            ? success.messageVie
                            : success.messageEng}
                        </p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <h4 className="font-semibold text-green-800 mb-2">
                          {t("support.codes.labels.description")}
                        </h4>
                        <p className="text-green-700">
                          {t(`support.codes.success.${index}.description`)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {filteredErrorCodes.length === 0 &&
              filteredSuccessCodes.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-dark-primary mb-2">
                    {t("support.codes.noResults.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("support.codes.noResults.description")}
                  </p>
                </div>
              )}
          </div>
        )}

        {/* Contact Support Section */}
        <div className="mt-20 bg-gradient-to-r from-primary-yellow/10 to-secondary-yellow/10 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-dark-primary mb-4 font-serif">
            {t("support.contactSection.title")}
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            {t("support.contactSection.description")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className={`${TailwindStyle.HIGHLIGHT_FRAME} px-8 py-3 hover:-translate-y-1 hover:shadow-lg transition-all duration-300`}
            >
              {t("support.contactSection.buttons.contact")}
            </Link>
            <a
              href="mailto:contact.artjourney01@gmail.com"
              className={`${TailwindStyle.HIGHLIGHT_FRAME} px-8 py-3 hover:-translate-y-1 hover:shadow-lg transition-all duration-300`}
            >
              {t("support.contactSection.buttons.email")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}