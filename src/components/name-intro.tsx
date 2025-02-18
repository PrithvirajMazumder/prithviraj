"use client";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

const Name = "Prithvi Raj";

type Props = {
  onAnimationComplete?: () => void;
};
export const NameIntro = (props: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [scaleFactor, setScaleFactor] = useState(1);

  useEffect(() => {
    const letterHeight = 144; // 9rem
    setScaleFactor(window.innerHeight / letterHeight);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Step 1: Stretch letters from top
      tl.fromTo(
        ".letter",
        {
          scaleY: 0,
          transformOrigin: "top",
        },
        {
          scaleY: scaleFactor,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.05,
          onComplete: () => {
            textContainerRef.current?.classList.add("items-end");
            gsap.set(".letter", { transformOrigin: "bottom" });
          },
        }
      )
        .to(".letter", {
          scaleY: 1,
          duration: 0.6, // Reduced from 1
          ease: "power3.inOut",
          stagger: 0.05, // Reduced from 0.1
        })
        .to(".backdrop", {
          delay: -1, // Changed from -0.3 to -0.5 to start earlier
          transformOrigin: "bottom",
          height: 0,
          duration: 1,
          ease: "power3.inOut",
          onComplete: props.onAnimationComplete && props.onAnimationComplete,
        })
        .fromTo(
          ".nav-item",
          {
            yPercent: -100, // Changed from 100 to -100
            opacity: 0,
          },
          {
            delay: -0.6,
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          }
        );
    },
    { scope: containerRef, dependencies: [scaleFactor] }
  );

  // Add this state for dynamic text size
  const [fontSize, setFontSize] = useState("9rem");

  // Add this effect for calculating font size
  useEffect(() => {
    const calculateFontSize = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const totalCharacters = Name.length + 1; // +1 for space

      // Calculate size based on width
      const widthBasedSize = Math.floor(
        viewportWidth / (totalCharacters * 0.5)
      );
      // Calculate size based on height (using about 20% of viewport height)
      const heightBasedSize = Math.floor(viewportHeight * 0.2);

      // Use the smaller of the two sizes to ensure text fits both dimensions
      const finalSize = Math.min(widthBasedSize, heightBasedSize);

      setFontSize(`${finalSize}px`);
      // Update scale factor for animation
      setScaleFactor(viewportHeight / finalSize);
    };

    calculateFontSize();
    window.addEventListener("resize", calculateFontSize);
    return () => window.removeEventListener("resize", calculateFontSize);
  }, [Name.length]);

  return (
    <div
      ref={containerRef}
      className="w-svh h-svh flex justify-center relative bg-background overflow-y-hidden"
    >
      <div className="fixed top-0 left-0 w-full py-12 px-8 z-50">
        <div className="relative flex items-center">
          <div className="flex-1 flex gap-20">
            <Link className="text-foreground text-lg overflow-hidden" href="/">
              <span className="nav-item inline-block">Portfolio</span>
            </Link>
            <Link className="text-foreground text-lg overflow-hidden" href="/">
              <span className="nav-item inline-block">About</span>
            </Link>
          </div>
          <Link
            className="absolute left-1/2 -translate-x-1/2 text-foreground text-3xl font-black italic overflow-hidden"
            href="/"
          >
            <span className="nav-item inline-block">Prithvi</span>
          </Link>
          <div className="flex-1 flex justify-end gap-20">
            <Link className="text-foreground text-lg overflow-hidden" href="/">
              <span className="nav-item inline-block">Contact</span>
            </Link>
            <Link className="text-foreground text-lg overflow-hidden" href="#">
              <span className="nav-item inline-block">2025</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bg-foreground w-full h-full bottom-0 left-0 backdrop" />
      <div
        ref={textContainerRef}
        className="flex w-full justify-center items-start transition-all duration-300 relative mix-blend-difference px-4"
      >
        <h1
          className="text-white font-bold my-0 tracking-tight leading-none flex whitespace-nowrap"
          style={{ fontSize }}
        >
          {Array.from(Name).map((char, i) => (
            <span
              key={`name-intro-hero-letter-${char}-${i}`}
              className="inline-block letter"
              style={{ marginRight: char === " " ? "0.2em" : "0" }}
            >
              {char}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
};
