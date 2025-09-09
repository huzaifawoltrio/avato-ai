"use client";

import dynamic from "next/dynamic";

const ParticlesBg = dynamic(() => import("particles-bg"), { ssr: false });

export default function ParticlesBackground() {
  return <ParticlesBg type="cobweb" bg={true} num={200} color="#9133E6" />;
}
