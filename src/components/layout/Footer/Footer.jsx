import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Footer.css";
import { assets } from "@/assets/assets";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <>
      {/* Gradient Divider */}
      <div className="footer-divider"></div>

      <footer className="footer">
        <div className="floating-brushes">
          <div className="brush">🖌️</div>
          <div className="brush">🎨</div>
          <div className="brush">✏️</div>
        </div>

        <div className="footer-content">
          <div className="footer-header">
            <div className="footer-logo-container">
              <img
                src={assets.main_logo.artjourney_logo}
                alt="ArtJourney Logo"
                className="w-10 h-10"
              />
              <div className="footer-logo">{t("footer.logo")}</div>
            </div>
            <div className="footer-tagline">{t("footer.tagline")}</div>
            <div className="footer-motto">{t("footer.motto")}</div>
          </div>
          <div className="divider"></div>
          <div className="footer-top">
            {/* About ArtJourney - Moved to left */}
            <div className="footer-section about-section">
              <h3>{t("footer.about.title")}</h3>
              <p>{t("footer.about.description")}</p>

              <div className="contact-info">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span>{t("footer.about.contact.address")}</span>
              </div>

              <div className="contact-info">
                <svg viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <span>{t("footer.about.contact.phone")}</span>
              </div>

              <div className="contact-info">
                <svg viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <span>{t("footer.about.contact.email")}</span>
              </div>

              <div className="social-links">
                <Link
                  to="https://www.facebook.com/artjourney123/"
                  className="social-link facebook"
                  title="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </Link>
                <Link
                  to="https://www.instagram.com/artjourney_midnightmeowers/"
                  className="social-link instagram"
                  title="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Featured Courses */}
            <div className="footer-section">
              <h3>{t("footer.featuredTopics.title")}</h3>
              <div className="course-highlight">
                <h4>{t("footer.featuredTopics.subtitle")}</h4>
                <div className="course-list">
                  {t("footer.featuredTopics.periods", {
                    returnObjects: true,
                  }).map((period, index) => (
                    <div key={index} className="course-item">
                      <span className="course-era">{period.era}</span>
                      <span>{period.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="footer-section">
              <h3>{t("footer.navigation.title")}</h3>
              <ul>
                <li>
                  <Link to="/about">{t("footer.navigation.links.about")}</Link>
                </li>
                <li>
                  <Link to="/pricing">
                    {t("footer.navigation.links.pricing")}
                  </Link>
                </li>
                <li>
                  <Link to="/learn">
                    {t("footer.navigation.links.courses")}
                  </Link>
                </li>
              </ul>

              <p style={{ marginTop: "20px", fontStyle: "italic" }}>
                "{t("footer.navigation.quote")}" - Edgar Degas
              </p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>{t("footer.bottom.copyright")}</p>
            <div className="footer-links">
              <Link to="/privacy">{t("footer.bottom.links.privacy")}</Link>
              <Link to="/terms">{t("footer.bottom.links.terms")}</Link>
              <Link to="/support">{t("footer.bottom.links.support")}</Link>
              <Link to="/contact">{t("footer.bottom.links.contact")}</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}