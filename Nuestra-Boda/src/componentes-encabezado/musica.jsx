
"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  LoaderCircle,
  ChevronDown,
} from "lucide-react";

// ==========================================
// CONFIGURACIÓN EDITABLE - WEDLY
// ==========================================

const MUSICA_URL = "/musica.mp3";
const IMAGEN_MUSICA = "/portada.JPG";
const VOLUMEN_INICIAL = 0.45;

// ==========================================
// DECORACIÓN BOTÁNICA
// ==========================================

const RamaBotanica = ({ className = "" }) => (
  <svg
    viewBox="0 0 130 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M17 192C31 157 46 125 66 93C83 64 94 37 105 7"
      stroke="currentColor"
      strokeWidth="1.15"
      strokeLinecap="round"
    />

    {[
      [34, 156, -38],
      [46, 131, 40],
      [59, 107, -36],
      [74, 81, 35],
      [86, 57, -36],
      [98, 32, 30],
    ].map(([x, y, angle], index) => (
      <g
        key={index}
        transform={`translate(${x} ${y}) rotate(${angle})`}
      >
        <path
          d="M0 0C-14 -10 -13 -27 0 -35C12 -25 13 -10 0 0Z"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M0 0V-29"
          stroke="currentColor"
          strokeWidth=".65"
        />
      </g>
    ))}
  </svg>
);

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function Musica() {
  const audioRef = useRef(null);
  const iniciandoRef = useRef(false);

  const [mostrarBienvenida, setMostrarBienvenida] =
    useState(true);

  const [reproduciendo, setReproduciendo] = useState(false);
  const [silenciado, setSilenciado] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [errorAudio, setErrorAudio] = useState(false);
  const [progreso, setProgreso] = useState(0);

  // ==========================================
  // CONFIGURACIÓN DEL AUDIO
  // ==========================================

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = VOLUMEN_INICIAL;

    const alReproducir = () => {
      setReproduciendo(true);
      setCargando(false);
      setErrorAudio(false);
    };

    const alPausar = () => {
      setReproduciendo(false);
      setCargando(false);
    };

    const alCargar = () => {
      setCargando(false);
    };

    const alError = () => {
      setErrorAudio(true);
      setCargando(false);
      setReproduciendo(false);
    };

    const actualizarProgreso = () => {
      if (
        Number.isFinite(audio.duration) &&
        audio.duration > 0
      ) {
        setProgreso(
          (audio.currentTime / audio.duration) * 100
        );
      }
    };

    audio.addEventListener("playing", alReproducir);
    audio.addEventListener("pause", alPausar);
    audio.addEventListener("canplay", alCargar);
    audio.addEventListener("error", alError);
    audio.addEventListener(
      "timeupdate",
      actualizarProgreso
    );

    return () => {
      audio.removeEventListener("playing", alReproducir);
      audio.removeEventListener("pause", alPausar);
      audio.removeEventListener("canplay", alCargar);
      audio.removeEventListener("error", alError);
      audio.removeEventListener(
        "timeupdate",
        actualizarProgreso
      );
    };
  }, []);

  // ==========================================
  // BLOQUEAR SCROLL DURANTE BIENVENIDA
  // ==========================================

  useEffect(() => {
    if (!mostrarBienvenida) return;

    const overflowAnterior =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        overflowAnterior;
    };
  }, [mostrarBienvenida]);

  // ==========================================
  // REPRODUCIR MÚSICA
  // ==========================================

  const reproducir = async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
      setCargando(true);
      setErrorAudio(false);

      audio.muted = false;
      setSilenciado(false);

      await audio.play();

      setReproduciendo(true);
      setCargando(false);

      return true;
    } catch (error) {
      console.error(
        "No se pudo reproducir la música:",
        error
      );

      setCargando(false);
      setErrorAudio(true);

      return false;
    }
  };

  // ==========================================
  // ENTRAR A LA INVITACIÓN CON MÚSICA
  // ==========================================

  const entrarConMusica = async () => {
    if (iniciandoRef.current) return;

    iniciandoRef.current = true;

    const correcto = await reproducir();

    if (correcto) {
      setMostrarBienvenida(false);
    }

    iniciandoRef.current = false;
  };

  // ==========================================
  // CONTINUAR SIN MÚSICA
  // ==========================================

  const continuarSinMusica = () => {
    const audio = audioRef.current;

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    setProgreso(0);
    setReproduciendo(false);
    setMostrarBienvenida(false);
  };

  // ==========================================
  // ALTERNAR REPRODUCCIÓN
  // ==========================================

  const alternarReproduccion = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Si estamos en la bienvenida,
    // Play inicia música y abre la invitación.
    if (mostrarBienvenida) {
      await entrarConMusica();
      return;
    }

    // Dentro de la invitación funciona
    // como un reproductor normal.
    if (audio.paused) {
      await reproducir();
    } else {
      audio.pause();
    }
  };

  // ==========================================
  // SILENCIAR / ACTIVAR SONIDO
  // ==========================================

  const alternarSilencio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    setSilenciado(audio.muted);
  };

  // ==========================================
  // REINICIAR CANCIÓN
  // ==========================================

  const reiniciarCancion = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    setProgreso(0);
  };

  // ==========================================
  // SIGUIENTE CANCIÓN
  // ==========================================

  const siguienteCancion = () => {
    // Actualmente solo tenemos una canción.
    // Por eso este botón reinicia la pista.
    reiniciarCancion();
  };

  // ==========================================
  // CAMBIAR PROGRESO
  // ==========================================

  const cambiarProgreso = (evento) => {
    const audio = audioRef.current;

    if (
      !audio ||
      !Number.isFinite(audio.duration) ||
      audio.duration <= 0
    ) {
      return;
    }

    const valor = Number(evento.target.value);

    audio.currentTime =
      (valor / 100) * audio.duration;

    setProgreso(valor);
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <>
      {/* ======================================
          AUDIO PRINCIPAL
      ====================================== */}

      <audio
        ref={audioRef}
        src={MUSICA_URL}
        preload="metadata"
        loop
      />

      {/* ======================================
          PANTALLA DE BIENVENIDA
      ====================================== */}

      <AnimatePresence>
        {mostrarBienvenida && (
          <motion.section
            key="bienvenida-musica"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              y: -25,
              transition: {
                duration: 0.7,
                ease: "easeInOut",
              },
            }}
            className="
              fixed inset-0 z-[9999]
              flex items-center justify-center
              overflow-y-auto overflow-x-hidden
              bg-[#F4EDE3]
              text-[#102B50]
            "
            style={{
              minHeight: "100dvh",
              backgroundImage:
                "radial-gradient(ellipse at 50% 42%, #FFFDF9 0%, #F4EDE3 76%)",
            }}
          >
            {/* TEXTURA DEL FONDO */}

            <div
              className="
                pointer-events-none
                absolute inset-0 opacity-[0.16]
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
                -left-5 -top-9 h-44 w-32
                rotate-[145deg]
                text-[#B79A70]/70
                sm:left-5 sm:top-0
                sm:h-60 sm:w-40
              "
            />

            <RamaBotanica
              className="
                pointer-events-none absolute
                -right-5 -top-6 h-44 w-32
                -rotate-[130deg]
                text-[#52614D]/75
                sm:right-5 sm:top-0
                sm:h-60 sm:w-40
              "
            />

            <RamaBotanica
              className="
                pointer-events-none absolute
                -bottom-10 -left-7 h-48 w-36
                rotate-[12deg]
                text-[#B79A70]/75
                sm:bottom-0 sm:left-8
                sm:h-64 sm:w-44
              "
            />

            <RamaBotanica
              className="
                pointer-events-none absolute
                -bottom-10 -right-7 h-48 w-36
                -scale-x-100
                text-[#52614D]/65
                sm:bottom-0 sm:right-8
                sm:h-64 sm:w-44
              "
            />

            {/* ======================================
                CONTENIDO CENTRAL
            ====================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                ease: "easeOut",
              }}
              className="
                relative z-10 mx-auto
                flex min-h-[100dvh]
                w-full max-w-[540px]
                flex-col items-center
                justify-center
                px-6 py-12 text-center
                sm:px-10 sm:py-14
              "
            >
              {/* SUBTÍTULO */}

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.3,
                  duration: 0.8,
                }}
                className="
                  mb-3 text-[11px]
                  font-medium uppercase
                  tracking-[0.4em]
                  text-[#A88B65]
                  sm:text-xs
                "
              >
                Nuestra
              </motion.p>

              {/* TÍTULO */}

              <h1
                className="
                  font-playfair
                  text-[clamp(2.7rem,8vw,4.6rem)]
                  font-normal
                  leading-[1.1]
                  tracking-[0.035em]
                  text-[#102B50]
                "
              >
                MÚSICA
              </h1>

              {/* DIVISOR */}

              <div
                className="
                  mt-5 flex items-center gap-3
                "
              >
                <span
                  className="
                    h-px w-12
                    bg-[#B79A70]/70
                  "
                />

                <span
                  className="
                    text-sm text-[#B79A70]
                  "
                >
                  ♥
                </span>

                <span
                  className="
                    h-px w-12
                    bg-[#B79A70]/70
                  "
                />
              </div>

              {/* DESCRIPCIÓN */}

              <p
                className="
                  mt-5 max-w-[280px]
                  text-sm leading-7
                  tracking-[0.025em]
                  text-[#48534A]
                  sm:text-base
                "
              >
                ¿Nos acompañas
                <br />
                en nuestra playlist?
              </p>

              {/* ======================================
                  IMAGEN CIRCULAR
              ====================================== */}

              <div
                className="
                  relative mt-8 sm:mt-10
                "
              >
                <motion.div
                  animate={
                    reproduciendo
                      ? { rotate: 360 }
                      : { rotate: 0 }
                  }
                  transition={
                    reproduciendo
                      ? {
                          duration: 25,
                          ease: "linear",
                          repeat: Infinity,
                        }
                      : {
                          duration: 0.4,
                        }
                  }
                  className="
                    relative
                    h-[190px] w-[190px]
                    overflow-hidden rounded-full
                    border-[5px]
                    border-[#F4EDE3]
                    shadow-[0_10px_35px_rgba(16,43,80,0.18)]
                    sm:h-[230px]
                    sm:w-[230px]
                  "
                >
                  <img
                    src={IMAGEN_MUSICA}
                    alt="Nuestra canción especial"
                    className="
                      h-full w-full object-cover
                    "
                    onError={(evento) => {
                      evento.currentTarget.style.display =
                        "none";
                    }}
                  />

                  <div
                    className="
                      pointer-events-none
                      absolute inset-0
                      bg-[#102B50]/20
                    "
                  />
                </motion.div>

                {/* PLAY DE LA FOTOGRAFÍA */}

                <button
                  type="button"
                  onClick={alternarReproduccion}
                  disabled={cargando}
                  aria-label="Iniciar invitación con música"
                  className="
                    absolute left-1/2 top-1/2
                    flex h-16 w-16
                    -translate-x-1/2
                    -translate-y-1/2
                    items-center justify-center
                    rounded-full
                    border border-white/90
                    bg-[#102B50]/45
                    text-white
                    backdrop-blur-sm
                    transition duration-300
                    hover:scale-110
                    hover:bg-[#102B50]/75
                    disabled:opacity-60
                  "
                >
                  {cargando ? (
                    <LoaderCircle
                      size={25}
                      className="animate-spin"
                    />
                  ) : (
                    <Play
                      size={25}
                      fill="currentColor"
                      className="ml-1"
                    />
                  )}
                </button>
              </div>

              {/* ======================================
                  BARRA DE PROGRESO
              ====================================== */}

              <div
                className="
                  mt-8 w-full max-w-[270px]
                "
              >
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={progreso}
                  onChange={cambiarProgreso}
                  aria-label="Progreso de la canción"
                  className="
                    h-[3px] w-full
                    cursor-pointer
                    accent-[#B79A70]
                  "
                  style={{
                    background: `linear-gradient(to right, #B79A70 ${progreso}%, #D9CBBB ${progreso}%)`,
                  }}
                />

                {/* CONTROLES CENTRALES */}

                <div
                  className="
                    mt-4 flex items-center
                    justify-center gap-9
                    text-[#102B50]
                  "
                >
                  {/* REINICIAR */}

                  <button
                    type="button"
                    onClick={reiniciarCancion}
                    aria-label="Reiniciar canción"
                    className="
                      transition hover:scale-110
                    "
                  >
                    <SkipBack
                      size={21}
                      fill="currentColor"
                    />
                  </button>

                  {/* PLAY PRINCIPAL */}

                  <button
                    type="button"
                    onClick={alternarReproduccion}
                    disabled={cargando}
                    aria-label="Iniciar invitación con música"
                    className="
                      flex h-12 w-12
                      items-center justify-center
                      rounded-full
                      bg-[#102B50]
                      text-[#F4EDE3]
                      shadow-lg
                      transition hover:scale-105
                      disabled:opacity-60
                    "
                  >
                    {cargando ? (
                      <LoaderCircle
                        size={21}
                        className="animate-spin"
                      />
                    ) : (
                      <Play
                        size={20}
                        fill="currentColor"
                        className="ml-0.5"
                      />
                    )}
                  </button>

                  {/* SIGUIENTE */}

                  <button
                    type="button"
                    onClick={siguienteCancion}
                    aria-label="Reiniciar canción"
                    className="
                      transition hover:scale-110
                    "
                  >
                    <SkipForward
                      size={21}
                      fill="currentColor"
                    />
                  </button>
                </div>
              </div>

              {/* ERROR DE AUDIO */}

              {errorAudio && (
                <p
                  role="alert"
                  className="
                    mt-3 text-xs text-red-700
                  "
                >
                  No se pudo cargar la canción.
                  Verifica el archivo musica.mp3.
                </p>
              )}

              {/* ======================================
                  BOTONES PARA ENTRAR
              ====================================== */}

              <div
                className="
                  mt-8 flex w-full
                  max-w-[300px]
                  flex-col gap-3
                "
              >
                {/* ENTRAR CON MÚSICA */}

                <button
                  type="button"
                  onClick={entrarConMusica}
                  disabled={cargando}
                  className="
                    rounded-full
                    bg-[#102B50]
                    px-6 py-3.5
                    text-[11px]
                    font-medium uppercase
                    tracking-[0.19em]
                    text-white
                    shadow-[0_7px_20px_rgba(16,43,80,0.17)]
                    transition
                    hover:-translate-y-0.5
                    hover:bg-[#193B68]
                    disabled:opacity-60
                  "
                >
                  {cargando
                    ? "Preparando música..."
                    : "Entrar con música"}
                </button>

                {/* ENTRAR SIN MÚSICA */}

                <button
                  type="button"
                  onClick={continuarSinMusica}
                  className="
                    rounded-full
                    border border-[#B79A70]/70
                    bg-transparent
                    px-6 py-3
                    text-[11px]
                    uppercase
                    tracking-[0.15em]
                    text-[#102B50]
                    transition
                    hover:bg-white/60
                  "
                >
                  Continuar sin música
                </button>
              </div>

              {/* MENSAJE INFERIOR */}

              <p
                className="
                  mt-7 text-[10px]
                  uppercase
                  tracking-[0.28em]
                  text-[#A88B65]
                "
              >
                Dale play a este gran día
              </p>

              <ChevronDown
                size={20}
                strokeWidth={1.2}
                className="
                  mt-3 text-[#B79A70]
                "
              />
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ======================================
          CONTROLES FLOTANTES
      ====================================== */}

      <AnimatePresence>
        {!mostrarBienvenida && (
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              fixed bottom-5 right-4
              z-[9998]
              flex items-center gap-1
              rounded-full
              border border-[#B79A70]/50
              bg-[#F4EDE3]/95
              p-1.5
              shadow-[0_8px_30px_rgba(16,43,80,0.2)]
              backdrop-blur-md
              sm:bottom-7 sm:right-7
            "
          >
            {/* PLAY / PAUSE */}

            <button
              type="button"
              onClick={alternarReproduccion}
              disabled={cargando}
              aria-label={
                reproduciendo
                  ? "Pausar música"
                  : "Reproducir música"
              }
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-full
                bg-[#102B50]
                text-white
                transition hover:scale-105
                disabled:opacity-60
              "
            >
              {cargando ? (
                <LoaderCircle
                  size={17}
                  className="animate-spin"
                />
              ) : reproduciendo ? (
                <Pause
                  size={17}
                  fill="currentColor"
                />
              ) : (
                <Play
                  size={17}
                  fill="currentColor"
                />
              )}
            </button>

            {/* SILENCIAR / ACTIVAR */}

            <button
              type="button"
              onClick={alternarSilencio}
              aria-label={
                silenciado
                  ? "Activar sonido"
                  : "Silenciar música"
              }
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-full
                text-[#102B50]
                transition
                hover:bg-[#B79A70]/15
              "
            >
              {silenciado ? (
                <VolumeX size={19} />
              ) : (
                <Volume2 size={19} />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
