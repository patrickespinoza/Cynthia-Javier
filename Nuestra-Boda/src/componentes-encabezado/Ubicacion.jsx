
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Church,
  MapPin,
  Clock3,
  CalendarDays,
  PartyPopper,
  ArrowUpRight,
  Heart,
} from "lucide-react";

// ==========================================
// INFORMACIÓN EDITABLE - WEDLY
// ==========================================

const FECHA_BODA = "Sábado 30 de enero de 2027";

const UBICACIONES = [
  {
    id: "ceremonia",
    tipo: "Ceremonia religiosa",
    lugar: "Capilla Santa Teresita del Niño Jesús",
    hora: "5:00 p. m.",
    descripcion:
      "Acompáñanos a recibir la bendición de nuestro amor.",
    url: "https://maps.app.goo.gl/4n2YhUsgbSyy8wGB7",
    Icono: Church,
  },
  {
    id: "recepcion",
    tipo: "Recepción",
    lugar: "Palacio de las Rosas",
    hora: "8:00 p. m.",
    descripcion:
      "Celebremos juntos el comienzo de nuestra historia.",
    url: "https://maps.app.goo.gl/hLRZ9YxmZz9e3EY78",
    Icono: PartyPopper,
  },
];

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
// TARJETA DE UBICACIÓN
// ==========================================

function TarjetaUbicacion({ evento, index }) {
  const Icono = evento.Icono;

  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.75,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      className="
        group relative flex h-full
        flex-col items-center
        overflow-hidden rounded-[22px]
        border border-[#B79A70]/40
        bg-white/[0.035]
        px-5 py-9 text-center
        backdrop-blur-sm
        sm:px-8 sm:py-12
        lg:px-10
      "
    >
      {/* Decoración superior */}
      <div className="mb-7 flex items-center gap-3">
        <span className="h-px w-9 bg-[#B79A70]/65" />

        <Heart
          size={11}
          fill="currentColor"
          className="text-[#B79A70]"
        />

        <span className="h-px w-9 bg-[#B79A70]/65" />
      </div>

      {/* Icono */}
      <div
        className="
          mb-7 flex h-[74px] w-[74px]
          items-center justify-center
          rounded-full
          border border-[#B79A70]/65
          bg-[#F4EDE3]/10
          text-[#D9C19B]
        "
      >
        <Icono size={32} strokeWidth={1.25} />
      </div>

      {/* Tipo de evento */}
      <p
        className="
          mb-4 text-[11px]
          font-medium uppercase
          tracking-[0.27em]
          text-[#D9C19B]
          sm:text-xs
        "
      >
        {evento.tipo}
      </p>

      {/* Lugar */}
      <h3
        className="
          max-w-[350px]
          font-playfair
          text-[clamp(1.65rem,3vw,2.25rem)]
          font-normal leading-[1.3]
          text-[#F4EDE3]
        "
      >
        {evento.lugar}
      </h3>

      {/* Hora */}
      <div
        className="
          mt-7 flex items-center
          justify-center gap-2
          text-[#F4EDE3]
        "
      >
        <Clock3
          size={18}
          strokeWidth={1.5}
          className="text-[#D9C19B]"
        />

        <span className="font-playfair text-xl sm:text-2xl">
          {evento.hora}
        </span>
      </div>

      {/* Descripción */}
      <p
        className="
          mt-6 max-w-[280px]
          text-sm leading-7
          text-[#F4EDE3]/75
        "
      >
        {evento.descripcion}
      </p>

      {/* Botón de ubicación */}
      <div className="mt-auto w-full pt-9">
        <a
          href={evento.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ver ubicación de ${evento.lugar}`}
          className="
            mx-auto flex min-h-[48px]
            w-full max-w-[260px]
            items-center justify-center
            gap-3 rounded-full
            border border-[#B79A70]
            bg-[#B79A70]
            px-5 py-3
            text-[11px] font-semibold
            uppercase tracking-[0.13em]
            text-[#102B50]
            transition-all duration-300
            hover:-translate-y-1
            hover:bg-[#D9C19B]
            hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)]
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-4
            focus-visible:outline-[#D9C19B]
          "
        >
          <MapPin size={17} strokeWidth={1.7} />
          Ver ubicación
          <ArrowUpRight size={16} />
        </a>
      </div>
    </motion.article>
  );
}

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function Celebracion() {
  return (
    <section
      id="celebracion"
      className="
        relative isolate w-full
        overflow-hidden
        bg-[#102B50]
        px-4 py-20
        sm:px-8 sm:py-28
        lg:py-32
      "
    >
      {/* Fondo azul con profundidad */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, #193A62 0%, #102B50 55%, #0A203B 100%)",
        }}
      />

      {/* Textura */}
      <div
        className="
          pointer-events-none
          absolute inset-0 opacity-[0.13]
        "
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter id='x'/%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.12'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Ramas decorativas */}
      <RamaBotanica
        className="
          pointer-events-none absolute
          -left-10 -bottom-14
          h-52 w-40
          text-[#B79A70]/60
          sm:left-0 sm:bottom-0
          sm:h-72 sm:w-52
        "
      />

      <RamaBotanica
        className="
          pointer-events-none absolute
          -right-10 -top-12
          h-48 w-36 rotate-180
          text-[#D9C19B]/55
          sm:right-0 sm:top-0
          sm:h-64 sm:w-48
        "
      />

      <RamaBotanica
        className="
          pointer-events-none absolute
          -right-12 -bottom-16
          h-44 w-32 -scale-x-100
          text-[#B79A70]/35
          sm:h-60 sm:w-44
        "
      />

      {/* Contenido */}
      <div
        className="
          relative z-10
          mx-auto w-full max-w-6xl
        "
      >
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85 }}
          className="text-center"
        >
          <p
            className="
              text-[11px] uppercase
              tracking-[0.35em]
              text-[#D9C19B]
              sm:text-sm
            "
          >
            Te invitamos a nuestra
          </p>

          <h2
            className="
              mt-4 font-playfair
              text-[clamp(2.6rem,7vw,5.2rem)]
              font-normal leading-[1.15]
              text-[#F4EDE3]
            "
          >
            Celebración
          </h2>

          <div
            className="
              mx-auto mt-7 flex
              items-center justify-center gap-4
            "
          >
            <span className="h-px w-14 bg-[#B79A70]" />
            <Heart
              size={13}
              fill="currentColor"
              className="text-[#D9C19B]"
            />
            <span className="h-px w-14 bg-[#B79A70]" />
          </div>

          <p
            className="
              mx-auto mt-7
              max-w-[470px]
              text-sm leading-7
              text-[#F4EDE3]/85
              sm:text-base sm:leading-8
            "
          >
            Nos encantaría compartir contigo
            este momento tan especial en el
            que comenzaremos nuestra nueva historia.
          </p>

          {/* Fecha */}
          <div
            className="
              mt-8 inline-flex
              items-center justify-center
              gap-3 text-[#F4EDE3]
            "
          >
            <CalendarDays
              size={19}
              strokeWidth={1.5}
              className="text-[#D9C19B]"
            />

            <p
              className="
                font-playfair
                text-base tracking-[0.04em]
                sm:text-xl
              "
            >
              {FECHA_BODA}
            </p>
          </div>
        </motion.div>

        {/* ======================================
            CEREMONIA Y RECEPCIÓN
        ====================================== */}

        <div
          className="
            mx-auto mt-12 grid
            max-w-[960px]
            grid-cols-1
            items-stretch gap-5
            sm:mt-16
            md:grid-cols-2
            md:gap-7
          "
        >
          {UBICACIONES.map((evento, index) => (
            <TarjetaUbicacion
              key={evento.id}
              evento={evento}
              index={index}
            />
          ))}
        </div>

        {/* Mensaje final */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 0.3,
          }}
          className="
            mt-14 text-center
            font-cursiveDancing
            text-3xl
            text-[#D9C19B]
            sm:mt-20 sm:text-4xl
          "
        >
          ¡Te esperamos con mucho cariño!
        </motion.p>
      </div>
    </section>
  );
}
