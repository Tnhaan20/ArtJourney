import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/ArtJourney-Logo.png";
import FacebookIcon from "../../assets/facebook.png";
import InstagramIcon from "../../assets/instagram.png";
import TiktokIcon from "../../assets/tiktok.png";
import YoutubeIcon from "../../assets/youtube.png";

export default function Footer() {
  return (
    <footer className="bg-white text-[#dda853] py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-x-12 gap-y-8">
        
        {/* Column 1: Logo & Address */}
        <div className="flex flex-col space-y-4">
          <img src={Logo} alt="Logo" className="w-20 h-auto" />
          <p>610 Nguyen Thuong Hien, District 10 Ho Chi Minh city</p>
        </div>

        {/* Column 2: About Us */}
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold uppercase">About Us</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="hover:underline">About Us</Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">Promotion</Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">Founder</Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Featured Topics */}
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold uppercase">Featured Topics</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">North America</a>
            </li>
            <li>
              <a href="#" className="hover:underline">South America</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Oceania</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Europe</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Africa</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Asia</a>
            </li>
          </ul>
        </div>

        {/* Column 4: Get Started */}
        <div>
          <h3 className="font-semibold uppercase">Get Started</h3>
          <ul className="space-y-2 mt-2">
            <li>
              <a href="#" className="hover:underline">Pricing</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Free Trial</a>
            </li>
          </ul>
        </div>

        {/* Column 5: Follow Us */}
        <div>
          <h3 className="font-semibold uppercase">Follow Us</h3>
          <div className="flex flex-col space-y-4 mt-2">
           {/* Facebook SVG */}
           <a href="https://facebook.com" className="cursor-pointer">
              <svg
                className="w-8 h-8"
                fill="#DDA853"
                viewBox="0 0 35 35"
                aria-hidden="true"
              >
                <path d="M16.59 0C7.43 0 0 7.43 0 16.59C0 25.75 7.43 33.18 16.59 33.18C25.75 33.18 33.18 25.75 33.18 16.59C33.18 7.43 25.75 0 16.59 0ZM23.12 8.38H21.18C19.27 8.38 18.67 9.57 18.67 10.79V13.68H22.94L22.26 18.13H18.67V28.9H13.85V18.13H9.94V13.68H13.85V10.29C13.85 6.43 16.15 4.3 19.67 4.3C21.36 4.3 23.12 4.6 23.12 4.6V8.38Z"></path>
              </svg>
            </a>
            {/* Instagram SVG */}
            <a href="https://instagram.com" className="cursor-pointer">
              <svg
                className="w-8 h-8"
                fill="#DDA853"
                viewBox="0 0 35 35"
                aria-hidden="true"
              >
                <path d="M16.67 13.6001C14.92 13.6001 13.5 15.0201 13.5 16.7701C13.5 18.5201 14.92 19.9401 16.67 19.9401C18.42 19.9401 19.84 18.5201 19.84 16.7701C19.84 15.0201 18.42 13.6001 16.67 13.6001Z M20.6 8.61035H12.57C10.28 8.61035 8.41998 10.4704 8.41998 12.7604V20.7904C8.41998 23.0804 10.28 24.9404 12.57 24.9404H20.6C22.89 24.9404 24.75 23.0804 24.75 20.7904V12.7604C24.75 10.4704 22.89 8.61035 20.6 8.61035ZM16.67 21.7204C13.94 21.7204 11.72 19.5003 11.72 16.7703C11.72 14.0403 13.94 11.8204 16.67 11.8204C19.4 11.8204 21.62 14.0403 21.62 16.7703C21.62 19.5003 19.4 21.7204 16.67 21.7204ZM21.91 12.6703C21.26 12.6703 20.73 12.1403 20.73 11.4903C20.73 10.8403 21.26 10.3103 21.91 10.3103C22.56 10.3103 23.09 10.8403 23.09 11.4903C23.09 12.1403 22.56 12.6703 21.91 12.6703ZM16.59 0.180176C7.43 0.180176 0 7.61017 0 16.7702C0 25.9302 7.43 33.3602 16.59 33.3602C25.75 33.3602 33.18 25.9302 33.18 16.7702C33.18 7.61017 25.75 0.180176 16.59 0.180176ZM26.64 20.7902C26.64 24.1202 23.93 26.8302 20.6 26.8302H12.57C9.24 26.8302 6.53 24.1202 6.53 20.7902V12.7602C6.53 9.43018 9.24 6.72017 12.57 6.72017H20.6C23.93 6.72017 26.64 9.43018 26.64 12.7602V20.7902Z"></path>
              </svg>
            </a>
            {/* Tiktok SVG */}
            <a href="https://tiktok.com" className="cursor-pointer">
              <svg
                className="w-8 h-8"
                fill="#DDA853"
                viewBox="0 0 35 35"
                aria-hidden="true"
              >
                <path d="M26.78 13.0199C26.52 13.0399 26.27 13.0599 26.01 13.0599C23.19 13.0599 20.56 11.6399 19.02 9.27986V22.1399C19.02 27.3899 14.76 31.6499 9.50999 31.6499C4.25999 31.6499 0 27.3899 0 22.1399C0 16.8899 4.25999 12.6299 9.50999 12.6299C9.70999 12.6299 9.89999 12.6499 10.1 12.6599V17.3399C9.90999 17.3199 9.70999 17.2799 9.50999 17.2799C6.82999 17.2799 4.65999 19.4499 4.65999 22.1299C4.65999 24.8099 6.82999 26.9799 9.50999 26.9799C12.19 26.9799 14.56 24.8699 14.56 22.1899L14.61 0.359863H19.09C19.51 4.37986 22.75 7.51986 26.78 7.80986V13.0199Z"></path>
              </svg>
            </a>
            {/* Youtube SVG */}
            <a href="https://youtube.com" className="cursor-pointer">
              <svg
                className="w-8 h-8"
                fill="#DDA853"
                viewBox="0 0 35 35"
                aria-hidden="true"
              >
                <path d="M30.43 7.3299C30.43 3.6399 27.44 0.649902 23.75 0.649902H6.68002C2.99002 0.649902 0 3.6399 0 7.3299V15.2699C0 18.9599 2.99002 21.9499 6.68002 21.9499H23.75C27.44 21.9499 30.43 18.9599 30.43 15.2699V7.3299ZM20.39 11.8999L12.74 15.6899C12.44 15.8499 11.42 15.6299 11.42 15.2899V7.5199C11.42 7.1699 12.45 6.9599 12.75 7.1299L20.08 11.1199C20.38 11.2899 20.7 11.7299 20.39 11.8999Z"></path>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
