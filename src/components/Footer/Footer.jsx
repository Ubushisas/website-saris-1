"use client";
import "./Footer.css";

import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useViewTransition } from "@/hooks/useViewTransition";
import Copy from "../Copy/Copy";

import { RiLinkedinBoxLine } from "react-icons/ri";
import { RiInstagramLine } from "react-icons/ri";
import { RiDribbbleLine } from "react-icons/ri";
import { RiYoutubeLine } from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const { navigateWithTransition } = useViewTransition();
  const socialIconsRef = useRef(null);

  useGSAP(
    () => {
      if (!socialIconsRef.current) return;

      const icons = socialIconsRef.current.querySelectorAll(".icon");
      gsap.set(icons, { opacity: 0, x: -40 });

      ScrollTrigger.create({
        trigger: socialIconsRef.current,
        start: "top 90%",
        once: true,
        animation: gsap.to(icons, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: -0.1,
          ease: "power3.out",
        }),
      });
    },
    { scope: socialIconsRef }
  );

  return (
    <div className="footer">
      <div className="footer-meta">
        <div className="container footer-meta-header">
          <div className="footer-meta-col">
            <div className="footer-meta-block">
              <div className="footer-meta-logo">
                <Copy delay={0.1}>
                  <h3 className="lg">Wellness Hydration Spa</h3>
                </Copy>
              </div>
              <Copy delay={0.2}>
                <h2>Your wellness journey begins here.</h2>
              </Copy>
            </div>
          </div>
          <div className="footer-meta-col">
            <div className="footer-nav-links">
              <Copy delay={0.1}>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition("/");
                  }}
                >
                  <h3>Index</h3>
                </a>
                <a
                  href="/our-team"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition("/our-team");
                  }}
                >
                  <h3>Our Team</h3>
                </a>
                <a
                  href="/services"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition("/services");
                  }}
                >
                  <h3>Services</h3>
                </a>
                <a
                  href="/connect"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition("/connect");
                  }}
                >
                  <h3>Connect</h3>
                </a>
              </Copy>
            </div>
          </div>
        </div>
        <div className="container footer-socials">
          <div className="footer-meta-col">
            <div className="footer-socials-wrapper" ref={socialIconsRef}>
              <div className="icon">
                <RiLinkedinBoxLine />
              </div>
              <div className="icon">
                <RiInstagramLine />
              </div>
              <div className="icon">
                <RiDribbbleLine />
              </div>
              <div className="icon">
                <RiYoutubeLine />
              </div>
            </div>
          </div>
          <div className="footer-meta-col">
            <Copy delay={0.1}>
              <p>
                We believe wellness is a journey, not a destination. Every treatment is crafted to restore, rejuvenate, and revitalize.
              </p>
            </Copy>
          </div>
        </div>
      </div>
      <div className="footer-outro">
        <div className="container">
          <div className="footer-copyright">
            <p>
              <span>Wellness spa</span>
            </p>
            <p>This website is using cookies.</p>
            <p>All rights reserverd &copy; 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
