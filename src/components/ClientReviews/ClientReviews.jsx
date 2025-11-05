"use client";
import "./ClientReviews.css";
import clientReviewsContent from "./client-reviews-content";

import { useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ClientReviews = () => {
  const reviewSectionRef = useRef(null);
  const cardPlaceholderEntranceRef = useRef(null);
  const cardSlideInAnimationRef = useRef(null);

  useGSAP(
    () => {
      const reviewSection = reviewSectionRef.current;
      const reviewMembers = gsap.utils.toArray(".review-member");
      const reviewMemberCards = gsap.utils.toArray(".review-member-card");

      function initReviewAnimations() {
        if (window.innerWidth < 1000) {
          if (cardPlaceholderEntranceRef.current)
            cardPlaceholderEntranceRef.current.kill();
          if (cardSlideInAnimationRef.current)
            cardSlideInAnimationRef.current.kill();

          reviewMembers.forEach((member) => {
            gsap.set(member, { clearProps: "all" });
            const reviewMemberInitial = member.querySelector(
              ".review-member-name-initial h1"
            );
            gsap.set(reviewMemberInitial, { clearProps: "all" });
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
                  ".review-member-name-initial h1"
                );
                const initialLetterScaleDelay = 0.4;
                const initialLetterScaleProgress = Math.max(
                  0,
                  (memberEntranceProgress - initialLetterScaleDelay) /
                    (1 - initialLetterScaleDelay)
                );
                gsap.set(reviewMemberInitial, {
                  scale: initialLetterScaleProgress,
                });
              } else if (progress > entranceEnd) {
                gsap.set(member, { y: `0%` });
                const reviewMemberInitial = member.querySelector(
                  ".review-member-name-initial h1"
                );
                gsap.set(reviewMemberInitial, { scale: 1 });
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
    { scope: reviewSectionRef }
  );

  return (
    <div className="client-reviews-animated" ref={reviewSectionRef}>
      {clientReviewsContent.map((client, index) => (
        <div key={client.id} className="review-member">
          <div className="review-member-name-initial">
            <h1>{client.name.charAt(0)}</h1>
          </div>
          <div className="review-member-card">
            <div className="review-member-img">
              <img src={client.avatar} alt={client.name} />
            </div>
            <div className="review-member-info">
              <p>( {client.title} )</p>
              <h3>{client.name}</h3>
              <p className="review-text">{client.review}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientReviews;
