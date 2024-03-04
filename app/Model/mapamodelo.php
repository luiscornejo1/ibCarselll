<?php
require_once "conexion.php";

/* class ModeloMapa{
    
    static public function mdlLocalizacion(){

        $stmt= Conexion::Conectar()->prepare("SELECT map.id_localizacion,map.imagen_lugar,map.latitud,map.longitud,d.direccion, i.area_terreno, i.area_construida,i.numero_ambientes,i.numero_banos,tp.Propiedad,dtr.nom_distrito FROM Localizacion_Inmueble map 
        INNER JOIN Direccion d ON map.id_direccion = d.id_direccion
        INNER JOIN Inmueble i ON i.id_direccion = d.id_direccion
        INNER JOIN Tipo_Propiedad tp ON tp.id_propiedad = i.id_propiedad
        INNER JOIN Distrito dtr ON dtr.id_distrito = i.id_distrito;");
        $stmt->execute();
        $resultado = $stmt->fetchAll();
        return $resultado;
    }
} */
?>