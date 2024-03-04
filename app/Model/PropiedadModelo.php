<?php
require_once "conexion.php";

class ModeloPropiedad{
    
    static public function mdTipoPropiedad(){

        $stmt= Conexion::Conectar()->prepare("SELECT Propiedad FROM Tipo_Propiedad;");
        $stmt->execute();
        $resultado = $stmt->fetchAll();
        return $resultado;
    }

    static public function mdTipoOperacion(){

        $stmt= Conexion::Conectar()->prepare("SELECT Operacion FROM Tipo_Operacion;");
        $stmt->execute();
        $resultado = $stmt->fetchAll();
        return $resultado;
    }

    static public function mdDepartamento(){

        $stmt= Conexion::Conectar()->prepare("SELECT nom_departamento FROM Departamento;");
        $stmt->execute();
        $resultado = $stmt->fetchAll();              
        return $resultado;    
    }

    static public function mdProvincia($nom){

        $stmt= Conexion::Conectar()->prepare(
            "SELECT pv.nom_provincia,dp.nom_departamento FROM Provincia as pv 
        INNER JOIN Departamento as dp on pv.id_departamento=dp.id_departamento WHERE dp.nom_departamento='$nom';");
        $stmt->execute();
        $resultado = $stmt->fetchAll();              
        return $resultado; 
    }

    static public function mdDistrito($nom){

        $stmt= Conexion::Conectar()->prepare(
            "SELECT pv.nom_provincia,dt.nom_distrito FROM Distrito  as dt 
        INNER JOIN Provincia as pv on dt.id_provincia=pv.id_provincia WHERE pv.nom_provincia='$nom';");
        $stmt->execute();
        $resultado = $stmt->fetchAll();              
        return $resultado; 
    }
}
    
?>