
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Shirt,
  Sparkles,
  Heart,
  UsersRound,
} from "lucide-react";

// ==========================================
// DECORACIÓN BOTÁNICA
// ==========================================

const RamaBotanica = ({ className = "" }) => (
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

// ==========================================
// ANIMACIONES
// ==========================================

const aparecer = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function Vestimenta() {
  return (
    <section
      id="vestimenta"
      className="
        relative isolate
        w-full overflow-hidden
        bg-[#F4EDE3]
        px-5 py-20
        sm:px-8 sm:py-28
        lg:py-32
      "
      style={{
        backgroundImage:
          "radial-gradient(ellipse at center, #FFFDF9 0%, #F4EDE3 85%)",
      }}
    >
      {/* ======================================
          RAMAS BOTÁNICAS
      ====================================== */}

      <RamaBotanica
        className="
          pointer-events-none absolute
          -left-10 -top-12
          h-48 w-36 rotate-180
          text-[#B79A70]/65
          sm:left-0 sm:top-0
          sm:h-64 sm:w-48
        "
      />

      <RamaBotanica
        className="
          pointer-events-none absolute
          -right-10 -bottom-12
          h-48 w-36 -scale-x-100
          text-[#52614D]/60
          sm:right-0 sm:bottom-0
          sm:h-64 sm:w-48
        "
      />

      {/* ======================================
          CONTENIDO PRINCIPAL
      ====================================== */}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.12,
        }}
        className="
          relative z-10
          mx-auto flex
          w-full max-w-[850px]
          flex-col items-center
          text-center
        "
      >
        {/* SUBTÍTULO */}

        <motion.p
          variants={aparecer}
          className="
            text-[11px]
            font-medium uppercase
            tracking-[0.35em]
            text-[#52614D]
            sm:text-sm
          "
        >
          Nuestro día especial
        </motion.p>

        {/* TÍTULO */}

        <motion.h2
          variants={aparecer}
          className="
            mt-5 font-playfair
            text-[clamp(2.7rem,7vw,5rem)]
            font-normal leading-[1.15]
            text-[#102B50]
          "
        >
          Código de Vestimenta
        </motion.h2>

        {/* SEPARADOR */}

        <motion.div
          variants={aparecer}
          className="
            mt-7 flex items-center
            justify-center gap-4
          "
        >
          <span className="h-px w-14 bg-[#B79A70]" />

          <Heart
            size={13}
            fill="currentColor"
            className="text-[#B79A70]"
          />

          <span className="h-px w-14 bg-[#B79A70]" />
        </motion.div>

        {/* ======================================
            VESTIMENTA FORMAL
        ====================================== */}

        <motion.div
          variants={aparecer}
          className="
            mt-12 flex
            flex-col items-center
            sm:mt-16
          "
        >


          <h3
            className="
              mt-3 font-playfair
              text-4xl font-normal
              text-[#102B50]
              sm:text-5xl
            "
          >
            Formal
          </h3>

          <p
            className="
              mt-5 max-w-[490px]
              text-sm leading-8
              text-[#52614D]
              sm:text-base
            "
          >
            Nos encantará verte elegante para
            celebrar juntos este día tan especial.
          </p>
        </motion.div>

        {/* ======================================
            AVISO DE COLOR RESERVADO
        ====================================== */}

        <motion.div
          variants={aparecer}
          className="
            mt-12 w-full max-w-[590px]
            rounded-[22px]
            border border-[#B79A70]/55
            bg-[#FFFDF9]/65
            px-5 py-9
            shadow-[0_12px_35px_rgba(16,43,80,0.045)]
            sm:mt-14
            sm:px-10 sm:py-11
          "
        >
          <div
            className="
              mx-auto flex h-14 w-14
              items-center justify-center
              rounded-full
              bg-[#102B50]
              text-[#F4EDE3]
            "
          >
            <Sparkles size={23} strokeWidth={1.4} />
          </div>

          <h3
            className="
              mt-5 font-playfair
              text-2xl text-[#102B50]
              sm:text-3xl
            "
          >
            Color reservado
          </h3>

          <p
            className="
              mx-auto mt-4 max-w-[440px]
              text-sm leading-8
              text-[#52614D]
              sm:text-base
            "
          >
            El color{" "}
            <strong className="font-semibold text-[#102B50]">
              azul navy (azul marino)
            </strong>{" "}
            estará reservado para nuestras damas
            del cortejo.
          </p>

          <p
            className="
              mx-auto mt-3 max-w-[440px]
              text-sm leading-7
              text-[#52614D]
              sm:text-base
            "
          >
            Agradecemos a nuestros invitados
            evitar este color en su vestimenta.
          </p>

          {/* MUESTRA DEL COLOR RESERVADO */}

          <div
            className="
              mt-7 flex flex-col
              items-center gap-3
            "
          >
            <div
              className="
                h-12 w-12
                rounded-full
                border-[3px] border-white
                bg-[#102B50]
                shadow-[0_0_0_1px_rgba(183,154,112,0.6)]
              "
              aria-label="Muestra de color azul navy"
              role="img"
            />

            <span
              className="
                text-[10px] uppercase
                tracking-[0.22em]
                text-[#52614D]
              "
            >
              Azul navy · Reservado
            </span>
          </div>
        </motion.div>

        {/* ======================================
            CIERRE DECORATIVO
        ====================================== */}

        <motion.div
          variants={aparecer}
          className="
            mt-14 flex items-center
            justify-center gap-4
            sm:mt-20
          "
        >
          <span className="h-px w-16 bg-[#B79A70]/75" />

          <Heart
            size={13}
            fill="currentColor"
            className="text-[#B79A70]"
          />

          <span className="h-px w-16 bg-[#B79A70]/75" />
        </motion.div>

        <motion.p
          variants={aparecer}
          className="
            mt-6 font-cursiveDancing
            text-3xl text-[#52614D]
            sm:text-4xl
          "
        >
          ¡Gracias por acompañarnos!
        </motion.p>
      </motion.div>
    </section>
  );
}
