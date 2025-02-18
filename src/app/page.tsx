"use client";
import { Cursor } from "@/components/cursor";
import { InitialLoader } from "@/components/initial-loader";
import { NameIntro } from "@/components/name-intro";
import { useState } from "react";

export default function Home() {
  const [loadComplete, setLoadComplete] = useState(false);

  return (
    <>
      <Cursor />
      <div>
        {loadComplete && <NameIntro />}
        {!loadComplete && (
          <InitialLoader onLoadComplete={() => setLoadComplete(true)} />
        )}
      </div>
    </>
  );
}
