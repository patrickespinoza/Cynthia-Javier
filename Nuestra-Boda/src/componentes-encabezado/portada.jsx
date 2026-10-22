
"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Portada() {
  return (
    <section
      id="portada"
      className="
        relative
        isolate
        w-full
        h-screen
        min-h-[500px]
        overflow-hidden
      "
      style={{
        height: "100svh",
      }}
    >
      {/* ======================================
          FOTOGRAFÍA ORIGINAL
          Sin filtros ni degradados
      ====================================== */}

      <img
        src="/portada.JPG"
        alt="Cynthia y Javier abrazándose en el campo"
        className="
          absolute inset-0
          h-full w-full
          object-cover
          object-[center_65%]
          sm:object-[center_55%]
          lg:object-[center_58%]
        "
      />

      {/* ======================================
          NOMBRES Y FECHA
          PARTE SUPERIOR
      ====================================== */}

      <div
        className="
          absolute inset-x-0 top-0 z-10
          flex flex-col items-center
          px-3 pt-5
          text-center
          sm:px-6 sm:pt-7
          md:pt-9
          lg:pt-10
        "
      >
        {/* NOMBRES */}

        <motion.h1
          initial={{
            opacity: 0,
            y: -20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
          className="
            font-cursiveDancing
            text-[#282A27]
            text-[clamp(2.9rem,9vw,6.5rem)]
            font-normal
            leading-[1.1]
            tracking-[-0.025em]
            drop-shadow-[0_1px_2px_rgba(255,255,255,0.35)]
          "
        >
          Cynthia & Javier
        </motion.h1>

        {/* FECHA */}

        <motion.p
          initial={{
            opacity: 0,
            y: 12,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
            delay: 0.35,
            ease: "easeOut",
          }}
          className="
            mt-2
            font-playfair
            text-[#282A27]
            text-[clamp(0.85rem,2.7vw,1.35rem)]
            font-medium
            uppercase
            tracking-[0.16em]
            sm:mt-3
            sm:tracking-[0.25em]
          "
        >
          30 enero 2027
        </motion.p>
      </div>
    </section>
  );
}
