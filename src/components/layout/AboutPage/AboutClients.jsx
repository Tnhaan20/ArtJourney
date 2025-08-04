import React from "react";
import { useTranslation } from "react-i18next";
import Carousel from "@/components/elements/carousel/Carousel";
import { Star, Quote } from "lucide-react";

export default function AboutClients() {
  const { t } = useTranslation();

  const testimonials = [
    {
      id: 1,
      nameKey: "about.clients.testimonials.sarah.name",
      roleKey: "about.clients.testimonials.sarah.role",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      quoteKey: "about.clients.testimonials.sarah.quote",
      rating: 5,
    },
    {
      id: 2,
      nameKey: "about.clients.testimonials.michael.name",
      roleKey: "about.clients.testimonials.michael.role",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      quoteKey: "about.clients.testimonials.michael.quote",
      rating: 5,
    },
    {
      id: 3,
      nameKey: "about.clients.testimonials.emma.name",
      roleKey: "about.clients.testimonials.emma.role",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      quoteKey: "about.clients.testimonials.emma.quote",
      rating: 5,
    },
    {
      id: 4,
      nameKey: "about.clients.testimonials.roberto.name",
      roleKey: "about.clients.testimonials.roberto.role",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      quoteKey: "about.clients.testimonials.roberto.quote",
      rating: 5,
    },
    {
      id: 5,
      nameKey: "about.clients.testimonials.lisa.name",
      roleKey: "about.clients.testimonials.lisa.role",
      image: "https://randomuser.me/api/portraits/women/35.jpg",
      quoteKey: "about.clients.testimonials.lisa.quote",
      rating: 5,
    },
    {
      id: 6,
      nameKey: "about.clients.testimonials.james.name",
      roleKey: "about.clients.testimonials.james.role",
      image: "https://randomuser.me/api/portraits/men/55.jpg",
      quoteKey: "about.clients.testimonials.james.quote",
      rating: 5,
    },
  ];

  // Custom slide renderer for testimonials
  const renderTestimonialSlide = (slide, index) => {
    if (!slide) return null;

    return (
      <div key={slide.id} className="h-full w-full flex-shrink-0 px-4">
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full p-6 border border-gray-100">
          {/* Quote Icon */}
          <div className="flex justify-between items-start mb-4">
            <Quote className="w-8 h-8 text-[#DDA853]/30 transform rotate-180" />
            <div className="flex gap-1">
              {[...Array(slide.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-[#DDA853] text-[#DDA853]"
                />
              ))}
            </div>
          </div>

          {/* Quote Text */}
          <blockquote className="text-gray-700 text-base leading-relaxed mb-6 flex-1">
            "{t(slide.quoteKey)}"
          </blockquote>

          {/* User Info */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#DDA853]/20">
              <img
                src={slide.image}
                alt={t(slide.nameKey)}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-lg">
                {t(slide.nameKey)}
              </h4>
              <p className="text-[#DDA853] text-sm font-medium">
                {t(slide.roleKey)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 text-black py-16 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#DDA853]/5 rounded-full blur-3xl -translate-y-32 -translate-x-32" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-y-32 translate-x-32" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#DDA853]/10 rounded-full mb-4">
            <Quote className="w-4 h-4 text-[#DDA853]" />
            <span className="text-[#DDA853] font-semibold text-sm uppercase tracking-wider">
              {t("about.clients.badge")}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            <span className="text-[#DDA853]">
              {t("about.clients.title.what")}
            </span>{" "}
            <span className="text-gray-800">
              {t("about.clients.title.learners")}
            </span>
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t("about.clients.description")}
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-6xl mx-auto">
          <Carousel
            slides={testimonials}
            autoPlay={true}
            interval={4000}
            width="w-full"
            height="h-80"
            rounded="rounded-none"
            showArrows={false}
            showDots={false}
            showTitle={false}
            renderSlide={renderTestimonialSlide}
            className="testimonials-carousel"
          />
        </div>

        {/* Bottom Stats */}
        <div className="text-center mt-16 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-2">
              <p className="text-4xl font-bold text-[#DDA853]">
                {t("about.clients.stats.rating.value")}
              </p>
              <p className="text-gray-600 font-medium">
                {t("about.clients.stats.rating.label")}
              </p>
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[#DDA853] text-[#DDA853]"
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-4xl font-bold text-blue-500">
                {t("about.clients.stats.students.value")}
              </p>
              <p className="text-gray-600 font-medium">
                {t("about.clients.stats.students.label")}
              </p>
              <p className="text-sm text-gray-500">
                {t("about.clients.stats.students.subtitle")}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-4xl font-bold text-green-500">
                {t("about.clients.stats.completion.value")}
              </p>
              <p className="text-gray-600 font-medium">
                {t("about.clients.stats.completion.label")}
              </p>
              <p className="text-sm text-gray-500">
                {t("about.clients.stats.completion.subtitle")}
              </p>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
}
