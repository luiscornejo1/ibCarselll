<?php 
    include('conexion.php');
    $bd =new Conexion();
    $con =$bd->conectar();
    

    $funcion = $_POST['funcion'];

    if ($funcion =="listar"){
        $default_condicion = $_POST['default_condicion'];
        $default_marca = $_POST['default_marca'];
        $default_modelo = $_POST['default_modelo'];
        $default_carroceria = $_POST['default_carroceria'];
        $default_anio_min = $_POST['default_anio_min'];
        $default_anio_max = $_POST['default_anio_max'];
        $default_transmision = $_POST['default_transmision'];
        $default_combustible = $_POST['default_combustible'];
        $default_traccion = $_POST['default_traccion'];
        $default_departamento = $_POST['default_departamento'];
        $default_precio_min = $_POST['default_precio_min'];
        $default_precio_max = $_POST['default_precio_max'];
        $default_kilometraje_min = $_POST['default_kilometraje_min'];
        $default_kilometraje_max = $_POST['default_kilometraje_max'];
        $default_order = $_POST['default_order'];
        $default_limit = $_POST['default_limit']; 

        $sql = $con->prepare("SELECT id_vehiculo, marca, modelo, preciovista,fecha_fabricacion,
        kilometrajevista, transmision, combustible, traccion, ubicacion, condicion, carroceria
        FROM VEHICULO 
        inner join MARCA on VEHICULO.id_marca=MARCA.id_marca 
        inner join MODELO on VEHICULO.id_modelo=MODELO.id_modelo
        inner join TRANSMISION on VEHICULO.id_transmision=TRANSMISION.id_transmision
        inner join COMBUSTIBLE on VEHICULO.id_combustible=COMBUSTIBLE.id_combustible
        inner join TRACCION on VEHICULO.id_traccion=TRACCION.id_traccion
        inner join UBICACION on VEHICULO.id_ubicacion=UBICACION.id_ubicacion
        inner join CONDICION on VEHICULO.id_condicion=CONDICION.id_condicion
        inner join CARROCERIA on VEHICULO.id_carroceria=CARROCERIA.id_carroceria
        WHERE 
        condicion LIKE '%$default_condicion%' AND
        marca LIKE '%$default_marca%' AND
        modelo LIKE '%$default_modelo%' AND
        carroceria LIKE '%$default_carroceria%' AND
        transmision LIKE '%$default_transmision%' AND
        combustible LIKE '%$default_combustible%' AND
        traccion LIKE '%$default_traccion%' AND
        ubicacion LIKE '%$default_departamento%' AND
        preciovista BETWEEN $default_precio_min AND $default_precio_max AND
        kilometrajevista BETWEEN $default_kilometraje_min AND $default_kilometraje_max AND
        fecha_fabricacion BETWEEN $default_anio_min AND $default_anio_max
        ORDER BY $default_order
        ");
        $sql->execute();
        $resultado=$sql->fetchAll(PDO::FETCH_ASSOC);
        $json = array();
        foreach($resultado as $row){
            $json[] = array(
                'id' => $row['id_vehiculo'],
                'marca' => $row['marca'],
                'modelo' => $row['modelo'],
                'precio' => $row['preciovista'],
                'fecha_fabricacion' => $row['fecha_fabricacion'],
                'kilometraje' => $row['kilometrajevista'],
                'transmision' => $row['transmision'],
                'combustible' => $row['combustible'],
                'traccion' => $row['traccion'],
                'ubicacion' => $row['ubicacion'],
                'condicion' => $row['condicion']
            );
        }   
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
    elseif ($funcion =="get_modelo"){
        if(isset($_POST['default_marca'])){
            // $default_marca = $_POST['default_marca'];
            // $sql = $con->prepare("SELECT id_modelo, modelo, marca
            // FROM MODELO 
            // inner join MARCA on MODELO.id_marca=MARCA.id_marca
            // WHERE
            // marca LIKE '%$default_marca%'"); 
            $default_marca = $_POST['default_marca'];
            $sql = $con->prepare("SELECT DISTINCT md.id_modelo, md.modelo, marca FROM MODELO md inner join MARCA on md.id_marca = MARCA.id_marca inner join VEHICULO vh on md.id_modelo = vh.id_modelo WHERE
            marca LIKE '%$default_marca%'"); 
        }    
        else if(isset($_POST['default_id_marca'])){
            $default_id_marca = $_POST['default_id_marca'];
            $sql = $con->prepare("SELECT id_modelo, modelo, marca
            FROM MODELO 
            inner join MARCA on MODELO.id_marca=MARCA.id_marca
            WHERE
            MODELO.id_marca = $default_id_marca") ;
        }

       
        $sql->execute();
        $resultado=$sql->fetchAll(PDO::FETCH_ASSOC);
        $json = array();
        foreach($resultado as $row){
            $json[] = array(
                'id_modelo' => $row['id_modelo'],
                'modelo' => $row['modelo'],
                'marca' => $row['marca']
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
    elseif ($funcion == "vista_inicio"){
        $default_limit = $_POST['default_limit'];
        $sql = $con->prepare("SELECT id_vehiculo, marca, modelo, preciovista,fecha_fabricacion,kilometrajevista, transmision, combustible
        FROM VEHICULO 
        inner join MARCA on VEHICULO.id_marca=MARCA.id_marca 
        inner join MODELO on VEHICULO.id_modelo=MODELO.id_modelo
        inner join TRANSMISION on VEHICULO.id_transmision=TRANSMISION.id_transmision
        inner join COMBUSTIBLE on VEHICULO.id_combustible=COMBUSTIBLE.id_combustible
        order by id_vehiculo desc
        limit $default_limit");
        $sql->execute();
        $resultado=$sql->fetchAll(PDO::FETCH_ASSOC);
        $json = array();
        foreach($resultado as $row){
            $json[] = array(
                'id' => $row['id_vehiculo'],
                'marca' => $row['marca'],
                'modelo' => $row['modelo'],
                'precio' => $row['preciovista'],
                'fecha_fabricacion' => $row['fecha_fabricacion'],
                'kilometraje' => $row['kilometrajevista'],
                'transmision' => $row['transmision'],
                'combustible' => $row['combustible'],
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
    elseif ($funcion == "subir_registro"){
        $response = array(
            'status' => 1,
        );
        $placa=$_POST['placa'];
        $comentario=$_POST['comentario'];
        $id_marca=$_POST['id_marca'];
        $id_modelo=$_POST['id_modelo'];
        $cilindros=$_POST['cilindros'];
        $cilindrada=$_POST['cilindrada'];
        $puertas=$_POST['puertas'];
        $preciovista=$_POST['preciovista'];
        $kilometrajevista=$_POST['kilometrajevista'];
        $fecha_fabricacion=$_POST['fecha_fabricacion'];
        $fecha_modelo=$_POST['fecha_modelo'];
        $id_carroceria=$_POST['id_carroceria'];
        $id_transmision=$_POST['id_transmision'];
        $id_combustible=$_POST['id_combustible'];
        $id_traccion=$_POST['id_traccion'];
        $id_ubicacion=$_POST['id_ubicacion'];
        $id_condicion=$_POST['id_condicion'];
        
        $sql="INSERT INTO VEHICULO (placa, comentario, id_marca, id_modelo, cilindros, cilindrada, puertas, preciovista, kilometrajevista,
        fecha_fabricacion, fecha_modelo, id_carroceria, id_transmision, id_combustible, id_traccion, id_ubicacion, id_condicion) 
        VALUES('$placa','$comentario','$id_marca','$id_modelo','$cilindros','$cilindrada','$puertas',
        '$preciovista','$kilometrajevista','$fecha_fabricacion','$fecha_modelo','$id_carroceria','$id_transmision','$id_combustible',
        '$id_traccion','$id_ubicacion','$id_condicion')";

        /* Validación de datos */
        $placa_regex =  "/^[A-Z0-9]{3}[\-]{1}[A-Z0-9]{3}$/";
        $comentario_regex = "/^[a-zA-Z0-9]{0,280}$/";

        if(!empty($placa) && !empty($id_marca) && !empty($id_modelo) && !empty($cilindros) && !empty($cilindrada) && !empty($puertas) && !empty($preciovista)
         && !empty($kilometrajevista) && !empty($fecha_fabricacion) && !empty($fecha_modelo) && !empty($id_carroceria) && !empty($id_transmision) && !empty($id_combustible)
         && !empty($id_traccion) && !empty($id_ubicacion) && !empty($id_condicion)){

            if(is_numeric($cilindrada) && is_numeric($cilindros) && is_numeric($puertas) && is_numeric($preciovista) && is_numeric($kilometrajevista) && is_numeric($fecha_fabricacion) 
            && is_numeric($fecha_modelo) && is_numeric($id_marca) && is_numeric($id_modelo) && is_numeric($id_carroceria) && is_numeric($id_transmision)
            && is_numeric($id_combustible) && is_numeric($id_traccion) && is_numeric($id_ubicacion) && is_numeric($id_condicion)){

                if($kilometrajevista <=500000 && $preciovista<=50000 && $fecha_fabricacion>=2010 && $fecha_fabricacion <= date("Y") 
                && $fecha_modelo>=2010 && $fecha_modelo <= date("Y") && strlen($cilindros)<=2 && strlen($puertas)<=2){
                    
                    if(preg_match($placa_regex,$placa) && preg_match($comentario_regex,$comentario)){
                        $sqlregistro = $con->prepare($sql);
                        $sqlregistro->execute();
                        $response['status'] = 0;
                    }else{
                        $response['status'] = 1;
                    }
                    
                            
                }else{
                    $response['status'] = 1;
                }

                
            }else{
                $response['status'] = 1;
            }    
            
        }else{
            $response['status'] = 1;
        }
        echo json_encode($response);
    }

?>
    
