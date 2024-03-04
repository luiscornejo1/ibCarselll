<?php

require_once "conexion.php";

class vehiculoModelo
{
    /*static public function ListarFiltros($tablaPrincipal, $tablaSecundaria, $atributo, $atributoUnion)
    {
        if (
            (!isset($tablaSecundaria) ||  $tablaSecundaria == null) &&
            (!isset($atributoUnion)  ||  $atributoUnion == null)
        ) {
            $stmt =  Conexion::Conectar()->prepare(
                "SELECT $tablaPrincipal.$atributo,COUNT(vehiculo.id_vehiculo) 
                AS Cantidad_vehiculos FROM 
                $tablaPrincipal 
                GROUP BY $tablaPrincipal.$atributo"
            );
        } else if ((!isset($tablaPrincipal) ||  $tablaPrincipal == null) &&
            (!isset($atributoUnion)  ||  $atributoUnion == null)
        ) {
            $stmt =  Conexion::Conectar()->prepare(
                "SELECT $tablaSecundaria.$atributo, COUNT(vehiculo.id_vehiculo)
            AS Cantidad_vehiculos FROM 
            vehiculo INNER JOIN Distrito
            ON 
            Inmueble.id_distrito = Distrito.id_distrito
            INNER JOIN 
            Provincia ON
            Provincia.id_provincia = Distrito.id_provincia
            INNER JOIN Departamento
            ON
            Departamento.id_departamento =  Provincia.id_departamento
            GROUP BY $tablaSecundaria.$atributo"
            );
        } else {
            $stmt =  Conexion::Conectar()->prepare(
                "SELECT $tablaSecundaria.$atributo , 
                COUNT(Inmueble.id_inmueble) as 'Cantidad_inmuebles' FROM 
                $tablaPrincipal INNER JOIN $tablaSecundaria 
                ON 
                $tablaPrincipal.$atributoUnion = $tablaSecundaria.$atributoUnion
                GROUP BY $tablaSecundaria.$atributo"
            );
        }
        $stmt->execute();
        $resultado = $stmt->fetchAll();

        return $resultado;
    }

    static public function Listarinmuebles()
    {
        $stmt =  Conexion::Conectar()->prepare(
            "SELECT i.*,d.*,dis.*,tpo.*,tppro.*,dep.*,pro.*,
            CONCAT(dep.nom_departamento, ', ' ,pro.nom_provincia, ', ' ,dis.nom_distrito) AS lugar FROM Inmueble i 
                            INNER JOIN 
                            Tipo_Operacion tpo
                            ON
                            i.id_operacion =  tpo.id_operacion
                            INNER JOIN
                            Tipo_Propiedad tppro
                            ON 
                            tppro.id_propiedad = i.id_propiedad
                            INNER JOIN
                            Distrito dis
                            ON
                            i.id_distrito = dis.id_distrito
                            INNER JOIN
                            Provincia pro
                            ON
                            dis.id_provincia = pro.id_provincia
                            INNER JOIN 
                            Departamento dep
                            ON
                            pro.id_departamento = dep.id_departamento
                            INNER JOIN
                            Imagenes_Inmuebles img
                            ON
                            img.id_imagenes = i.id_imagenes 
                            INNER JOIN Direccion d
                            ON
                            i.id_direccion = d.id_direccion"
                              
        );
        $stmt->execute();
        $resultado = $stmt->fetchAll();

        return $resultado;
    }

    */
    static public function ListarvehiculosInicio()
    {
        $stmt =  Conexion::Conectar()->prepare(
            "SELECT modmarc.*,carrocer.*,transm.*,comb.*,tracc.*,dis.*,dep.*,marca.*,imag.*,prov.*,li.localizacion FROM vehiculo i 
            
            INNER JOIN
                carroceria carrocer
                ON 
                i.id_carroceria = carrocer.id_carroceria

            INNER JOIN
                transmision transm
                ON
                i.id_transmision = transm.id_transmision

            INNER JOIN
                combustible comb
                ON
                i.id_combustible = comb.id_combustible

            INNER JOIN 
                traccion tracc
                ON
                i.id_traccion = tracc.id_traccion

            INNER JOIN
                distrito dis
                ON
                dis.id_distrito = i.id_distrito 

            INNER JOIN 
                departamento dep
                ON
                i.id_departamentos = dep.id_departamento

            INNER JOIN 
                nombre_marca marca
                ON 
                i.id_marca = marca.id_marca
                
            INNER JOIN 
                modelo_marca modmarc
                ON
                i.id_modelo_marca =  modmarc.id_modelo_marca and modmarc.idmarca = marca.id_marca
    

            INNER JOIN 
                imagenes_vehiculos imag
                ON 
                i.id_imagenes = imag.id_imagenes

            INNER JOIN
                provincia prov
                on
                prov.id_departamento = dep.id_departamento


            ORDER BY i.id_vehiculo"
        );
        $stmt->execute();
        $resultado = $stmt->fetchAll();

        return $resultado;
    }


    /*
    static public function ListarDistritoInicio($distrito)
    {
        $stmt =  Conexion::Conectar()->prepare(
            "SELECT i.*,d.*,dis.*,tpo.*,tppro.*,li.localizacion FROM Inmueble i 
            INNER JOIN 
            Tipo_Operacion tpo
            ON
            i.id_operacion =  tpo.id_operacion
            INNER JOIN
            Tipo_Propiedad tppro
            ON 
            tppro.id_propiedad = i.id_propiedad
            INNER JOIN
            Distrito dis
            ON
            i.id_distrito = dis.id_distrito
            INNER JOIN
            Provincia pro
            ON
            dis.id_provincia = pro.id_provincia
            INNER JOIN 
            Departamento dep
            ON
            pro.id_departamento = dep.id_departamento
            INNER JOIN
            Imagenes_Inmuebles img
            ON
            img.id_imagenes = i.id_imagenes 
            INNER JOIN Direccion d
            ON
            i.id_direccion = d.id_direccion
            INNER JOIN Localizacion_Inmueble li
            ON d.id_direccion = li.id_direccion
            WHERE dis.nom_distrito = '$distrito'
            ORDER BY i.id_inmueble"
        );
        $stmt->execute();
        $resultado = $stmt->fetchAll();

        return $resultado;
    }
    static public function ListarImagenesInmuebles($id_inmueble)
    {
        $stmt =  Conexion::Conectar()->prepare(
            "SELECT i.id_inmueble,gi.ruta,gi.nombre
            FROM Inmueble i
            INNER JOIN
            Imagenes_Inmuebles img
            ON
            i.id_imagenes = img.id_imagenes
            INNER JOIN Galleria_Imagenes gi
            ON
            img.id_imagenes  = gi.id_imagenes
            where i.id_inmueble = $id_inmueble"
        );
        $stmt->execute();
        $resultado = $stmt->fetchAll();

        return $resultado;
    }
    static public function Filtrarinmuebles($tipo_operacion, $tipo_propiedad, $departamentos, $dormitorios, $baños, $precio, $area, $preMayor, $preMenor, $areaTerrenoMin, $areaTerrenoMax, $Lugar, $distrito)
    {
        $sql = "SELECT i.*,d.*,dis.*,tpo.*,tppro.*,dep.*,pro.*,
        CONCAT(dep.nom_departamento, ', ' ,pro.nom_provincia, ', ' ,dis.nom_distrito) AS lugar FROM Inmueble i 
                        INNER JOIN 
                        Tipo_Operacion tpo
                        ON
                        i.id_operacion =  tpo.id_operacion
                        INNER JOIN
                        Tipo_Propiedad tppro
                        ON 
                        tppro.id_propiedad = i.id_propiedad
                        INNER JOIN
                        Distrito dis
                        ON
                        i.id_distrito = dis.id_distrito
                        INNER JOIN
                        Provincia pro
                        ON
                        dis.id_provincia = pro.id_provincia
                        INNER JOIN 
                        Departamento dep
                        ON
                        pro.id_departamento = dep.id_departamento
                        INNER JOIN
                        Imagenes_Inmuebles img
                        ON
                        img.id_imagenes = i.id_imagenes 
                        INNER JOIN Direccion d
                        ON
                        i.id_direccion = d.id_direccion
                          WHERE i.id_inmueble >= 1";

        if ($tipo_operacion != null) {
            $sql .= " AND tpo.Operacion = '$tipo_operacion'";
        }
        if ($tipo_propiedad != null) {
            $sql .= " AND tppro.Propiedad = '$tipo_propiedad'";
        }
        if ($departamentos != null) {
            $sql .= " AND dep.nom_departamento = '$departamentos'";
        }
        if ($dormitorios != null) {
            $sql .= " AND i.numero_ambientes = '$dormitorios'";
        }
        if ($baños != null) {
            $sql .= " AND i.numero_banos = '$baños'";
        }
        if ($precio != null) {
            $sql .= " AND i.precio < $precio";
        }
        if ($area != null) {
            $sql .= " AND i.area_terreno < $area";
        }
        if ($preMayor != null && $preMenor != null) {
            $sql .= " AND i.precio BETWEEN $preMenor AND $preMayor";
        }
        if ($areaTerrenoMin != null && $areaTerrenoMax != null) {
            $sql .= " AND i.area_terreno BETWEEN '$areaTerrenoMin' AND '$areaTerrenoMax'";
        }
        if ($Lugar != null) {
            $sql .= " AND CONCAT(dep.nom_departamento, ',' ,pro.nom_provincia, ',' ,dis.nom_distrito)
            LIKE '%$Lugar%'";
        }
        if ($distrito != null) {
            $sql .= " AND dis.nom_distrito = '$distrito'";
        }
        $stmt =  Conexion::Conectar()->prepare($sql);
        $stmt->execute();
        $resultado = $stmt->fetchAll();
        return  $resultado;
    }
    static public function ListarinmueblesXid($cod)
    {
        $stmt = Conexion::Conectar()->prepare(
            "SELECT i.*,d.*,dis.*,tpo.*,tppro.*,dep.*,pro.*,v.*,ni.*,
            CONCAT(dep.nom_departamento, ', ' ,pro.nom_provincia, ', ' ,dis.nom_distrito) AS lugar ,li.localizacion
             FROM Inmueble i 
                INNER JOIN 
                Tipo_Operacion tpo
                ON
                i.id_operacion =  tpo.id_operacion
                INNER JOIN
                Tipo_Propiedad tppro
                ON 
                tppro.id_propiedad = i.id_propiedad
                INNER JOIN
                Distrito dis
                ON
                i.id_distrito = dis.id_distrito
                INNER JOIN
                Provincia pro
                ON
                dis.id_provincia = pro.id_provincia
                INNER JOIN 
                Departamento dep
                ON
                pro.id_departamento = dep.id_departamento
                INNER JOIN
                Imagenes_Inmuebles img
                ON
                img.id_imagenes = i.id_imagenes 
                INNER JOIN Direccion d
                ON
                i.id_direccion = d.id_direccion
                INNER JOIN Vendedor v 
                ON 
                i.id_vendedor = v.id_vendedor
                INNER JOIN Nombre_Inmueble ni
                ON
                i.id_inmueble = ni.id_inmueble
                INNER JOIN Localizacion_Inmueble li
                ON d.id_direccion = li.id_direccion
                WHERE i.id_inmueble = $cod"
        );
        $stmt->execute();
        $resultado = $stmt->fetchAll();
        return  $resultado;
    }*/
}
?>