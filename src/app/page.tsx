"use client";
import { InitialLoader } from "@/components/initial-loader";
import { NameIntro } from "@/components/name-intro";
import { useState } from "react";

export default function Home() {
  const [loadComplete, setLoadComplete] = useState(false);

  return (
    <div>
      {loadComplete && <NameIntro />}
      <InitialLoader onLoadComplete={() => setLoadComplete(true)} />
    </div>
  );
}
