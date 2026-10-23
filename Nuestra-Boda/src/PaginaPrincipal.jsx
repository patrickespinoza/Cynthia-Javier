import Portada from "./componentes-encabezado/portada";
import Contador from "./componentes-encabezado/Contador";
import Celebracion from "./componentes-encabezado/Ubicacion";
import Dresscode from "./componentes-encabezado/Dresscode";
import Regalos from "./componentes-encabezado/Regalos";
import Confirmacion from "./componentes-encabezado/Confirmacion";
import Musica from "./componentes-encabezado/musica";
import FinalBoda from "./componentes-encabezado/Final";
import Carrusel from "./componentes-encabezado/Carrusel";
import Padres from "./componentes-encabezado/Padres";

export default function PaginaPrincipal() {
  return (
    <div>

      <Musica/>

      <Portada />

      <Contador />

      <Padres/>

      <Celebracion />

      <Dresscode />

      <Carrusel/>

      <Regalos />

      <Confirmacion />

      <FinalBoda/>
    </div>
  );
}