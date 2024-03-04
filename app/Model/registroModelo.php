<?php
require_once "conexion.php";


class ModeloRegistro
{
    static public function registraUsuario($tabla, $nombre, $apellido, $email, $password)
    {
        try {
            $stmt = Conexion::Conectar()->prepare("INSERT INTO $tabla (nombres, apellidos, correo, contrasena) VALUES (:nombre, :apellido, :email, :passwd)");


            $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
            $stmt->bindParam(':apellido', $apellido, PDO::PARAM_STR);
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);
            $stmt->bindParam(':passwd', $password, PDO::PARAM_STR);

            return $stmt->execute();
        } catch (PDOException $th) {
            throw $th;
        }
    }
}
