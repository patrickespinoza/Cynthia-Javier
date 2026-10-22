
import React from "react";
import { motion } from "framer-motion";
import {
  HeartHandshake,
  GlassWater,
  Music2,
  UtensilsCrossed,
  Cake,
  MoonStar,
} from "lucide-react";

// ==========================================
// INFORMACIÓN EDITABLE - WEDLY PLUS
// ==========================================

// Modifica los horarios y nombres según el evento.
const eventos = [
  {
    titulo: "Ceremonia civil",
    hora: "4:30 PM",
    icono: HeartHandshake,
  },
  {
    titulo: "Recepción",
    hora: "6:00 PM",
    icono: GlassWater,
  },
  {
    titulo: "Baile",
    hora: "7:00 PM",
    icono: Music2,
  },
  {
    titulo: "Comida",
    hora: "8:00 PM",
    icono: UtensilsCrossed,
  },
  {
    titulo: "Pastel",
    hora: "9:30 PM",
    icono: Cake,
  },
  {
    titulo: "Fin de la celebración",
    hora: "12:00 AM",
    icono: MoonStar,
  },
];

// ==========================================
// ANIMACIONES
// ==========================================

const animacionEntrada = {
  oculto: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ==========================================
// TARJETA DE EVENTO
// ==========================================

const EventoItinerario = ({
  titulo,
  hora,
  icono: Icono,
  ultimo,
}) => {
  return (
    <motion.div
      variants={animacionEntrada}
      className="relative flex items-start gap-5 sm:gap-8"
    >
      {/* COLUMNA DEL ICONO Y LÍNEA */}
      <div className="relative flex flex-col items-center shrink-0">

        {/* ICONO CIRCULAR */}
        <div
          className="
            relative z-10
            flex h-16 w-16
            sm:h-20 sm:w-20
            items-center justify-center
            rounded-full
            border border-[#B88A8A]/55
            bg-[#F8F2ED]
            shadow-[0_8px_25px_rgba(74,20,29,0.10)]
          "
        >
          <Icono
            size={29}
            strokeWidth={1.4}
            className="text-[#4A141D]"
          />
        </div>

        {/* LÍNEA VERTICAL */}
        {!ultimo && (
          <div
            className="
              absolute top-16 bottom-[-2.5rem]
              sm:top-20
              w-[2px]
              bg-[#B88A8A]/55
            "
          />
        )}
      </div>

      {/* INFORMACIÓN DEL EVENTO */}
      <div
        className="
          flex-1
          min-w-0
          pb-10
          sm:pb-12
        "
      >
        <div
          className="
            rounded-2xl
            border border-[#B88A8A]/30
            bg-[#F8F2ED]/70
            px-5 py-5
            sm:px-8 sm:py-6
            transition-all duration-300
            hover:border-[#B88A8A]/70
            hover:shadow-[0_10px_30px_rgba(74,20,29,0.08)]
          "
        >
          {/* HORA */}
          <p
            className="
              mb-2
              text-xs sm:text-sm
              font-semibold
              uppercase
              tracking-[0.22em]
              text-[#9B626B]
            "
          >
            {hora}
          </p>

          {/* NOMBRE DEL EVENTO */}
          <h3
            className="
              font-playfair
              text-xl sm:text-2xl
              leading-snug
              text-[#4A141D]
            "
          >
            {titulo}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

// ==========================================
// COMPONENTE PRINCIPAL - ITINERARIO
// ==========================================

const Itinerario = () => {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#4A141D]
        px-5
        py-20 sm:py-28
      "
    >
      {/* DECORACIONES DEL FONDO */}
      <div
        className="
          pointer-events-none
          absolute -left-36 top-20
          h-80 w-80
          rounded-full
          border border-[#B88A8A]/15
        "
      />

      <div
        className="
          pointer-events-none
          absolute -right-36 bottom-20
          h-80 w-80
          rounded-full
          border border-[#B88A8A]/15
        "
      />

      <div className="relative z-10 mx-auto max-w-5xl">

        {/* ======================================
            TARJETA PRINCIPAL CHAMPAGNE
        ====================================== */}
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true, amount: 0.1 }}
          className="
            relative
            overflow-hidden
            rounded-tl-[4rem]
            rounded-br-[4rem]
            rounded-tr-2xl
            rounded-bl-2xl
            border border-[#B88A8A]/35
            bg-[#F4E8DD]
            px-6 py-14
            sm:px-12 sm:py-16
            shadow-[0_25px_70px_rgba(0,0,0,0.25)]
          "
        >
          {/* ENCABEZADO */}
          <div className="text-center">

            <p
              className="
                mb-4
                text-xs sm:text-sm
                font-semibold
                uppercase
                tracking-[0.35em]
                text-[#9B626B]
              "
            >
              Momentos especiales
            </p>

            <h2
              className="
                font-playfair
                text-4xl sm:text-5xl md:text-6xl
                text-[#4A141D]
              "
            >
              Itinerario
            </h2>

            {/* SEPARADOR */}
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
              Cada instante será parte de una historia
              inolvidable. Acompáñanos a celebrar
              cada momento.
            </p>
          </div>

          {/* ======================================
              LÍNEA DE TIEMPO
          ====================================== */}
          <motion.div
            initial="oculto"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              staggerChildren: 0.12,
            }}
            className="
              mx-auto
              mt-14
              max-w-2xl
            "
          >
            {eventos.map((evento, index) => (
              <EventoItinerario
                key={`${evento.titulo}-${index}`}
                {...evento}
                ultimo={index === eventos.length - 1}
              />
            ))}
          </motion.div>

          {/* FRASE FINAL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-4 text-center"
          >
            <div className="mx-auto mb-6 h-px w-24 bg-[#B88A8A]" />

            <p
              className="
                font-cursiveDancing
                text-3xl sm:text-4xl
                text-[#4A141D]
              "
            >
              ¡Te esperamos!
            </p>
          </motion.div>

          {/* DETALLES DECORATIVOS */}
          <div
            className="
              absolute top-0 left-1/2
              h-[3px] w-28
              -translate-x-1/2
              bg-[#B88A8A]
            "
          />

          <div
            className="
              absolute bottom-0 left-1/2
              h-[3px] w-28
              -translate-x-1/2
              bg-[#B88A8A]
            "
          />

        </motion.div>
      </div>
    </section>
  );
};

export default Itinerario;
