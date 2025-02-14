"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  const speed = 0.2;

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const updateCursor = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * speed;
      pos.current.y += (mouse.current.y - pos.current.y) * speed;

      if (Math.abs(mouse.current.x - pos.current.x) < 0.1)
        pos.current.x = mouse.current.x;
      if (Math.abs(mouse.current.y - pos.current.y) < 0.1)
        pos.current.y = mouse.current.y;

      gsap.set(cursor, {
        x: pos.current.x - cursor.offsetWidth / 2,
        y: pos.current.y - cursor.offsetHeight / 2,
      });

      requestAnimationFrame(updateCursor);
    };

    updateCursor();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed -top-12 -left-12 pointer-events-none z-50 flex flex-col justify-start items-center"
    >
      <div className="flex justify-center items-center h-screen relative">
        <svg
          className="rotating-svg animate-rotate-loader-text"
          width="200"
          height="200"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <path
              id="circlePath"
              d="M 100, 100 m -70, 0 a 70,70 0 1,1 140, 0 a 70,70 0 1,1 -140, 0"
            />
          </defs>
          <text className="fill-current text-background mix-blend-difference">
            <textPath href="#circlePath">
              Loading | Loading | Loading | Loading | Loading | Loading | Loading
            </textPath>
          </text>
        </svg>
      <p className="mix-blend-difference justify-self-center text-background text-lg absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">Loading...</p>
      </div>
    </div>
  );
};
