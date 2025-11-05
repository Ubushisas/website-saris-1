"use client";
import "./index.css";
import "./preloader.css";
import { useRef, useState, useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomEase from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";
import ClientReviews from "@/components/ClientReviews/ClientReviews";
import Copy from "@/components/Copy/Copy";

let isInitialLoad = true;
gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export default function Home() {
  const tagsRef = useRef(null);
  const animatedReviewsRef = useRef(null);
  const cardPlaceholderEntranceRef = useRef(null);
  const cardSlideInAnimationRef = useRef(null);
  const [showPreloader, setShowPreloader] = useState(isInitialLoad);
  const [loaderAnimating, setLoaderAnimating] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    return () => {
      isInitialLoad = false;
    };
  }, []);

  useEffect(() => {
    if (lenis) {
      if (loaderAnimating) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [lenis, loaderAnimating]);

  useGSAP(() => {
    const tl = gsap.timeline({
      delay: 0.3,
      defaults: {
        ease: "hop",
      },
    });

    if (showPreloader) {
      setLoaderAnimating(true);
      const counts = document.querySelectorAll(".count");

      counts.forEach((count, index) => {
        const digits = count.querySelectorAll(".digit h1");

        tl.to(
          digits,
          {
            y: "0%",
            duration: 1,
            stagger: 0.075,
          },
          index * 1
        );

        if (index < counts.length) {
          tl.to(
            digits,
            {
              y: "-100%",
              duration: 1,
              stagger: 0.075,
            },
            index * 1 + 1
          );
        }
      });

      tl.to(".spinner", {
        opacity: 0,
        duration: 0.3,
      });

      tl.to(
        ".word h1",
        {
          y: "0%",
          duration: 1,
        },
        "<"
      );

      tl.to(".divider", {
        scaleY: "100%",
        duration: 1,
        onComplete: () =>
          gsap.to(".divider", { opacity: 0, duration: 0.3, delay: 0.3 }),
      });

      tl.to("#word-1 h1", {
        y: "100%",
        duration: 1,
        delay: 0.3,
      });

      tl.to(
        "#word-2 h1",
        {
          y: "-100%",
          duration: 1,
        },
        "<"
      );

      tl.to(
        ".block",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1,
          stagger: 0.1,
          delay: 0.75,
          onStart: () => {
            gsap.to(".hero-img", { scale: 1, duration: 2, ease: "hop" });
          },
          onComplete: () => {
            gsap.set(".loader", { pointerEvents: "none" });
            setLoaderAnimating(false);
          },
        },
        "<"
      );
    }
  }, [showPreloader]);

  useGSAP(
    () => {
      if (!tagsRef.current) return;

      const tags = tagsRef.current.querySelectorAll(".what-we-do-tag");
      gsap.set(tags, { opacity: 0, x: -40 });

      ScrollTrigger.create({
        trigger: tagsRef.current,
        start: "top 90%",
        once: true,
        animation: gsap.to(tags, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        }),
      });
    },
    { scope: tagsRef }
  );

  useGSAP(
    () => {
      if (!animatedReviewsRef.current) return;

      const reviewSection = animatedReviewsRef.current;
      const reviewMembers = gsap.utils.toArray(".animated-review-member");
      const reviewMemberCards = gsap.utils.toArray(".animated-review-card");

      function initReviewAnimations() {
        if (window.innerWidth < 1000) {
          if (cardPlaceholderEntranceRef.current)
            cardPlaceholderEntranceRef.current.kill();
          if (cardSlideInAnimationRef.current)
            cardSlideInAnimationRef.current.kill();

          reviewMembers.forEach((member) => {
            gsap.set(member, { clearProps: "all" });
            const reviewMemberInitial = member.querySelector(
              ".animated-review-initial h1"
            );
            if (reviewMemberInitial) gsap.set(reviewMemberInitial, { clearProps: "all" });
          });

          reviewMemberCards.forEach((card) => {
            gsap.set(card, { clearProps: "all" });
          });

          return;
        }

        if (cardPlaceholderEntranceRef.current)
          cardPlaceholderEntranceRef.current.kill();
        if (cardSlideInAnimationRef.current)
          cardSlideInAnimationRef.current.kill();

        cardPlaceholderEntranceRef.current = ScrollTrigger.create({
          trigger: reviewSection,
          start: "top bottom",
          end: "top top",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            reviewMembers.forEach((member, index) => {
              const entranceDelay = 0.15;
              const entranceDuration = 0.7;
              const entranceStart = index * entranceDelay;
              const entranceEnd = entranceStart + entranceDuration;

              if (progress >= entranceStart && progress <= entranceEnd) {
                const memberEntranceProgress =
                  (progress - entranceStart) / entranceDuration;

                const entranceY = 125 - memberEntranceProgress * 125;
                gsap.set(member, { y: `${entranceY}%` });

                const reviewMemberInitial = member.querySelector(
                  ".animated-review-initial h1"
                );
                if (reviewMemberInitial) {
                  const initialLetterScaleDelay = 0.4;
                  const initialLetterScaleProgress = Math.max(
                    0,
                    (memberEntranceProgress - initialLetterScaleDelay) /
                      (1 - initialLetterScaleDelay)
                  );
                  gsap.set(reviewMemberInitial, {
                    scale: initialLetterScaleProgress,
                  });
                }
              } else if (progress > entranceEnd) {
                gsap.set(member, { y: `0%` });
                const reviewMemberInitial = member.querySelector(
                  ".animated-review-initial h1"
                );
                if (reviewMemberInitial) gsap.set(reviewMemberInitial, { scale: 1 });
              }
            });
          },
        });

        cardSlideInAnimationRef.current = ScrollTrigger.create({
          trigger: reviewSection,
          start: "top top",
          end: `+=${window.innerHeight * 5}`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            reviewMemberCards.forEach((card, index) => {
              const slideInStagger = 0.1;
              const xRotationDuration = 0.3;
              const xRotationStart = index * slideInStagger;
              const xRotationEnd = xRotationStart + xRotationDuration;

              if (progress >= xRotationStart && progress <= xRotationEnd) {
                const cardProgress =
                  (progress - xRotationStart) / xRotationDuration;

                const cardInitialX = 200 - index * 100;
                const cardTargetX = -50;
                const cardSlideInX =
                  cardInitialX + cardProgress * (cardTargetX - cardInitialX);

                const cardSlideInRotation = 20 - cardProgress * 20;

                gsap.set(card, {
                  x: `${cardSlideInX}%`,
                  rotation: cardSlideInRotation,
                });
              } else if (progress > xRotationEnd) {
                gsap.set(card, {
                  x: `-50%`,
                  rotation: 0,
                });
              }

              const cardScaleStagger = 0.08;
              const cardScaleStart = 0.3 + index * cardScaleStagger;
              const cardScaleEnd = 0.8;

              if (progress >= cardScaleStart && progress <= cardScaleEnd) {
                const scaleProgress =
                  (progress - cardScaleStart) / (cardScaleEnd - cardScaleStart);
                const scaleValue = 0.75 + scaleProgress * 0.25;

                gsap.set(card, {
                  scale: scaleValue,
                });
              } else if (progress > cardScaleEnd) {
                gsap.set(card, {
                  scale: 1,
                });
              }
            });
          },
        });
      }

      let resizeTimer;
      const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          initReviewAnimations();
          ScrollTrigger.refresh();
        }, 250);
      };

      window.addEventListener("resize", handleResize);

      initReviewAnimations();

      return () => {
        window.removeEventListener("resize", handleResize);
        if (cardPlaceholderEntranceRef.current)
          cardPlaceholderEntranceRef.current.kill();
        if (cardSlideInAnimationRef.current)
          cardSlideInAnimationRef.current.kill();
      };
    },
    { scope: animatedReviewsRef }
  );

  return (
    <>
      {showPreloader && (
        <div className="loader">
          <div className="overlay">
            <div className="block"></div>
            <div className="block"></div>
          </div>
          <div className="intro-logo">
            <div className="word" id="word-1">
              <h1>
                <span>Wellness Hydration</span>
              </h1>
            </div>
            <div className="word" id="word-2">
              <h1>Spa</h1>
            </div>
          </div>
          <div className="divider"></div>
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
          <div className="counter">
            <div className="count">
              <div className="digit">
                <h1>0</h1>
              </div>
              <div className="digit">
                <h1>0</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>2</h1>
              </div>
              <div className="digit">
                <h1>7</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>6</h1>
              </div>
              <div className="digit">
                <h1>5</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>9</h1>
              </div>
              <div className="digit">
                <h1>8</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>9</h1>
              </div>
              <div className="digit">
                <h1>9</h1>
              </div>
            </div>
          </div>
        </div>
      )}
      <section className="hero">
        <div className="hero-bg">
          <img src="/home/hero.jpg" alt="" />
        </div>
        <div className="hero-gradient"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-header">
              <Copy animateOnScroll={false} delay={showPreloader ? 10 : 0.85}>
                <h1>Revitalize Your Body, Mind & Soul</h1>
              </Copy>
            </div>
            <div className="hero-tagline">
              <Copy animateOnScroll={false} delay={showPreloader ? 10.15 : 1}>
                <p>
                  Your journey to feeling and looking amazing starts here
                </p>
              </Copy>
            </div>
            <AnimatedButton
              label="Discover More"
              route="/studio"
              animateOnScroll={false}
              delay={showPreloader ? 10.3 : 1.15}
            />
          </div>
        </div>
      </section>
      <section className="what-we-do">
        <div className="container">
          <div className="what-we-do-header">
            <Copy delay={0.1}>
              <h1>
                <span className="spacer">&nbsp;</span>
                At Wellness Hydration Spa, wellness begins with you. Each treatment is crafted to renew your glow, balance, and energy from within.
              </h1>
            </Copy>
          </div>
          <div className="what-we-do-content">
            <div className="what-we-do-col">
              <div className="what-we-do-tags" ref={tagsRef}>
                <a href="/studio" className="what-we-do-tag">
                  <h3>Facials</h3>
                </a>
                <a href="/studio" className="what-we-do-tag">
                  <h3>Skin Care</h3>
                </a>
                <a href="/studio" className="what-we-do-tag">
                  <h3>Massage</h3>
                </a>
                <a href="/studio" className="what-we-do-tag">
                  <h3>Therapy</h3>
                </a>
                <a href="/studio" className="what-we-do-tag">
                  <h3>Body</h3>
                </a>
              </div>
            </div>
            <div className="what-we-do-col">
            </div>
          </div>
        </div>
      </section>
      <section className="animated-gallery-callout">
        <div className="animated-gallery-container">
          <div className="animated-gallery-col">
            <div className="animated-gallery-copy">
              <Copy delay={0.1}>
                <h3>
                  With over 15 years of experience, our lead nurse brings expertise, trust, and care to every wellness experience in St. Cloud.
                </h3>
              </Copy>
            </div>
          </div>
          <div className="animated-gallery-col">
            <div className="animated-gallery-row">
              <div className="animated-gallery-img animated-gallery-img-1">
                <img src="/gallery-callout/gallery-callout-1.jpg" alt="Spa treatment 1" />
              </div>
              <div className="animated-gallery-img animated-gallery-img-2">
                <img src="/gallery-callout/gallery-callout-2.jpg" alt="Spa treatment 2" />
              </div>
            </div>
            <div className="animated-gallery-row">
              <div className="animated-gallery-img animated-gallery-img-3">
                <img src="/gallery-callout/gallery-callout-3.jpg" alt="Spa treatment 3" />
              </div>
              <div className="animated-gallery-img animated-gallery-img-4">
                <img src="/gallery-callout/gallery-callout-4.jpg" alt="Spa treatment 4" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="animated-reviews-section" ref={animatedReviewsRef}>
        <div className="animated-review-member">
          <div className="animated-review-initial">
            <h1>S</h1>
          </div>
          <div className="animated-review-card">
            <div className="animated-review-img">
              <img src="/clients/sarah-martinez.jpg" alt="Sarah Martinez" />
            </div>
            <div className="animated-review-info">
              <p className="mono">Regular Client</p>
              <h2>Sarah Martinez</h2>
              <p className="animated-review-text">
                "The vitamin IV therapy here is incredible! I feel so energized and rejuvenated after each session. The staff is knowledgeable and makes you feel so comfortable. This place has become my wellness sanctuary."
              </p>
            </div>
          </div>
        </div>

        <div className="animated-review-member">
          <div className="animated-review-initial">
            <h1>M</h1>
          </div>
          <div className="animated-review-card">
            <div className="animated-review-img">
              <img src="/clients/michael-chen.jpg" alt="Michael Chen" />
            </div>
            <div className="animated-review-info">
              <p className="mono">Monthly Member</p>
              <h2>Michael Chen</h2>
              <p className="animated-review-text">
                "Best spa experience I've ever had. The hydration treatments have completely transformed my skin and energy levels. The atmosphere is so calming and the results speak for themselves. Highly recommend!"
              </p>
            </div>
          </div>
        </div>

        <div className="animated-review-member">
          <div className="animated-review-initial">
            <h1>E</h1>
          </div>
          <div className="animated-review-card">
            <div className="animated-review-img">
              <img src="/clients/emily-rodriguez.jpg" alt="Emily Rodriguez" />
            </div>
            <div className="animated-review-info">
              <p className="mono">Spa Enthusiast</p>
              <h2>Emily Rodriguez</h2>
              <p className="animated-review-text">
                "I've tried many wellness centers, but this one stands out. The personalized approach to each treatment, combined with the serene environment, makes every visit feel like a mini vacation. My skin has never looked better!"
              </p>
            </div>
          </div>
        </div>
      </section>
      <Nav />
      <ConditionalFooter />
    </>
  );
}
