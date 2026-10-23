
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

// ==========================================
// CONFIGURACIÓN EDITABLE - WEDLY
// ==========================================

const CONFIG = {
  titulo: "Nuestros Padres",

  mensaje:
    "Con el amor, la bendición y el apoyo de nuestros padres, tenemos la alegría de compartir este momento tan especial.",

  padresNovia: {
    titulo: "Padres de la novia",
    padre: "Marco Antonio Márquez Delgado †",
    madre: "Alma Rocio Martínez Acosta ",
  },

  padresNovio: {
    titulo: "Padres del novio",
    padre: "Francisco Javier García Jaramillo",
    madre: "María Isela Flores López",
  },

  fraseFinal:
    "Gracias por enseñarnos que el amor es el comienzo de todo.",
};

// ==========================================
// ANIMACIONES
// ==========================================

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ==========================================
// DECORACIÓN BOTÁNICA
// ==========================================

function RamaBotanica({ className = "" }) {
  return (
    <svg
      viewBox="0 0 150 230"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M15 220C34 177 50 137 77 99C99 68 112 37 126 7"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />

      {[
        [30, 180, -40],
        [48, 148, 38],
        [65, 119, -38],
        [83, 91, 36],
        [103, 58, -36],
        [119, 29, 30],
      ].map(([x, y, angle], index) => (
        <g
          key={index}
          transform={`translate(${x} ${y}) rotate(${angle})`}
        >
          <path
            d="M0 0C-15 -11 -14 -29 0 -38C13 -27 14 -11 0 0Z"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M0 0V-32"
            stroke="currentColor"
            strokeWidth=".6"
          />
        </g>
      ))}
    </svg>
  );
}

// ==========================================
// ORNAMENTO CENTRAL
// ==========================================

function Ornamento({ className = "" }) {
  return (
    <div
      className={`
        flex items-center justify-center
        gap-4 text-[#B79A70]
        ${className}
      `}
      aria-hidden="true"
    >
      <span className="h-px w-12 bg-[#B79A70]/70" />

      <svg
        width="43"
        height="30"
        viewBox="0 0 43 30"
        fill="none"
      >
        <path
          d="M4 24C15 18 25 13 39 5"
          stroke="currentColor"
          strokeWidth="1.1"
        />
        <path
          d="M15 18C8 16 7 11 8 8C15 9 17 13 15 18Z"
          stroke="currentColor"
        />
        <path
          d="M24 13C24 5 29 3 33 3C33 9 29 12 24 13Z"
          stroke="currentColor"
        />
        <path
          d="M28 11C34 12 37 16 36 20C31 19 28 16 28 11Z"
          stroke="currentColor"
        />
      </svg>

      <span className="h-px w-12 bg-[#B79A70]/70" />
    </div>
  );
}

// ==========================================
// GRUPO DE PADRES
// ==========================================

function GrupoPadres({ titulo, padre, madre, index }) {
  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2,
      }}
      variants={fadeUp}
      transition={{ delay: index * 0.15 }}
      className="
        relative
        flex h-full w-full
        flex-col items-center
        px-4 py-7
        text-center
        sm:px-8
        md:py-10
      "
    >
      {/* DETALLE SUPERIOR */}

      <div
        className="
          mb-7
          flex h-12 w-12
          items-center justify-center
          rounded-full
          border border-[#B79A70]/65
          text-[#B79A70]
        "
      >
        <Heart
          size={19}
          strokeWidth={1.25}
        />
      </div>

      {/* TÍTULO */}

      <h3
        className="
          font-playfair
          text-[clamp(1.25rem,3vw,1.65rem)]
          font-normal
          text-[#52614D]
        "
      >
        {titulo}
      </h3>

      {/* LÍNEA DECORATIVA */}

      <div
        className="
          my-7
          h-px w-14
          bg-[#B79A70]/70
        "
      />

      {/* NOMBRES */}

      <div
        className="
          flex w-full
          flex-col items-center
          gap-4
        "
      >
        <p
          className="
            max-w-full
            font-playfair
            text-[clamp(1.45rem,3.5vw,2.1rem)]
            font-normal
            leading-[1.4]
            text-[#102B50]
            break-words
          "
        >
          {padre}
        </p>

        <span
          className="
            font-cursiveDancing
            text-[27px]
            leading-none
            text-[#B79A70]
          "
          aria-label="y"
        >
          &
        </span>

        <p
          className="
            max-w-full
            font-playfair
            text-[clamp(1.45rem,3.5vw,2.1rem)]
            font-normal
            leading-[1.4]
            text-[#102B50]
            break-words
          "
        >
          {madre}
        </p>
      </div>
    </motion.article>
  );
}

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function Padres() {
  return (
    <section
      id="padres"
      className="
        relative isolate
        w-full overflow-hidden
        bg-[#F4EDE3]
        px-4 py-20
        sm:px-8 sm:py-28
        lg:py-32
      "
    >
      {/* ======================================
          RAMAS BOTÁNICAS
      ====================================== */}

      <RamaBotanica
        className="
          pointer-events-none
          absolute -left-10 top-5
          h-44 w-32
          rotate-180
          text-[#52614D]/35
          sm:left-0
          sm:h-60 sm:w-44
        "
      />

      <RamaBotanica
        className="
          pointer-events-none
          absolute -right-10 top-8
          h-44 w-32
          rotate-180 -scale-x-100
          text-[#B79A70]/45
          sm:right-0
          sm:h-60 sm:w-44
        "
      />

      <RamaBotanica
        className="
          pointer-events-none
          absolute -left-12 -bottom-12
          h-48 w-36
          text-[#52614D]/45
          sm:h-64 sm:w-48
        "
      />

      <RamaBotanica
        className="
          pointer-events-none
          absolute -right-12 -bottom-12
          h-48 w-36
          -scale-x-100
          text-[#B79A70]/55
          sm:h-64 sm:w-48
        "
      />

      {/* ======================================
          CONTENIDO
      ====================================== */}

      <div
        className="
          relative z-10
          mx-auto
          w-full max-w-5xl
        "
      >
        {/* ENCABEZADO */}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center"
        >
          <p
            className="
              text-[11px]
              uppercase
              tracking-[0.3em]
              text-[#52614D]
              sm:text-sm
            "
          >
            Con amor y gratitud
          </p>

          <h2
            className="
              mt-5
              font-playfair
              text-[clamp(2.5rem,7vw,4.8rem)]
              font-normal
              leading-[1.15]
              text-[#102B50]
            "
          >
            {CONFIG.titulo}
          </h2>

          <Ornamento className="mt-7" />

          <p
            className="
              mx-auto mt-8
              max-w-[570px]
              font-playfair
              text-[clamp(1rem,2.5vw,1.25rem)]
              leading-[1.9]
              text-[#52614D]
            "
          >
            {CONFIG.mensaje}
          </p>
        </motion.div>

        {/* ======================================
            NOMBRES DE LOS PADRES
        ====================================== */}

        <div
          className="
            mx-auto mt-12
            grid w-full
            max-w-[880px]
            grid-cols-1
            items-start
            gap-6
            sm:mt-16
            md:grid-cols-2
            md:gap-0
          "
        >
          {/* PADRES DE LA NOVIA */}

          <GrupoPadres
            titulo={CONFIG.padresNovia.titulo}
            padre={CONFIG.padresNovia.padre}
            madre={CONFIG.padresNovia.madre}
            index={0}
          />

          {/* PADRES DEL NOVIO */}

          <div
            className="
              relative
              border-t border-[#B79A70]/45
              md:border-l md:border-t-0
            "
          >
            <GrupoPadres
              titulo={CONFIG.padresNovio.titulo}
              padre={CONFIG.padresNovio.padre}
              madre={CONFIG.padresNovio.madre}
              index={1}
            />
          </div>
        </div>

        {/* ======================================
            MENSAJE FINAL
        ====================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.85,
            delay: 0.2,
          }}
          className="
            mx-auto mt-12
            max-w-xl
            text-center
            sm:mt-16
          "
        >
          <div
            className="
              mb-7
              flex items-center
              justify-center gap-4
            "
            aria-hidden="true"
          >
            <span
              className="
                h-px w-14
                bg-[#B79A70]/65
              "
            />

            <Heart
              size={14}
              fill="currentColor"
              className="text-[#B79A70]"
            />

            <span
              className="
                h-px w-14
                bg-[#B79A70]/65
              "
            />
          </div>

          <p
            className="
              font-cursiveDancing
              text-[clamp(1.8rem,4.5vw,2.7rem)]
              leading-[1.4]
              text-[#52614D]
            "
          >
            {CONFIG.fraseFinal}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
