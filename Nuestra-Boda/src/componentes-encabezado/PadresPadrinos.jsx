
import React from "react";
import { motion } from "framer-motion";
import { Heart, Flower2 } from "lucide-react";

// ==========================================
// INFORMACIÓN EDITABLE - WEDLY PLUS
// ==========================================

// PADRES DE LA NOVIA
const padresNovia = {
  titulo: "Padres de la novia",
  padre: "Alejandro Mendoza",
  madre: "Claudia Valdés",
};

// PADRES DEL NOVIO
const padresNovio = {
  titulo: "Padres del novio",
  padre: "Ricardo Navarro",
  madre: "Mariana Salazar",
};

// TEXTOS DE LA SECCIÓN
const textos = {
  subtitulo: "Con amor y gratitud",
  titulo: "Nuestros padres",
  descripcion:
    "Con la bendición y el amor de quienes nos han acompañado en cada paso de nuestra vida, queremos compartir contigo este día tan especial.",
  fraseFinal:
    "El amor que hoy celebramos también nace del amor de nuestras familias.",
};

// ==========================================
// ANIMACIONES
// ==========================================

const animacionTarjeta = {
  oculto: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ==========================================
// TARJETA DE PADRES
// ==========================================

const TarjetaPadres = ({ titulo, padre, madre }) => {
  return (
    <motion.div
      variants={animacionTarjeta}
      className="
        relative
        w-full
        max-w-[450px]
        overflow-hidden
        rounded-tl-[3.5rem]
        rounded-br-[3.5rem]
        rounded-tr-[1rem]
        rounded-bl-[1rem]
        border border-[#B88A8A]/40
        bg-[#F8F2ED]
        px-6 py-12
        sm:px-10 sm:py-14
        text-center
        shadow-[0_18px_50px_rgba(74,20,29,0.09)]
      "
    >
      {/* LÍNEA SUPERIOR */}
      <div
        className="
          absolute top-0 left-1/2
          h-[3px] w-28
          -translate-x-1/2
          bg-[#B88A8A]
        "
      />

      {/* DECORACIÓN SUPERIOR */}
      <div
        className="
          absolute -top-16 -right-16
          h-44 w-44
          rounded-full
          border border-[#B88A8A]/20
          pointer-events-none
        "
      />

      <div
        className="
          absolute -top-9 -right-9
          h-28 w-28
          rounded-full
          border border-[#B88A8A]/20
          pointer-events-none
        "
      />

      <div className="relative z-10 flex flex-col items-center">

        {/* ICONO */}
        <div
          className="
            mb-7
            flex h-16 w-16
            items-center justify-center
            rounded-full
            border border-[#B88A8A]/45
            bg-[#F4E8DD]
          "
        >
          <Flower2
            size={30}
            strokeWidth={1.2}
            className="text-[#4A141D]"
          />
        </div>

        {/* TÍTULO */}
        <h3
          className="
            font-playfair
            text-xl sm:text-2xl
            text-[#4A141D]
          "
        >
          {titulo}
        </h3>

        {/* SEPARADOR */}
        <div className="my-7 flex items-center gap-3">
          <div className="h-[1px] w-10 bg-[#B88A8A]" />

          <Heart
            size={13}
            strokeWidth={1.4}
            className="text-[#B88A8A]"
          />

          <div className="h-[1px] w-10 bg-[#B88A8A]" />
        </div>

        {/* NOMBRES */}
        <div className="flex flex-col items-center gap-4">

          <p
            className="
              font-playfair
              text-2xl sm:text-[1.8rem]
              leading-snug
              text-[#4A141D]
            "
          >
            {padre}
          </p>

          <span
            className="
              font-cursiveDancing
              text-3xl
              text-[#B88A8A]
            "
          >
            &
          </span>

          <p
            className="
              font-playfair
              text-2xl sm:text-[1.8rem]
              leading-snug
              text-[#4A141D]
            "
          >
            {madre}
          </p>

        </div>
      </div>

      {/* LÍNEA INFERIOR */}
      <div
        className="
          absolute bottom-0 left-1/2
          h-[3px] w-28
          -translate-x-1/2
          bg-[#B88A8A]
        "
      />
    </motion.div>
  );
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

const Padres = () => {
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
      {/* DECORACIONES DE FONDO */}
      <div
        className="
          pointer-events-none
          absolute -left-40 top-20
          h-80 w-80
          rounded-full
          border border-[#B88A8A]/20
        "
      />

      <div
        className="
          pointer-events-none
          absolute -right-40 bottom-20
          h-80 w-80
          rounded-full
          border border-[#B88A8A]/20
        "
      />

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* ENCABEZADO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mb-14 text-center"
        >
          {/* ADORNO */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="h-[1px] w-12 bg-[#B88A8A]" />

            <Heart
              size={20}
              strokeWidth={1.3}
              className="text-[#B88A8A]"
            />

            <div className="h-[1px] w-12 bg-[#B88A8A]" />
          </div>

          {/* SUBTÍTULO */}
          <p
            className="
              text-xs sm:text-sm
              uppercase
              tracking-[0.35em]
              text-[#9B626B]
            "
          >
            {textos.subtitulo}
          </p>

          {/* TÍTULO PRINCIPAL */}
          <h2
            className="
              mt-5
              font-cursiveDancing
              text-5xl sm:text-6xl md:text-7xl
              text-[#4A141D]
            "
          >
            {textos.titulo}
          </h2>

          {/* DESCRIPCIÓN */}
          <p
            className="
              mx-auto mt-7
              max-w-2xl
              font-playfair
              text-base sm:text-lg
              leading-relaxed
              text-[#4A141D]/80
            "
          >
            {textos.descripcion}
          </p>
        </motion.div>

        {/* TARJETAS DE PADRES */}
        <motion.div
          initial="oculto"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.18 }}
          className="
            grid grid-cols-1
            items-stretch
            justify-items-center
            gap-8 lg:gap-10
            md:grid-cols-2
          "
        >
          <TarjetaPadres {...padresNovia} />

          <TarjetaPadres {...padresNovio} />
        </motion.div>

        {/* FRASE FINAL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <Flower2
            size={25}
            strokeWidth={1.2}
            className="mx-auto mb-5 text-[#B88A8A]"
          />

          <p
            className="
              mx-auto max-w-xl
              font-playfair
              text-lg sm:text-xl
              italic leading-relaxed
              text-[#4A141D]/85
            "
          >
            {textos.fraseFinal}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Padres;
