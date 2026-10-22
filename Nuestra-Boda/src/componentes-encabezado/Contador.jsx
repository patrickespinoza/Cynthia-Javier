
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ==========================================
// CONFIGURACIÓN EDITABLE - WEDLY
// ==========================================

const FECHA_BODA = "2027-01-30T00:00:00-06:00";

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
// CALCULAR TIEMPO RESTANTE
// ==========================================

const calcularTiempo = (fecha) => {
  const diferencia = Math.max(
    0,
    new Date(fecha).getTime() - Date.now()
  );

  return {
    dias: Math.floor(diferencia / 86400000),
    horas: Math.floor((diferencia / 3600000) % 24),
    minutos: Math.floor((diferencia / 60000) % 60),
    segundos: Math.floor((diferencia / 1000) % 60),
  };
};

// ==========================================
// COMPONENTE CONTADOR
// ==========================================

export default function Contador({
  fecha = FECHA_BODA,
}) {
  const [tiempo, setTiempo] = useState(() =>
    calcularTiempo(fecha)
  );

  useEffect(() => {
    const actualizar = () => {
      setTiempo(calcularTiempo(fecha));
    };

    actualizar();

    const intervalo = setInterval(actualizar, 1000);

    return () => clearInterval(intervalo);
  }, [fecha]);

  const unidades = [
    { nombre: "Días", valor: tiempo.dias },
    { nombre: "Horas", valor: tiempo.horas },
    { nombre: "Minutos", valor: tiempo.minutos },
    { nombre: "Segundos", valor: tiempo.segundos },
  ];

  return (
    <section
      id="contador"
      className="
        relative isolate flex
        min-h-[650px] w-full
        items-center justify-center
        overflow-hidden
        bg-[#F4EDE3]
        px-4 py-20
        sm:px-8 sm:py-28
        lg:min-h-[800px]
      "
      style={{
        backgroundImage:
          "radial-gradient(ellipse at center, #FFFDF9 0%, #F4EDE3 85%)",
      }}
    >
      {/* ======================================
          TEXTURA DE FONDO
      ====================================== */}

      <div
        className="
          pointer-events-none absolute
          inset-0 opacity-[0.13]
        "
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.12'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ======================================
          DECORACIÓN BOTÁNICA
      ====================================== */}

      <RamaBotanica
        className="
          pointer-events-none absolute
          -left-8 -bottom-12
          h-48 w-36
          text-[#52614D]/65
          sm:left-0 sm:bottom-0
          sm:h-64 sm:w-44
        "
      />

      <RamaBotanica
        className="
          pointer-events-none absolute
          -right-8 -bottom-12
          h-48 w-36
          -scale-x-100
          text-[#B79A70]/75
          sm:right-0 sm:bottom-0
          sm:h-64 sm:w-44
        "
      />

      <RamaBotanica
        className="
          pointer-events-none absolute
          -right-8 -top-14
          h-40 w-32
          rotate-180
          text-[#52614D]/45
          sm:right-8 sm:top-0
          sm:h-52 sm:w-40
        "
      />

      {/* ======================================
          CONTENIDO
      ====================================== */}

      <div
        className="
          relative z-10 mx-auto
          w-full max-w-5xl
          text-center
        "
      >
        {/* TEXTO SUPERIOR */}

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="
            font-playfair
            text-[11px] uppercase
            tracking-[0.3em]
            text-[#52614D]
            sm:text-sm
          "
        >
          Falta muy poco
          <br />
          para nuestro
        </motion.p>

        {/* TÍTULO */}

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            delay: 0.15,
          }}
          className="
            mt-5 font-playfair
            text-[clamp(3.1rem,9vw,6rem)]
            font-normal
            leading-[1.1]
            tracking-[0.015em]
            text-[#102B50]
          "
        >
          GRAN DÍA
        </motion.h2>

        {/* DETALLE BOTÁNICO CENTRAL */}

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.3,
          }}
          className="
            mx-auto mt-7
            flex items-center justify-center
            gap-3 text-[#B79A70]
          "
        >
          <span className="h-px w-12 bg-[#B79A70]/70" />

          <svg
            width="43"
            height="30"
            viewBox="0 0 43 30"
            fill="none"
            aria-hidden="true"
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
        </motion.div>

        {/* ======================================
            CONTADOR REGRESIVO
        ====================================== */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            delay: 0.25,
          }}
          className="
            mx-auto mt-12
            grid w-full max-w-[650px]
            grid-cols-4
            gap-2
            sm:mt-16 sm:gap-5
          "
        >
          {unidades.map((unidad, index) => (
            <motion.div
              key={unidad.nombre}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.3 + index * 0.1,
              }}
              className="
                flex min-w-0
                flex-col items-center
              "
            >
              {/* RECUADRO DEL NÚMERO */}

              <div
                className="
                  flex aspect-[0.83]
                  w-full max-w-[125px]
                  items-center justify-center
                  rounded-t-[45%]
                  rounded-b-md
                  border border-[#B79A70]/70
                  bg-[#FFFDF9]/30
                  shadow-[0_5px_15px_rgba(16,43,80,0.035)]
                "
              >
                <span
                  className="
                    font-playfair
                    text-[clamp(1.45rem,5vw,3.5rem)]
                    font-normal
                    tabular-nums
                    text-[#102B50]
                  "
                >
                  {String(unidad.valor).padStart(2, "0")}
                </span>
              </div>

              {/* ETIQUETA */}

              <span
                className="
                  mt-3 font-playfair
                  text-[clamp(0.6rem,2vw,0.95rem)]
                  tracking-[0.01em]
                  text-[#52614D]
                  sm:mt-4
                "
              >
                {unidad.nombre}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* ======================================
            DIVISOR INFERIOR
        ====================================== */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 0.5,
          }}
          className="
            mx-auto mt-14
            flex items-center justify-center
            gap-4
            sm:mt-20
          "
        >
          <span className="h-px w-16 bg-[#B79A70]/75" />
          <span className="text-sm text-[#102B50]">♥</span>
          <span className="h-px w-16 bg-[#B79A70]/75" />
        </motion.div>

      </div>
    </section>
  );
}
