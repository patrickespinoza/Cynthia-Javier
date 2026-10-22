
import React from "react";
import { motion } from "framer-motion";

// ==========================================
// INFORMACIÓN EDITABLE - WEDLY PLUS
// ==========================================

const imagenFinal = "/finalboda.webp";

const iniciales = {
  primera: "A",
  segunda: "D",
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

const FinalBoda = () => {
  return (
    <section
      className="
        relative
        w-full
        min-h-screen
        overflow-hidden
        bg-[#4A141D]
      "
    >
      {/* FOTOGRAFÍA DE FONDO */}
      <img
        src={imagenFinal}
        alt="Fotografía final de los novios"
        className="
          absolute inset-0
          h-full w-full
          object-cover
          object-center
        "
      />

      {/* DEGRADADO INFERIOR PARA LAS INICIALES */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-gradient-to-t
          from-black/65
          via-black/10
          to-transparent
        "
      />

      {/* INICIALES EN LA PARTE INFERIOR */}
      <motion.div
        initial={{
          opacity: 0,
          y: 35,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          absolute
          bottom-12 sm:bottom-16
          left-0 right-0
          z-10
          flex flex-col
          items-center
          justify-center
          px-5
          text-center
        "
      >
        {/* ADORNO SUPERIOR */}
        <div
          className="
            mb-6
            h-px w-20
            bg-[#F4E8DD]/80
          "
        />

        {/* INICIALES */}
        <h2
          className="
            font-playfair
            text-6xl sm:text-7xl md:text-8xl
            font-normal
            tracking-[0.08em]
            text-[#F8F2ED]
            drop-shadow-[0_4px_15px_rgba(0,0,0,0.65)]
          "
        >
          {iniciales.primera}
          <span
            className="
              mx-3 sm:mx-5
              font-cursiveDancing
              font-normal
              text-[#F4E8DD]
            "
          >
            &
          </span>
          {iniciales.segunda}
        </h2>

        {/* ADORNO INFERIOR */}
        <div
          className="
            mt-6
            h-px w-20
            bg-[#F4E8DD]/80
          "
        />
      </motion.div>
    </section>
  );
};

export default FinalBoda;
