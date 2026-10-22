
"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { AnimatePresence, motion } from "framer-motion";

import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Camera,
} from "lucide-react";

// ==========================================
// CONFIGURACIÓN - WEDLY
// ==========================================

// Puedes modificar el position de cada fotografía.
//
// "center center" = imagen centrada
// "center top"    = mostrar parte superior
// "center bottom" = mostrar parte inferior
// "center 30%"    = mover el encuadre vertical
// "60% center"    = mover el encuadre horizontal
//
// positionMobile permite un encuadre diferente
// cuando se visualiza desde celular.

const FOTOGRAFIAS = [
  {
    src: "/Carrusel01.JPG",
    alt: "Cynthia y Javier - Fotografía 1",
    position: "center 30%",
    positionMobile: "center 80%",
  },
  {
    src: "/Carrusel02.JPG",
    alt: "Cynthia y Javier - Fotografía 2",
    position: "center center",
    positionMobile: "center 80%",
  },
  {
    src: "/Carrusel03.JPG",
    alt: "Cynthia y Javier - Fotografía 3",
    position: "center center",
    positionMobile: "center 70%",
  },
  {
    src: "/Carrusel04.JPG",
    alt: "Cynthia y Javier - Fotografía 4",
    position: "center center",
    positionMobile: "center 80%",
  },
  {
    src: "/Carrusel05.JPG",
    alt: "Cynthia y Javier - Fotografía 5",
    position: "center center",
    positionMobile: "center 80%",
  },
];

const INTERVALO_AUTOMATICO = 5000;

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
// ANIMACIONES
// ==========================================

const variantesFoto = {
  entrar: (direccion) => ({
    opacity: 0,
    x: direccion > 0 ? "10%" : "-10%",
    scale: 1.025,
  }),

  centro: {
    opacity: 1,
    x: "0%",
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  salir: {
    opacity: 0,
    x: "0%",
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function Carrusel() {
  const [[indice, direccion], setPagina] = useState([0, 1]);

  const [imagenesCargadas, setImagenesCargadas] =
    useState({});

  const [primeraImagenLista, setPrimeraImagenLista] =
    useState(false);

  const [pausado, setPausado] = useState(false);

  const indiceRef = useRef(0);
  const imagenesCargadasRef = useRef({});
  const navegacionPendienteRef = useRef(null);

  // ==========================================
  // PRECARGA DE LAS CINCO FOTOGRAFÍAS
  // ==========================================

  useEffect(() => {
    let activo = true;

    const imagenes = FOTOGRAFIAS.map((foto, index) => {
      const imagen = new Image();

      let procesando = false;

      const marcarComoCargada = async () => {
        if (procesando) return;
        procesando = true;

        try {
          if (typeof imagen.decode === "function") {
            await imagen.decode();
          }
        } catch {
          // Si ya cargó, podemos utilizarla.
        }

        if (!activo || imagen.naturalWidth === 0) {
          return;
        }

        imagenesCargadasRef.current[index] = true;

        setImagenesCargadas((anteriores) => ({
          ...anteriores,
          [index]: true,
        }));

        if (index === 0) {
          setPrimeraImagenLista(true);
        }

        const pendiente = navegacionPendienteRef.current;

        if (pendiente?.indice === index) {
          navegacionPendienteRef.current = null;

          indiceRef.current = index;

          setPagina([index, pendiente.direccion]);
        }
      };

      imagen.onload = marcarComoCargada;

      imagen.onerror = () => {
        console.error(
          `No se pudo cargar la fotografía: ${foto.src}`
        );
      };

      imagen.src = foto.src;

      if (imagen.complete && imagen.naturalWidth > 0) {
        marcarComoCargada();
      }

      return imagen;
    });

    return () => {
      activo = false;

      imagenes.forEach((imagen) => {
        imagen.onload = null;
        imagen.onerror = null;
      });
    };
  }, []);

  // ==========================================
  // NAVEGACIÓN
  // ==========================================

  const navegarA = useCallback(
    (nuevoIndice, nuevaDireccion) => {
      const total = FOTOGRAFIAS.length;

      const siguiente =
        ((nuevoIndice % total) + total) % total;

      if (siguiente === indiceRef.current) return;

      if (!imagenesCargadasRef.current[siguiente]) {
        navegacionPendienteRef.current = {
          indice: siguiente,
          direccion: nuevaDireccion,
        };

        return;
      }

      navegacionPendienteRef.current = null;
      indiceRef.current = siguiente;

      setPagina([siguiente, nuevaDireccion]);
    },
    []
  );

  const cambiarFoto = useCallback(
    (movimiento) => {
      navegarA(
        indiceRef.current + movimiento,
        movimiento
      );
    },
    [navegarA]
  );

  const irAFoto = useCallback(
    (nuevoIndice) => {
      if (nuevoIndice === indiceRef.current) return;

      navegarA(
        nuevoIndice,
        nuevoIndice > indiceRef.current ? 1 : -1
      );
    },
    [navegarA]
  );

  // ==========================================
  // CAMBIO AUTOMÁTICO
  // ==========================================

  useEffect(() => {
    if (pausado || !primeraImagenLista) return;

    const intervalo = setInterval(() => {
      const siguiente =
        (indiceRef.current + 1) % FOTOGRAFIAS.length;

      if (imagenesCargadasRef.current[siguiente]) {
        navegarA(siguiente, 1);
      }
    }, INTERVALO_AUTOMATICO);

    return () => clearInterval(intervalo);
  }, [pausado, primeraImagenLista, navegarA]);

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <section
      id="carrusel"
      className="
        relative isolate w-full overflow-hidden
        bg-[#52614D]
        px-4 py-20
        sm:px-8 sm:py-28
        lg:py-32
      "
      style={{
        backgroundImage:
          "radial-gradient(ellipse at center, #607158 0%, #52614D 65%, #44523F 100%)",
      }}
    >
      {/* TEXTURA */}

      <div
        className="
          pointer-events-none absolute
          inset-0 opacity-[0.12]
        "
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.12'/%3E%3C/svg%3E\")",
        }}
      />

      {/* RAMAS BOTÁNICAS */}

      <RamaBotanica
        className="
          pointer-events-none absolute
          -left-10 -top-12
          h-48 w-36 rotate-180
          text-[#D9C19B]/45
          sm:left-0 sm:top-0
          sm:h-64 sm:w-48
        "
      />

      <RamaBotanica
        className="
          pointer-events-none absolute
          -right-10 -bottom-12
          h-48 w-36 -scale-x-100
          text-[#D9C19B]/45
          sm:right-0 sm:bottom-0
          sm:h-64 sm:w-48
        "
      />

      <div
        className="
          relative z-10 mx-auto
          w-full max-w-6xl text-center
        "
      >
        {/* ======================================
            ENCABEZADO
        ====================================== */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85 }}
        >
          <p
            className="
              text-[11px] uppercase
              tracking-[0.35em]
              text-[#D9C19B]
              sm:text-sm
            "
          >
            Nuestros momentos
          </p>

          <h2
            className="
              mt-4 font-playfair
              text-[clamp(2.6rem,7vw,5rem)]
              font-normal leading-[1.15]
              text-[#F4EDE3]
            "
          >
            Nuestra Historia
          </h2>

          <div
            className="
              mx-auto mt-7 flex
              items-center justify-center gap-4
            "
          >
            <span className="h-px w-14 bg-[#D9C19B]/80" />

            <Heart
              size={13}
              fill="currentColor"
              className="text-[#D9C19B]"
            />

            <span className="h-px w-14 bg-[#D9C19B]/80" />
          </div>

          <p
            className="
              mx-auto mt-7 max-w-[460px]
              text-sm leading-7
              text-[#F4EDE3]/85
              sm:text-base
            "
          >
            Cada fotografía guarda un recuerdo,
            cada recuerdo una parte de nuestra
            historia de amor.
          </p>
        </motion.div>

        {/* ======================================
            CARRUSEL
        ====================================== */}

        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            delay: 0.2,
          }}
          className="
            relative mx-auto mt-12
            w-full max-w-[850px]
            sm:mt-16
          "
          onMouseEnter={() => setPausado(true)}
          onMouseLeave={() => setPausado(false)}
          onFocusCapture={() => setPausado(true)}
          onBlurCapture={(evento) => {
            if (
              !evento.currentTarget.contains(
                evento.relatedTarget
              )
            ) {
              setPausado(false);
            }
          }}
        >
          {/* MARCO DORADO */}

          <div
            className="
              relative rounded-[22px]
              border border-[#D9C19B]/55
              p-2.5
              sm:rounded-[30px]
              sm:p-4
            "
          >
            {/* CONTENEDOR DE FOTOGRAFÍAS */}

            <div
              className="
                relative aspect-[4/5]
                w-full overflow-hidden
                rounded-[15px]
                bg-[#34432F]
                sm:aspect-[3/4]
                sm:rounded-[22px]
                lg:aspect-[3/4]
              "
            >
              {/* ======================================
                  FOTO BASE PERMANENTE
              ====================================== */}

              {primeraImagenLista && (
                <img
                  src={FOTOGRAFIAS[0].src}
                  alt=""
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute inset-0
                    h-full w-full
                    select-none object-cover
                  "
                  style={{
                    objectPosition:
                      FOTOGRAFIAS[0].position,
                  }}
                />
              )}

              {/* ======================================
                  FOTOGRAFÍA ACTIVA
              ====================================== */}

              {primeraImagenLista && (
                <AnimatePresence
                  initial={false}
                  custom={direccion}
                  mode="sync"
                >
                  <motion.div
                    key={indice}
                    custom={direccion}
                    variants={variantesFoto}
                    initial="entrar"
                    animate="centro"
                    exit="salir"
                    drag="x"
                    dragConstraints={{
                      left: 0,
                      right: 0,
                    }}
                    dragElastic={0.12}
                    onDragEnd={(_, info) => {
                      if (
                        info.offset.x < -60 ||
                        info.velocity.x < -500
                      ) {
                        cambiarFoto(1);
                      } else if (
                        info.offset.x > 60 ||
                        info.velocity.x > 500
                      ) {
                        cambiarFoto(-1);
                      }
                    }}
                    className="
                      absolute inset-0
                      h-full w-full
                      cursor-grab
                      active:cursor-grabbing
                    "
                    style={{
                      touchAction: "pan-y",
                      zIndex: 2,
                    }}
                  >
                    {/* IMAGEN CON POSITION RESPONSIVE */}

                    <picture
                      className="
                        block h-full w-full
                        pointer-events-none
                      "
                    >
                      <source
                        media="(max-width: 639px)"
                        srcSet={
                          FOTOGRAFIAS[indice].src
                        }
                      />

                      <img
                        src={FOTOGRAFIAS[indice].src}
                        alt={FOTOGRAFIAS[indice].alt}
                        draggable={false}
                        className="
                          h-full w-full
                          select-none object-cover
                        "
                        style={{
                          objectPosition:
                            FOTOGRAFIAS[indice]
                              .positionMobile,
                        }}
                      />
                    </picture>

                    {/* POSITION PARA PANTALLAS GRANDES */}

                    <style>
                      {`
                        @media (min-width: 640px) {
                          #foto-carrusel-${indice} {
                            object-position: ${FOTOGRAFIAS[indice].position};
                          }
                        }
                      `}
                    </style>
                  </motion.div>
                </AnimatePresence>
              )}

              {/* CARGA INICIAL */}

              {!primeraImagenLista && (
                <div
                  className="
                    absolute inset-0
                    flex flex-col
                    items-center justify-center
                    gap-4 bg-[#34432F]
                    text-[#F4EDE3]
                  "
                  role="status"
                >
                  <Heart
                    size={28}
                    strokeWidth={1.3}
                    className="
                      animate-pulse
                      text-[#D9C19B]
                    "
                  />

                  <p
                    className="
                      text-xs uppercase
                      tracking-[0.2em]
                    "
                  >
                    Cargando recuerdos...
                  </p>
                </div>
              )}

              {/* CONTADOR */}

              <div
                className="
                  pointer-events-none
                  absolute bottom-4 right-4
                  z-20 rounded-full
                  border border-white/25
                  bg-[#102B50]/55
                  px-4 py-2
                  text-xs tracking-[0.15em]
                  text-white backdrop-blur-md
                  sm:bottom-6 sm:right-6
                "
              >
                {String(indice + 1).padStart(2, "0")}
                {" / "}
                {String(FOTOGRAFIAS.length).padStart(2, "0")}
              </div>
            </div>

            {/* ======================================
                FLECHAS
            ====================================== */}

            <button
              type="button"
              onClick={() => cambiarFoto(-1)}
              disabled={!primeraImagenLista}
              aria-label="Fotografía anterior"
              className="
                absolute left-0 top-1/2
                z-30 flex h-11 w-11
                -translate-x-1/4
                -translate-y-1/2
                items-center justify-center
                rounded-full
                border border-[#D9C19B]/60
                bg-[#F4EDE3]
                text-[#102B50]
                shadow-lg transition
                hover:scale-110
                hover:bg-[#D9C19B]
                disabled:opacity-50
                sm:h-14 sm:w-14
                sm:-translate-x-1/2
              "
            >
              <ChevronLeft size={23} strokeWidth={1.5} />
            </button>

            <button
              type="button"
              onClick={() => cambiarFoto(1)}
              disabled={!primeraImagenLista}
              aria-label="Fotografía siguiente"
              className="
                absolute right-0 top-1/2
                z-30 flex h-11 w-11
                translate-x-1/4
                -translate-y-1/2
                items-center justify-center
                rounded-full
                border border-[#D9C19B]/60
                bg-[#F4EDE3]
                text-[#102B50]
                shadow-lg transition
                hover:scale-110
                hover:bg-[#D9C19B]
                disabled:opacity-50
                sm:h-14 sm:w-14
                sm:translate-x-1/2
              "
            >
              <ChevronRight size={23} strokeWidth={1.5} />
            </button>
          </div>

          {/* ======================================
              INDICADORES
          ====================================== */}

          <div
            className="
              mt-7 flex items-center
              justify-center gap-3
              sm:mt-9
            "
          >
            {FOTOGRAFIAS.map((foto, posicion) => (
              <button
                key={foto.src}
                type="button"
                onClick={() => irAFoto(posicion)}
                disabled={!primeraImagenLista}
                aria-label={`Ver fotografía ${posicion + 1}`}
                aria-current={
                  indice === posicion
                    ? "true"
                    : undefined
                }
                className={`
                  h-2.5 rounded-full
                  transition-all duration-500
                  ${
                    indice === posicion
                      ? "w-9 bg-[#D9C19B]"
                      : "w-2.5 bg-[#F4EDE3]/40 hover:bg-[#F4EDE3]/80"
                  }
                `}
              />
            ))}
          </div>

          <p
            className="
              mt-5 text-[10px]
              uppercase tracking-[0.18em]
              text-[#F4EDE3]/60
              sm:hidden
            "
          >
            Desliza para ver más fotografías
          </p>
        </motion.div>

        {/* ======================================
            CIERRE
        ====================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.25,
          }}
          className="
            mt-12 flex flex-col
            items-center sm:mt-16
          "
        >
          <Camera
            size={25}
            strokeWidth={1.2}
            className="text-[#D9C19B]"
          />

          <p
            className="
              mt-5 font-cursiveDancing
              text-3xl text-[#F4EDE3]
              sm:text-4xl
            "
          >
            Y lo mejor está por venir...
          </p>

          <div
            className="
              mt-7 flex items-center
              justify-center gap-4
            "
          >
            <span className="h-px w-14 bg-[#D9C19B]/70" />

            <Heart
              size={12}
              fill="currentColor"
              className="text-[#D9C19B]"
            />

            <span className="h-px w-14 bg-[#D9C19B]/70" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
