
"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Music,
  Pause,
  Play,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

// ==========================================
// INFORMACIÓN EDITABLE - WEDLY PLUS
// ==========================================

// Canción de la invitación
const MUSICA_URL = "/musica.mp3";

// Volumen inicial (0 a 1)
const VOLUMEN_INICIAL = 0.45;

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

const Musica = () => {
  const audioRef = useRef(null);

  const [mostrarModal, setMostrarModal] = useState(true);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [silenciado, setSilenciado] = useState(false);
  const [cargando, setCargando] = useState(false);

  // ==========================================
  // CONFIGURACIÓN DEL AUDIO
  // ==========================================

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = VOLUMEN_INICIAL;

    const detenerCarga = () => {
      setCargando(false);
    };

    const detectarReproduccion = () => {
      setReproduciendo(true);
      setCargando(false);
    };

    const detectarPausa = () => {
      setReproduciendo(false);
    };

    audio.addEventListener("playing", detectarReproduccion);
    audio.addEventListener("pause", detectarPausa);
    audio.addEventListener("canplay", detenerCarga);
    audio.addEventListener("error", detenerCarga);

    return () => {
      audio.removeEventListener("playing", detectarReproduccion);
      audio.removeEventListener("pause", detectarPausa);
      audio.removeEventListener("canplay", detenerCarga);
      audio.removeEventListener("error", detenerCarga);
    };
  }, []);

  // ==========================================
  // REPRODUCIR MÚSICA DESDE EL MODAL
  // ==========================================

  const reproducirMusica = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      setCargando(true);

      audio.muted = false;
      setSilenciado(false);

      await audio.play();

      setReproduciendo(true);
      setMostrarModal(false);
    } catch (error) {
      console.error(
        "No se pudo reproducir la música:",
        error
      );

      setCargando(false);
      setMostrarModal(false);
    }
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

    setReproduciendo(false);
    setMostrarModal(false);
  };

  // ==========================================
  // ALTERNAR REPRODUCCIÓN
  // ==========================================

  const alternarReproduccion = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      try {
        setCargando(true);

        await audio.play();

        setReproduciendo(true);
      } catch (error) {
        console.error(
          "No se pudo reproducir la música:",
          error
        );

        setCargando(false);
      }
    } else {
      audio.pause();
      setReproduciendo(false);
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

  return (
    <>
      {/* ======================================
          AUDIO
      ====================================== */}

      <audio
        ref={audioRef}
        src={MUSICA_URL}
        loop
        preload="auto"
      />

      {/* ======================================
          MODAL DE BIENVENIDA
      ====================================== */}

      <AnimatePresence>
        {mostrarModal && (
          <motion.div
            className="
              fixed inset-0 z-[9999]
              flex items-center justify-center
              bg-black/75
              px-5
              backdrop-blur-xl
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="
                relative
                w-full max-w-[420px]
                overflow-hidden
                rounded-tl-[42px]
                rounded-br-[42px]
                border border-[#B88A8A]/50
                bg-[#F4E8DD]
                px-7 py-10
                text-center
                shadow-[0_25px_70px_rgba(0,0,0,0.35)]
                sm:px-10 sm:py-12
              "
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
                y: 20,
                scale: 0.96,
              }}
              transition={{
                duration: 0.55,
                ease: "easeOut",
              }}
            >
              {/* DECORACIÓN SUPERIOR */}
              <div
                className="
                  absolute top-0 left-1/2
                  -translate-x-1/2
                  w-28 h-[3px]
                  bg-[#B88A8A]
                "
              />

              {/* BOTÓN CERRAR */}
              <button
                type="button"
                onClick={continuarSinMusica}
                aria-label="Cerrar ventana de música"
                className="
                  absolute right-5 top-5
                  flex h-9 w-9
                  items-center justify-center
                  rounded-full
                  border border-[#B88A8A]/40
                  bg-[#F8F2ED]
                  text-[#4A141D]
                  transition
                  hover:scale-105
                  hover:bg-white
                "
              >
                <X size={17} />
              </button>

              {/* ICONO MUSICAL */}
              <motion.div
                className="
                  mx-auto mb-6
                  flex h-20 w-20
                  items-center justify-center
                  rounded-full
                  border border-[#B88A8A]/50
                  bg-[#F8F2ED]
                  text-[#4A141D]
                  shadow-[0_10px_30px_rgba(74,20,29,0.12)]
                "
                animate={{
                  rotate: reproduciendo ? 360 : 0,
                }}
                transition={{
                  duration: 8,
                  repeat: reproduciendo ? Infinity : 0,
                  ease: "linear",
                }}
              >
                <Music
                  size={31}
                  strokeWidth={1.5}
                />
              </motion.div>

              {/* SUBTÍTULO */}
              <p
                className="
                  mb-3
                  text-xs uppercase
                  tracking-[0.32em]
                  text-[#9B626B]
                "
              >
                Una experiencia especial
              </p>

              {/* TÍTULO */}
              <h2
                className="
                  mb-4
                  font-playfair
                  text-3xl
                  font-medium
                  text-[#4A141D]
                  sm:text-4xl
                "
              >
                Música para acompañarte
              </h2>

              {/* DESCRIPCIÓN */}
              <p
                className="
                  mx-auto mb-8
                  max-w-[310px]
                  text-sm leading-7
                  text-[#4A141D]/80
                "
              >
                Hemos preparado una canción especial
                para acompañarte durante esta invitación.
              </p>

              {/* BOTONES */}
              <div className="flex flex-col gap-3">

                {/* ESCUCHAR MÚSICA */}
                <button
                  type="button"
                  onClick={reproducirMusica}
                  disabled={cargando}
                  className="
                    flex w-full
                    items-center justify-center
                    gap-3
                    rounded-full
                    bg-[#4A141D]
                    px-6 py-4
                    text-sm uppercase
                    tracking-[0.16em]
                    text-[#F8F2ED]
                    transition
                    hover:-translate-y-0.5
                    hover:bg-[#65232E]
                    disabled:cursor-not-allowed
                    disabled:opacity-70
                  "
                >
                  {cargando ? (
                    <>
                      <span
                        className="
                          h-4 w-4
                          animate-spin
                          rounded-full
                          border-2
                          border-white/40
                          border-t-white
                        "
                      />
                      Cargando
                    </>
                  ) : (
                    <>
                      <Play
                        size={17}
                        fill="currentColor"
                      />
                      Escuchar música
                    </>
                  )}
                </button>

                {/* CONTINUAR SIN MÚSICA */}
                <button
                  type="button"
                  onClick={continuarSinMusica}
                  className="
                    w-full
                    rounded-full
                    border border-[#B88A8A]/70
                    bg-transparent
                    px-6 py-4
                    text-sm uppercase
                    tracking-[0.14em]
                    text-[#4A141D]
                    transition
                    hover:bg-[#F8F2ED]
                  "
                >
                  Continuar sin música
                </button>
              </div>

              {/* DECORACIÓN INFERIOR */}
              <div
                className="
                  absolute bottom-0 left-1/2
                  -translate-x-1/2
                  w-28 h-[3px]
                  bg-[#B88A8A]
                "
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================
          CONTROLES FLOTANTES
      ====================================== */}

      {!mostrarModal && (
        <motion.div
          className="
            fixed bottom-5 right-5
            z-[9998]
            flex items-center gap-2
            rounded-full
            border border-[#B88A8A]/50
            bg-[#F4E8DD]/95
            p-2
            shadow-[0_12px_35px_rgba(74,20,29,0.2)]
            backdrop-blur-md
          "
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
          transition={{
            duration: 0.45,
          }}
        >
          {/* REPRODUCIR / PAUSAR */}
          <button
            type="button"
            onClick={alternarReproduccion}
            aria-label={
              reproduciendo
                ? "Pausar música"
                : "Reproducir música"
            }
            className="
              flex h-11 w-11
              items-center justify-center
              rounded-full
              bg-[#4A141D]
              text-[#F8F2ED]
              transition
              hover:scale-105
              hover:bg-[#65232E]
            "
          >
            {cargando ? (
              <span
                className="
                  h-4 w-4
                  animate-spin
                  rounded-full
                  border-2
                  border-white/40
                  border-t-white
                "
              />
            ) : reproduciendo ? (
              <Pause
                size={18}
                fill="currentColor"
              />
            ) : (
              <Play
                size={18}
                fill="currentColor"
              />
            )}
          </button>

          {/* ACTIVAR / SILENCIAR */}
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
              text-[#4A141D]
              transition
              hover:bg-[#B88A8A]/20
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
    </>
  );
};

export default Musica;
