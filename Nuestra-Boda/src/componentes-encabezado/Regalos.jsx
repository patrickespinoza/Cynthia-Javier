
"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Gift,
  Heart,
  Wallet,
  CreditCard,
  Copy,
  Check,
  X,
  Mail,
  ArrowRight,
} from "lucide-react";

// ==========================================
// DATOS BANCARIOS
// ==========================================

const DATOS_BANCARIOS = {
  banco: "BBVA",
  titular: "Cynthia Cristal Márquez Martinez",
  numero: "4152314001266108",
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

export default function Regalos() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [errorCopia, setErrorCopia] = useState(false);

  const botonAbrirRef = useRef(null);
  const botonCerrarRef = useRef(null);
  const temporizadorRef = useRef(null);

  // ==========================================
  // COPIAR NÚMERO BANCARIO
  // ==========================================

  const copiarCuenta = async () => {
    try {
      await navigator.clipboard.writeText(
        DATOS_BANCARIOS.numero
      );

      setCopiado(true);
      setErrorCopia(false);

      clearTimeout(temporizadorRef.current);

      temporizadorRef.current = setTimeout(() => {
        setCopiado(false);
      }, 2500);
    } catch (error) {
      console.error("No se pudo copiar el número:", error);
      setCopiado(false);
      setErrorCopia(true);
    }
  };

  // ==========================================
  // ABRIR / CERRAR MODAL
  // ==========================================

  const abrirModal = () => {
    setCopiado(false);
    setErrorCopia(false);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setCopiado(false);
    setErrorCopia(false);
  };

  // ==========================================
  // ACCESIBILIDAD DEL MODAL
  // ==========================================

  useEffect(() => {
    if (!mostrarModal) return;

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    botonCerrarRef.current?.focus();

    const manejarTeclado = (evento) => {
      if (evento.key === "Escape") {
        cerrarModal();
      }
    };

    window.addEventListener("keydown", manejarTeclado);

    return () => {
      document.body.style.overflow = overflowAnterior;
      window.removeEventListener("keydown", manejarTeclado);
      botonAbrirRef.current?.focus();
    };
  }, [mostrarModal]);

  useEffect(() => {
    return () => clearTimeout(temporizadorRef.current);
  }, []);

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <>
      <section
        id="regalos"
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
            text-[#B79A70]/55
            sm:left-0 sm:top-0
            sm:h-64 sm:w-48
          "
        />

        <RamaBotanica
          className="
            pointer-events-none absolute
            -right-10 -bottom-12
            h-48 w-36 -scale-x-100
            text-[#52614D]/50
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
            amount: 0.1,
          }}
          className="
            relative z-10
            mx-auto flex
            w-full max-w-[950px]
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
            Con mucho cariño
          </motion.p>

          {/* TÍTULO */}

          <motion.h2
            variants={aparecer}
            className="
              mt-5 font-playfair
              text-[clamp(2.8rem,7vw,5rem)]
              font-normal leading-[1.15]
              text-[#102B50]
            "
          >
            Mesa de Regalos
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

          {/* ÍCONO PRINCIPAL */}

          <motion.div
            variants={aparecer}
            className="
              mt-11 flex h-20 w-20
              items-center justify-center
              rounded-full
              border border-[#B79A70]/70
              text-[#102B50]
            "
          >
            <Gift size={35} strokeWidth={1.2} />
          </motion.div>

          {/* MENSAJE */}

          <motion.div
            variants={aparecer}
            className="
              mt-8 max-w-[620px]
            "
          >
            <p
              className="
                font-playfair
                text-xl leading-9
                text-[#102B50]
                sm:text-2xl sm:leading-10
              "
            >
              El mejor regalo será compartir
              este día tan especial contigo.
            </p>

            <p
              className="
                mt-5 text-sm leading-8
                text-[#52614D]
                sm:text-base
              "
            >
              Tu presencia es lo más importante
              para nosotros. Si deseas tener
              un detalle adicional, te compartimos
              estas opciones con mucho cariño.
            </p>
          </motion.div>

          {/* ======================================
              OPCIONES DE REGALO
          ====================================== */}

          <motion.div
            variants={aparecer}
            className="
              mt-12 grid w-full
              max-w-[820px]
              grid-cols-1 gap-6
              sm:mt-16
              md:grid-cols-2
            "
          >
            {/* ======================================
                TARJETA TRANSFERENCIA
            ====================================== */}

            <div
              className="
                group flex h-full
                flex-col items-center
                rounded-[24px]
                border border-[#B79A70]/45
                bg-[#FFFDF9]/80
                px-6 py-10
                shadow-[0_15px_40px_rgba(16,43,80,0.05)]
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_20px_45px_rgba(16,43,80,0.09)]
                sm:px-8
              "
            >
              <div
                className="
                  flex h-16 w-16
                  items-center justify-center
                  rounded-full
                  bg-[#102B50]/[0.06]
                  text-[#102B50]
                "
              >
                <CreditCard
                  size={29}
                  strokeWidth={1.3}
                />
              </div>

              <h3
                className="
                  mt-6 font-playfair
                  text-2xl text-[#102B50]
                  sm:text-[27px]
                "
              >
                Transferencia bancaria
              </h3>

              <div
                className="
                  mt-5 h-px w-12
                  bg-[#B79A70]
                "
              />

              <p
                className="
                  mt-5 flex-1
                  text-sm leading-7
                  text-[#52614D]
                "
              >
                Si prefieres hacernos llegar
                tu regalo de manera digital,
                puedes consultar nuestros
                datos bancarios.
              </p>

              <button
                ref={botonAbrirRef}
                type="button"
                onClick={abrirModal}
                className="
                  mt-8 inline-flex
                  min-h-12 items-center
                  justify-center gap-3
                  rounded-full
                  bg-[#102B50]
                  px-7 py-3
                  text-sm font-medium
                  text-[#FFFDF9]
                  transition-all duration-300
                  hover:scale-[1.03]
                  hover:bg-[#1B3E68]
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-[#102B50]
                "
              >
                Ver datos bancarios

                <ArrowRight
                  size={17}
                  strokeWidth={1.5}
                />
              </button>
            </div>

            {/* ======================================
                TARJETA LLUVIA DE SOBRES
            ====================================== */}

            <div
              className="
                group flex h-full
                flex-col items-center
                rounded-[24px]
                border border-[#B79A70]/45
                bg-[#FFFDF9]/80
                px-6 py-10
                shadow-[0_15px_40px_rgba(16,43,80,0.05)]
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_20px_45px_rgba(16,43,80,0.09)]
                sm:px-8
              "
            >
              <div
                className="
                  flex h-16 w-16
                  items-center justify-center
                  rounded-full
                  bg-[#52614D]/[0.08]
                  text-[#52614D]
                "
              >
                <Mail
                  size={29}
                  strokeWidth={1.3}
                />
              </div>

              <h3
                className="
                  mt-6 font-playfair
                  text-2xl text-[#102B50]
                  sm:text-[27px]
                "
              >
                Lluvia de Sobres
              </h3>

              <div
                className="
                  mt-5 h-px w-12
                  bg-[#B79A70]
                "
              />

              <p
                className="
                  mt-5 flex-1
                  text-sm leading-7
                  text-[#52614D]
                "
              >
                Si deseas obsequiarnos un
                detalle en efectivo, el día
                de nuestra celebración
                tendremos un espacio especial
                para recibir tus sobres.
              </p>

              <div
                className="
                  mt-8 inline-flex
                  min-h-12 items-center
                  justify-center gap-2
                  rounded-full
                  border border-[#B79A70]/60
                  px-6 py-3
                  text-sm text-[#52614D]
                "
              >
                <Heart
                  size={15}
                  strokeWidth={1.5}
                />

                Con mucho cariño
              </div>
            </div>
          </motion.div>

          {/* ======================================
              CIERRE
          ====================================== */}

          <motion.div
            variants={aparecer}
            className="
              mt-14 flex
              flex-col items-center
              sm:mt-20
            "
          >
            <div
              className="
                flex items-center
                justify-center gap-4
              "
            >
              <span className="h-px w-14 bg-[#B79A70]/80" />

              <Heart
                size={13}
                fill="currentColor"
                className="text-[#B79A70]"
              />

              <span className="h-px w-14 bg-[#B79A70]/80" />
            </div>

            <p
              className="
                mt-6 font-cursiveDancing
                text-3xl text-[#52614D]
                sm:text-4xl
              "
            >
              Gracias por ser parte de nuestra historia
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ======================================
          MODAL DE DATOS BANCARIOS
      ====================================== */}

      <AnimatePresence>
        {mostrarModal && (
          <motion.div
            key="modal-regalos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={cerrarModal}
            className="
              fixed inset-0 z-[9999]
              flex items-center
              justify-center
              overflow-y-auto
              bg-[#07182D]/80
              px-4 py-6
              backdrop-blur-md
              sm:px-6
            "
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="titulo-datos-bancarios"
              initial={{
                opacity: 0,
                y: 35,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 25,
                scale: 0.95,
              }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
              onClick={(evento) =>
                evento.stopPropagation()
              }
              className="
                relative my-auto
                w-full max-w-[440px]
                overflow-hidden
                rounded-[28px]
                border border-[#D9C19B]/45
                bg-[#102B50]
                px-6 py-10
                text-center
                text-[#F4EDE3]
                shadow-[0_30px_90px_rgba(0,0,0,0.35)]
                sm:px-10 sm:py-12
              "
            >
              {/* DECORACIÓN SUPERIOR */}

              <div
                className="
                  pointer-events-none
                  absolute -right-12 -top-20
                  h-52 w-52
                  rounded-full
                  border border-[#D9C19B]/15
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute -right-5 -top-12
                  h-36 w-36
                  rounded-full
                  border border-[#D9C19B]/15
                "
              />

              {/* CERRAR */}

              <button
                ref={botonCerrarRef}
                type="button"
                onClick={cerrarModal}
                aria-label="Cerrar datos bancarios"
                className="
                  absolute right-5 top-5
                  z-20 flex
                  h-9 w-9
                  items-center justify-center
                  rounded-full
                  border border-[#D9C19B]/35
                  text-[#F4EDE3]
                  transition-colors
                  hover:bg-white/10
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-[#D9C19B]
                "
              >
                <X size={18} />
              </button>

              {/* ÍCONO */}

              <div
                className="
                  relative mx-auto
                  flex h-16 w-16
                  items-center justify-center
                  rounded-full
                  border border-[#D9C19B]/55
                  text-[#D9C19B]
                "
              >
                <Wallet
                  size={29}
                  strokeWidth={1.2}
                />
              </div>

              <p
                className="
                  mt-7 text-[10px]
                  uppercase tracking-[0.3em]
                  text-[#D9C19B]
                "
              >
                Mesa de regalos
              </p>

              <h3
                id="titulo-datos-bancarios"
                className="
                  mt-3 font-playfair
                  text-3xl
                  text-[#FFFDF9]
                  sm:text-4xl
                "
              >
                Datos Bancarios
              </h3>

              <div
                className="
                  mx-auto mt-6
                  h-px w-16
                  bg-[#D9C19B]/65
                "
              />

              {/* BANCO */}

              <div className="mt-8">
                <p
                  className="
                    text-[10px]
                    uppercase tracking-[0.25em]
                    text-[#D9C19B]/85
                  "
                >
                  Banco
                </p>

                <p
                  className="
                    mt-2 font-playfair
                    text-3xl text-[#FFFDF9]
                  "
                >
                  {DATOS_BANCARIOS.banco}
                </p>
              </div>

              {/* NÚMERO */}

              <div className="mt-7">
                <p
                  className="
                    text-[10px]
                    uppercase tracking-[0.25em]
                    text-[#D9C19B]/85
                  "
                >
                  Número de tarjeta
                </p>

                <p
                  className="
                    mt-3 break-all
                    font-medium
                    tracking-[0.1em]
                    text-[#FFFDF9]
                    text-[clamp(1rem,4.5vw,1.25rem)]
                    [font-variant-numeric:tabular-nums]
                  "
                >
                  {DATOS_BANCARIOS.numero.replace(
                    /(\d{4})(?=\d)/g,
                    "$1 "
                  )}
                </p>
              </div>

              {/* TITULAR */}

              <div className="mt-7">
                <p
                  className="
                    text-[10px]
                    uppercase tracking-[0.25em]
                    text-[#D9C19B]/85
                  "
                >
                  Titular
                </p>

                <p
                  className="
                    mt-3 font-playfair
                    text-lg leading-7
                    text-[#FFFDF9]
                    sm:text-xl
                  "
                >
                  {DATOS_BANCARIOS.titular}
                </p>
              </div>

              {/* BOTÓN COPIAR */}

              <button
                type="button"
                onClick={copiarCuenta}
                className="
                  mt-9 flex w-full
                  min-h-12 items-center
                  justify-center gap-3
                  rounded-full
                  bg-[#D9C19B]
                  px-6 py-3
                  text-sm font-semibold
                  text-[#102B50]
                  transition-all duration-300
                  hover:scale-[1.02]
                  hover:bg-[#F4EDE3]
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-[#D9C19B]
                "
              >
                {copiado ? (
                  <>
                    <Check size={18} />
                    Número copiado
                  </>
                ) : (
                  <>
                    <Copy size={17} />
                    Copiar número
                  </>
                )}
              </button>

              {errorCopia && (
                <p
                  role="alert"
                  className="
                    mt-4 text-xs
                    text-[#F4EDE3]
                  "
                >
                  No fue posible copiarlo automáticamente.
                  Puedes seleccionar el número y copiarlo.
                </p>
              )}

              {/* MENSAJE FINAL */}

              <p
                className="
                  mt-7 text-xs
                  leading-6
                  text-[#F4EDE3]/70
                "
              >
                Gracias por acompañarnos
                y por tu cariño.
              </p>

              <Heart
                size={13}
                fill="currentColor"
                className="
                  mx-auto mt-4
                  text-[#D9C19B]
                "
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
