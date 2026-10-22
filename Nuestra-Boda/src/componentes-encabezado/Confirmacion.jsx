
import React, { useState } from "react";
import { motion } from "framer-motion";

// ==========================================
// CONFIGURACIÓN EDITABLE - WEDLY PLUS
// ==========================================

const URL_CONFIRMACION =
  "https://script.google.com/macros/s/AKfycbxklU9PTlqxkcu9pBUfWYhByQZ_7kJWuFENeeQhlEW-C6eh2cVbTK3z2AbMJiWVL1ME/exec";

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

const Confirmacion = () => {
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

  const enviarConfirmacion = async (e) => {
    e.preventDefault();

    if (!nombreInvitado.trim() || !asistencia) {
      setError("Completa tu nombre y confirma tu asistencia.");
      return;
    }

    if (
      asistencia === "Sí asistiré" &&
      (!invitados || Number(invitados) < 1)
    ) {
      setError("Indica el número de invitados.");
      return;
    }

    setError("");
    setEnviando(true);
    setEnviado(false);

    const data = {
      nombre: nombreInvitado.trim(),
      asistencia,
      invitados:
        asistencia === "Sí asistiré" ? invitados : "0",
      mensaje: mensajeInvitado.trim(),
    };

    try {
      const respuesta = await fetch(URL_CONFIRMACION, {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!respuesta.ok) {
        throw new Error("No se pudo completar la solicitud.");
      }

      setEnviado(true);

      setNombreInvitado("");
      setMensajeInvitado("");
      setAsistencia("");
      setInvitados("");
    } catch (error) {
      console.error("Error al enviar confirmación:", error);
      setError(
        "Hubo un error al enviar. Intenta nuevamente."
      );
    } finally {
      setEnviando(false);
    }
  };

  // ==========================================
  // ESTILOS REUTILIZABLES
  // ==========================================

  const estiloCampo = `
    w-full
    bg-[#F8F2ED]
    border border-[#B88A8A]/45
    rounded-2xl
    px-5 py-4
    text-[#4A141D]
    placeholder:text-[#4A141D]/45
    outline-none
    transition-all duration-300
    focus:border-[#4A141D]
    focus:ring-2
    focus:ring-[#B88A8A]/30
  `;

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#F4E8DD]
        px-5
        py-20 sm:py-28
      "
    >
      {/* DECORACIONES DEL FONDO */}
      <div
        className="
          pointer-events-none
          absolute -left-36 top-16
          h-80 w-80
          rounded-full
          border border-[#B88A8A]/20
        "
      />

      <div
        className="
          pointer-events-none
          absolute -right-36 bottom-16
          h-80 w-80
          rounded-full
          border border-[#B88A8A]/20
        "
      />

      {/* TARJETA PRINCIPAL */}
      <motion.div
        initial={{ opacity: 0, y: 55 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{ once: true }}
        className="
          relative z-10
          mx-auto
          w-full max-w-3xl
          overflow-hidden
          rounded-tl-[4rem]
          rounded-br-[4rem]
          rounded-tr-2xl
          rounded-bl-2xl
          border border-[#B88A8A]/40
          bg-[#F8F2ED]
          px-6 py-12
          sm:px-12 sm:py-16
          shadow-[0_25px_70px_rgba(74,20,29,0.12)]
        "
      >
        {/* LÍNEA DECORATIVA SUPERIOR */}
        <div
          className="
            absolute top-0 left-1/2
            h-[3px] w-28
            -translate-x-1/2
            bg-[#B88A8A]
          "
        />

        {/* ENCABEZADO */}
        <div className="text-center">

          <p
            className="
              text-xs sm:text-sm
              font-semibold
              uppercase
              tracking-[0.35em]
              text-[#9B626B]
            "
          >
            RSVP
          </p>

          <h2
            className="
              mt-5
              font-playfair
              text-4xl sm:text-5xl
              leading-tight
              text-[#4A141D]
            "
          >
            Confirmar asistencia
          </h2>

          <div className="mx-auto my-8 h-px w-24 bg-[#B88A8A]" />

          <p
            className="
              mx-auto max-w-xl
              font-playfair
              text-base sm:text-lg
              leading-relaxed
              text-[#4A141D]/75
            "
          >
            Nos llenará de alegría compartir este día
            tan especial contigo. Por favor, confirma
            tu asistencia.
          </p>

        </div>

        {/* FORMULARIO */}
        <form
          onSubmit={enviarConfirmacion}
          className="mx-auto mt-12 max-w-xl space-y-6"
        >
          {/* NOMBRE */}
          <div>
            <label
              htmlFor="nombreInvitado"
              className="
                mb-3 block
                text-sm font-medium
                text-[#4A141D]
              "
            >
              Nombre y apellido
            </label>

            <input
              id="nombreInvitado"
              type="text"
              placeholder="Escribe tu nombre completo"
              autoComplete="name"
              value={nombreInvitado}
              onChange={(e) =>
                setNombreInvitado(e.target.value)
              }
              className={estiloCampo}
            />
          </div>

          {/* ASISTENCIA */}
          <div>
            <p
              className="
                mb-4
                text-sm font-medium
                text-[#4A141D]
              "
            >
              ¿Nos acompañarás?
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              <button
                type="button"
                aria-pressed={asistencia === "Sí asistiré"}
                onClick={() =>
                  setAsistencia("Sí asistiré")
                }
                className={`
                  rounded-2xl
                  border
                  px-5 py-4
                  font-playfair
                  text-lg
                  transition-all duration-300
                  ${
                    asistencia === "Sí asistiré"
                      ? "border-[#4A141D] bg-[#4A141D] text-[#F8F2ED] shadow-lg"
                      : "border-[#B88A8A]/45 bg-[#F4E8DD] text-[#4A141D] hover:border-[#B88A8A]"
                  }
                `}
              >
                Sí asistiré
              </button>

              <button
                type="button"
                aria-pressed={
                  asistencia === "No podré asistir"
                }
                onClick={() => {
                  setAsistencia("No podré asistir");
                  setInvitados("");
                }}
                className={`
                  rounded-2xl
                  border
                  px-5 py-4
                  font-playfair
                  text-lg
                  transition-all duration-300
                  ${
                    asistencia === "No podré asistir"
                      ? "border-[#4A141D] bg-[#4A141D] text-[#F8F2ED] shadow-lg"
                      : "border-[#B88A8A]/45 bg-[#F4E8DD] text-[#4A141D] hover:border-[#B88A8A]"
                  }
                `}
              >
                No asistiré
              </button>

            </div>
          </div>

          {/* NÚMERO DE INVITADOS */}
          {asistencia === "Sí asistiré" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <label
                htmlFor="numeroInvitados"
                className="
                  mb-3 block
                  text-sm font-medium
                  text-[#4A141D]
                "
              >
                Número de invitados
              </label>

              <input
                id="numeroInvitados"
                type="number"
                min="1"
                step="1"
                placeholder="¿Cuántas personas asistirán?"
                value={invitados}
                onChange={(e) =>
                  setInvitados(e.target.value)
                }
                className={estiloCampo}
              />
            </motion.div>
          )}

          {/* MENSAJE */}
          <div>
            <label
              htmlFor="mensajeInvitado"
              className="
                mb-3 block
                text-sm font-medium
                text-[#4A141D]
              "
            >
              Mensaje para los novios
              <span className="ml-2 text-[#4A141D]/50">
                (Opcional)
              </span>
            </label>

            <textarea
              id="mensajeInvitado"
              placeholder="Déjanos unas palabras bonitas..."
              value={mensajeInvitado}
              onChange={(e) =>
                setMensajeInvitado(e.target.value)
              }
              rows={4}
              className={`${estiloCampo} resize-none`}
            />
          </div>

          {/* MENSAJE DE ERROR */}
          {error && (
            <p
              role="alert"
              className="
                rounded-xl
                border border-[#B88A8A]/50
                bg-[#B88A8A]/20
                px-4 py-3
                text-sm
                text-[#4A141D]
              "
            >
              {error}
            </p>
          )}

          {/* MENSAJE DE ÉXITO */}
          {enviado && (
            <p
              role="status"
              className="
                rounded-xl
                border border-[#B88A8A]/50
                bg-[#F4E8DD]
                px-4 py-3
                text-center text-sm
                text-[#4A141D]
              "
            >
              ¡Tu confirmación fue enviada correctamente!
            </p>
          )}

          {/* BOTÓN DE ENVÍO */}
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
              w-full
              rounded-full
              bg-[#4A141D]
              px-8 py-4
              font-playfair
              text-lg
              text-[#F8F2ED]
              shadow-[0_15px_35px_rgba(74,20,29,0.25)]
              transition-colors duration-300
              hover:bg-[#6B1F2A]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {enviando
              ? "Enviando..."
              : "Enviar confirmación"}
          </motion.button>
        </form>

        {/* LÍNEA DECORATIVA INFERIOR */}
        <div
          className="
            absolute bottom-0 left-1/2
            h-[3px] w-28
            -translate-x-1/2
            bg-[#B88A8A]
          "
        />
      </motion.div>
    </section>
  );
};

export default Confirmacion;
