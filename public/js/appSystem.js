function getModelo(funcion_vista){
    const default_id_marca = this.document.querySelector("#marca").value;
    if(default_id_marca>0){
        $.ajax({
            url: '../../../model/vehiculoList.php',
            type: 'POST',
            data: {
                funcion : "get_modelo",
                default_id_marca : default_id_marca
            },
            success: function(response){
                let tasks = JSON.parse(response),
                        template = '';
                if(funcion_vista=="show_inSelect"){
                    tasks.forEach(task=>{
                        template += `<option value="${task.id_modelo}">${task.modelo}</option>`
                    })
                    
                }else if(funcion_vista=="show_inTable"){
                    template += `<tr>
                                    <th>ID</th>
                                    <th>Nombre Modelo</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                    `;
                    tasks.forEach(task=>{
                        template += ` 
                        <tr>
                            <td>${task.id_modelo}</td>
                            <td>${task.modelo}</td>
                            <td><a href="editarmodelo.php?id=${task.id_modelo}>"><i class="bi bi-pencil-fill"></i></a></td>
                            <td></td>
                        </tr>`
                    })
                }
                $('#modelo').html(template);
            }
            
        }) 
    }else{
        template = '';  
        $('#modelo').html(template);
    }   
}

var preciovista = document.querySelector('#preciovista');
const currency = function(number){
    return new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD', minimumFractionDigits: 2}).format(number);
};

if($("#preciovista").length>0){
    preciovista.addEventListener("keyup",()=>{
        
        console.log(currency(preciovista.value));
    })
    
}