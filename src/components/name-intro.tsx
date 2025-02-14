"use client";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useEffect, useState } from "react";

export const NameIntro = () => {
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
          duration: 0.8, // Reduced from 1.2
          ease: "power3.out",
          stagger: 0.05, // Reduced from 0.1
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
        });
    },
    { scope: containerRef, dependencies: [scaleFactor] }
  );

  return (
    <div
      ref={containerRef}
      className="w-svh h-svh flex justify-center relative z-50 bg-background"
    >
      <div className="absolute bg-foreground w-full h-full bottom-0 left-0 backdrop" />
      <div
        ref={textContainerRef}
        className="flex w-full justify-between items-start transition-all duration-300 relative mix-blend-difference"
      >
        <h1 className="flex-1 text-white text-[9rem] font-bold my-0 tracking-tight leading-none flex">
          {["P", "R", "I", "T", "H", "V", "I", "R", "A", "J"].map((char, i) => (
            <span key={i} className="inline-block letter">
              {char}
            </span>
          ))}
        </h1>
        <h1 className="flex-1 text-white text-[9rem] font-bold my-0 tracking-tight leading-none flex">
          {["M", "A", "Z", "U", "M", "D", "E", "R"].map((char, i) => (
            <span key={i} className="inline-block letter">
              {char}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
};
