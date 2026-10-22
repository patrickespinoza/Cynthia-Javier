
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Send,
  Users,
  CheckCircle2,
  AlertCircle,
  CalendarHeart,
} from "lucide-react";

// ==========================================
// CONFIGURACIÓN - WEDLY
// ==========================================

// Conservamos la URL de tu formulario original.
// El Apps Script debe estar vinculado a Google Sheets.

const URL_CONFIRMACION =
  "https://script.google.com/macros/s/AKfycbwA7Ealt0HtfJU8EA_qqCOWrpder5YHikc_5T4LJLzlVN9GxjXUW0B2gHQs-JPgZqUp/exec";

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
// ESTILOS DE CAMPOS
// ==========================================

const estiloCampo = `
  w-full
  rounded-2xl
  border border-[#B79A70]/45
  bg-[#FFFDF9]
  px-5 py-4
  text-[#102B50]
  placeholder:text-[#52614D]/55
  outline-none
  transition-all duration-300
  focus:border-[#B79A70]
  focus:ring-2
  focus:ring-[#B79A70]/20
  disabled:cursor-not-allowed
  disabled:opacity-60
`;

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function Confirmacion() {
  const [nombreInvitado, setNombreInvitado] = useState("");
  const [mensajeInvitado, setMensajeInvitado] = useState("");
  const [asistencia, setAsistencia] = useState("");
  const [invitados, setInvitados] = useState("");

  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  // ==========================================
  // ENVIAR CONFIRMACIÓN
  // ==========================================

  const enviarConfirmacion = async (evento) => {
    evento.preventDefault();

    if (enviando) return;

    if (!nombreInvitado.trim()) {
      setError("Por favor, escribe tu nombre completo.");
      return;
    }

    if (!asistencia) {
      setError("Selecciona si podrás acompañarnos.");
      return;
    }

    if (
      asistencia === "Sí asistiré" &&
      (!invitados ||
        !Number.isInteger(Number(invitados)) ||
        Number(invitados) < 1)
    ) {
      setError("Indica un número válido de invitados.");
      return;
    }

    setError("");
    setEnviado(false);
    setEnviando(true);

    // Mantenemos los nombres de las propiedades
    // que utilizaba tu formulario anterior.
    const datos = {
      nombre: nombreInvitado.trim(),
      asistencia,
      invitados:
        asistencia === "Sí asistiré"
          ? String(invitados)
          : "0",
      mensaje: mensajeInvitado.trim(),
    };

    try {
      const respuesta = await fetch(URL_CONFIRMACION, {
        method: "POST",
        body: JSON.stringify(datos),
      });

      if (!respuesta.ok) {
        throw new Error(
          `Error del servidor: ${respuesta.status}`
        );
      }

      // Si Apps Script devuelve JSON, comprobar
      // también si el servidor reportó un error.
      const textoRespuesta = await respuesta.text();

      if (textoRespuesta) {
        try {
          const resultado = JSON.parse(textoRespuesta);

          if (
            resultado.success === false ||
            resultado.ok === false ||
            resultado.error
          ) {
            throw new Error(
              resultado.error ||
                "No se pudo guardar la confirmación."
            );
          }
        } catch (errorParseo) {
          if (
            errorParseo instanceof SyntaxError
          ) {
            // Algunas implementaciones antiguas
            // devuelven texto en lugar de JSON.
          } else {
            throw errorParseo;
          }
        }
      }

      setEnviado(true);
      setNombreInvitado("");
      setMensajeInvitado("");
      setAsistencia("");
      setInvitados("");
    } catch (errorEnvio) {
      console.error(
        "Error al enviar confirmación:",
        errorEnvio
      );

      setError(
        "No pudimos verificar el envío. Intenta nuevamente o comunícate con los novios."
      );
    } finally {
      setEnviando(false);
    }
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <section
      id="confirmacion"
      className="
        relative isolate
        w-full overflow-hidden
        bg-[#102B50]
        px-4 py-20
        sm:px-8 sm:py-28
        lg:py-32
      "
      style={{
        backgroundImage:
          "radial-gradient(ellipse at center, #1B3E68 0%, #102B50 65%, #0A1D36 100%)",
      }}
    >
      {/* ======================================
          RAMAS DECORATIVAS
      ====================================== */}

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

      {/* CÍRCULOS DECORATIVOS */}

      <div
        className="
          pointer-events-none
          absolute -left-40 top-1/3
          h-80 w-80 rounded-full
          border border-[#D9C19B]/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute -right-40 bottom-1/4
          h-80 w-80 rounded-full
          border border-[#D9C19B]/10
        "
      />

      {/* ======================================
          ENCABEZADO
      ====================================== */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="
          relative z-10
          mx-auto max-w-[700px]
          text-center
        "
      >
        <p
          className="
            text-[11px]
            uppercase tracking-[0.35em]
            text-[#D9C19B]
            sm:text-sm
          "
        >
          RSVP
        </p>

        <h2
          className="
            mt-5 font-playfair
            text-[clamp(2.6rem,7vw,4.8rem)]
            font-normal leading-[1.15]
            text-[#F4EDE3]
          "
        >
          Confirma tu Asistencia
        </h2>

        <div
          className="
            mx-auto mt-7
            flex items-center
            justify-center gap-4
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
            mx-auto mt-7 max-w-[530px]
            text-sm leading-8
            text-[#F4EDE3]/85
            sm:text-base
          "
        >
          Nos llenará de alegría compartir
          este día tan especial contigo.
          Por favor, ayúdanos confirmando
          tu asistencia.
        </p>
      </motion.div>

      {/* ======================================
          TARJETA DEL FORMULARIO
      ====================================== */}

      <motion.div
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative z-10
          mx-auto mt-12
          w-full max-w-[720px]
          overflow-hidden
          rounded-[26px]
          border border-[#D9C19B]/60
          bg-[#F4EDE3]
          px-5 py-10
          shadow-[0_25px_80px_rgba(0,0,0,0.25)]
          sm:mt-16
          sm:rounded-[34px]
          sm:px-12 sm:py-14
        "
      >
        {/* LÍNEA SUPERIOR */}

        <div
          className="
            absolute left-1/2 top-0
            h-[3px] w-28
            -translate-x-1/2
            bg-[#B79A70]
          "
        />

        {/* ÍCONO */}

        <div
          className="
            mx-auto flex h-16 w-16
            items-center justify-center
            rounded-full
            border border-[#B79A70]/65
            text-[#52614D]
          "
        >
          <CalendarHeart
            size={29}
            strokeWidth={1.3}
          />
        </div>

        <h3
          className="
            mt-5 text-center
            font-cursiveDancing
            text-4xl text-[#102B50]
            sm:text-5xl
          "
        >
          ¿Nos acompañarás?
        </h3>

        <p
          className="
            mt-3 text-center
            text-xs tracking-[0.12em]
            text-[#52614D]
          "
        >
          CYNTHIA & JAVIER
        </p>

        {/* ======================================
            FORMULARIO
        ====================================== */}

        <form
          onSubmit={enviarConfirmacion}
          className="
            mx-auto mt-10
            max-w-[550px]
            space-y-7
          "
        >
          {/* NOMBRE */}

          <div>
            <label
              htmlFor="nombreInvitado"
              className="
                mb-3 block
                text-sm font-medium
                text-[#102B50]
              "
            >
              Nombre y apellido
            </label>

            <input
              id="nombreInvitado"
              type="text"
              placeholder="Escribe tu nombre completo"
              autoComplete="name"
              maxLength={120}
              required
              disabled={enviando}
              value={nombreInvitado}
              onChange={(evento) =>
                setNombreInvitado(evento.target.value)
              }
              className={estiloCampo}
            />
          </div>

          {/* ASISTENCIA */}

          <div>
            <p
              className="
                mb-4 text-sm
                font-medium
                text-[#102B50]
              "
            >
              ¿Podrás acompañarnos?
            </p>

            <div
              className="
                grid grid-cols-1 gap-3
                sm:grid-cols-2
              "
            >
              <button
                type="button"
                disabled={enviando}
                aria-pressed={
                  asistencia === "Sí asistiré"
                }
                onClick={() => {
                  setAsistencia("Sí asistiré");
                  setError("");
                  setEnviado(false);
                }}
                className={`
                  flex min-h-[60px]
                  items-center justify-center
                  gap-2 rounded-2xl
                  border px-4 py-4
                  font-playfair text-lg
                  transition-all duration-300
                  disabled:opacity-60
                  ${
                    asistencia === "Sí asistiré"
                      ? "border-[#102B50] bg-[#102B50] text-[#FFFDF9] shadow-lg"
                      : "border-[#B79A70]/50 bg-[#FFFDF9] text-[#102B50] hover:border-[#102B50]"
                  }
                `}
              >
                <Heart
                  size={17}
                  strokeWidth={1.5}
                />
                Sí asistiré
              </button>

              <button
                type="button"
                disabled={enviando}
                aria-pressed={
                  asistencia === "No podré asistir"
                }
                onClick={() => {
                  setAsistencia("No podré asistir");
                  setInvitados("");
                  setError("");
                  setEnviado(false);
                }}
                className={`
                  flex min-h-[60px]
                  items-center justify-center
                  gap-2 rounded-2xl
                  border px-4 py-4
                  font-playfair text-lg
                  transition-all duration-300
                  disabled:opacity-60
                  ${
                    asistencia === "No podré asistir"
                      ? "border-[#102B50] bg-[#102B50] text-[#FFFDF9] shadow-lg"
                      : "border-[#B79A70]/50 bg-[#FFFDF9] text-[#102B50] hover:border-[#102B50]"
                  }
                `}
              >
                No asistiré
              </button>
            </div>
          </div>

          {/* ======================================
              NÚMERO DE INVITADOS
          ====================================== */}

          <AnimatePresence mode="wait">
            {asistencia === "Sí asistiré" && (
              <motion.div
                key="numero-invitados"
                initial={{
                  opacity: 0,
                  height: 0,
                  y: -10,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  y: -10,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <label
                  htmlFor="numeroInvitados"
                  className="
                    mb-3 flex items-center
                    gap-2 text-sm
                    font-medium text-[#102B50]
                  "
                >
                  <Users
                    size={17}
                    className="text-[#52614D]"
                  />
                  Número de invitados
                </label>

                <input
                  id="numeroInvitados"
                  type="number"
                  min="1"
                  step="1"
                  required
                  disabled={enviando}
                  placeholder="¿Cuántas personas asistirán?"
                  value={invitados}
                  onChange={(evento) =>
                    setInvitados(evento.target.value)
                  }
                  className={estiloCampo}
                />

                <p
                  className="
                    mt-2 text-xs
                    text-[#52614D]/80
                  "
                >
                  Inclúyete en el número total de personas.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* MENSAJE */}

          <div>
            <label
              htmlFor="mensajeInvitado"
              className="
                mb-3 block
                text-sm font-medium
                text-[#102B50]
              "
            >
              Mensaje para los novios
              <span
                className="
                  ml-2 font-normal
                  text-[#52614D]/75
                "
              >
                (Opcional)
              </span>
            </label>

            <textarea
              id="mensajeInvitado"
              placeholder="Déjanos unas palabras bonitas..."
              rows={4}
              maxLength={1000}
              disabled={enviando}
              value={mensajeInvitado}
              onChange={(evento) =>
                setMensajeInvitado(evento.target.value)
              }
              className={`
                ${estiloCampo}
                resize-none
              `}
            />
          </div>

          {/* ======================================
              MENSAJES DE ESTADO
          ====================================== */}

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                role="alert"
                className="
                  flex items-start gap-3
                  rounded-xl
                  border border-[#B79A70]/60
                  bg-[#FFFDF9]
                  px-4 py-4
                  text-sm leading-6
                  text-[#102B50]
                "
              >
                <AlertCircle
                  size={20}
                  className="
                    mt-0.5 shrink-0
                    text-[#B79A70]
                  "
                />

                <span>{error}</span>
              </motion.div>
            )}

            {enviado && !error && (
              <motion.div
                key="exito"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                role="status"
                className="
                  flex items-start gap-3
                  rounded-xl
                  border border-[#52614D]/30
                  bg-[#52614D]/10
                  px-4 py-4
                  text-sm leading-6
                  text-[#102B50]
                "
              >
                <CheckCircle2
                  size={21}
                  className="
                    mt-0.5 shrink-0
                    text-[#52614D]
                  "
                />

                <span>
                  ¡Gracias! Tu respuesta fue enviada.
                  Nos encantará compartir este día contigo.
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ======================================
              BOTÓN ENVIAR
          ====================================== */}

          <motion.button
            type="submit"
            disabled={enviando}
            whileHover={
              enviando ? {} : { scale: 1.02 }
            }
            whileTap={
              enviando ? {} : { scale: 0.98 }
            }
            className="
              flex w-full
              min-h-[58px]
              items-center justify-center
              gap-3 rounded-full
              bg-[#102B50]
              px-8 py-4
              font-playfair text-lg
              text-[#FFFDF9]
              shadow-[0_12px_30px_rgba(16,43,80,0.2)]
              transition-colors duration-300
              hover:bg-[#1B3E68]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {enviando ? (
              <>
                <span
                  className="
                    h-5 w-5 animate-spin
                    rounded-full
                    border-2 border-white/35
                    border-t-white
                  "
                />
                Enviando...
              </>
            ) : (
              <>
                <Send size={19} strokeWidth={1.5} />
                Enviar confirmación
              </>
            )}
          </motion.button>
        </form>

        {/* LÍNEA INFERIOR */}

        <div
          className="
            absolute bottom-0 left-1/2
            h-[3px] w-28
            -translate-x-1/2
            bg-[#B79A70]
          "
        />
      </motion.div>

      {/* ======================================
          CIERRE DE SECCIÓN
      ====================================== */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="
          relative z-10
          mt-14 flex
          flex-col items-center
          text-center
        "
      >
        <div
          className="
            flex items-center
            justify-center gap-4
          "
        >
          <span className="h-px w-14 bg-[#D9C19B]/70" />

          <Heart
            size={13}
            fill="currentColor"
            className="text-[#D9C19B]"
          />

          <span className="h-px w-14 bg-[#D9C19B]/70" />
        </div>

        <p
          className="
            mt-6 font-cursiveDancing
            text-3xl text-[#F4EDE3]
            sm:text-4xl
          "
        >
          ¡Esperamos verte pronto!
        </p>
      </motion.div>
    </section>
  );
}
