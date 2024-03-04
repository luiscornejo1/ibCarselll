<?php

/*class Conexion
{

    static public function Conectar()
    {
        try {
            $host = "173.212.236.102";
            $user = "jun21codret_user_new";
            $pass = "4qC,ufE!*8)I";
            $bd = "jun21codret_jun21cod_ibcarsell";
            $conexion = new PDO("mysql:host=$host;dbname=$bd", $user, $pass);
            $conexion->exec("set names utf8");
            return $conexion;
        } catch (Exception $e) {
            return die($e->getMessage());
        }
    }
}

/*Conexion al localhost*/
class ConexionPrueba
{

    static public function Conectar()
    {
        try {
            $host = "localhost";
            $user = "root";
            $pass = "";
            $bd = "jun21cod_ibcarsell";
            $conexion = new PDO("mysql:host=$host;dbname=$bd", $user);
            $conexion->exec("set names utf8");
            return $conexion;
        } catch (Exception $e) {
            return die($e->getMessage());
        }
    }
}
