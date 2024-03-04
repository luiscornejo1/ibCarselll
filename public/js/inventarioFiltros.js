if ($('#main_autoDisponible').length > 0) {
    const sBtn_limpiar = document.querySelector('.sBtn-limpiar'),
        filtro_inventario = document.querySelector('.filtro-inventario'),
        optionsMenu = document.querySelectorAll('.select-menu'),
        selectsRange = document.querySelectorAll('.select-range')

    sBtn_limpiar.addEventListener('click', () => {
        optionsMenu.forEach(optionMenu => {
            const sBtn_text_default = optionMenu.querySelector('.sBtn-text-default'),
                sBtn_text = optionMenu.querySelector('.sBtn-text')
            sBtn_text.innerText = sBtn_text_default.innerText
            if (optionMenu.classList.contains('active')) {
                optionMenu.classList.remove('active')
            }
        })
        const menu_select_modelo = document.querySelector('#modelo'),
            select_btn = menu_select_modelo.querySelector('.select-btn')
        if (!select_btn.classList.contains('inability')) {
            select_btn.classList.add('inability')
        }
        selectsRange.forEach(selectRange => {
            const input_range = selectRange.querySelectorAll('.range-input input'),
                sBtn_text_default = selectRange.querySelectorAll('.sBtn-text-default'),
                sBtn_text = selectRange.querySelectorAll('.sBtn-text'),
                progress = selectRange.querySelector('.slider .progress')
            sBtn_text[0].innerText = sBtn_text_default[0].innerText
            sBtn_text[1].innerText = sBtn_text_default[1].innerText
            input_range[0].value = input_range[0].min
            input_range[1].value = input_range[1].max
            progress.style.left = 0 + '%'
            progress.style.right = 0 + '%'
        })
        list_car()
    })

    function cambiar_vista() {
        const breakpoints = [
            window.matchMedia('(max-width: 1060px)'),
            window.matchMedia('(max-width: 992px)'),
        ]
        breakpoints.forEach(breakpoint => {
            breakpoint.addListener(e => {
                if (e.matches) {
                    pages_section.forEach(page_section => {
                        if (!page_section.classList.contains('grid')) {
                            page_section.classList.add('grid')
                        }
                    })
                }
            })
        })
        const option__list = document.querySelector('.options__list'),
            option__grid = document.querySelector('.options__grid'),
            pages_section = document.querySelectorAll('.page-section')
        option__list.addEventListener('click', () => {
            pages_section.forEach(page_section => {
                if (page_section.classList.contains('grid')) {
                    page_section.classList.remove('grid')
                }
            })
        })
        option__grid.addEventListener('click', () => {
            pages_section.forEach(page_section => {
                if (!page_section.classList.contains('grid')) {
                    page_section.classList.add('grid')
                }
            })
        })
    }

    /*Logica que evita que dos selects se presionen a la vez*/

    optionsMenu.forEach(optionMenu => {
        optionMenu.addEventListener('click', () => {
            const optionMenuActive = optionMenu
            optionsMenu.forEach(optionMenuTrue => {
                if (optionMenuTrue.classList.contains('active')) {
                    if (optionMenuTrue.id != optionMenuActive.id) {
                        optionMenuTrue.classList.remove('active')
                    }
                }
            })
        })
    })

    function get_modelo() {
        const menu_select_marca = document.querySelector('#marca')
        menu_select_marca.addEventListener('click', () => {
            if (select_menu(menu_select_marca)) {
                const menu_select_modelo = document.querySelector('#modelo'),
                    default_marca = menu_select_marca
                        .querySelector('.sBtn-text')
                        .innerText.toLowerCase(),
                    select_btn = menu_select_modelo.querySelector('.select-btn'),
                    funcion = 'get_modelo'
                console.log('LA MARCA DEFAULT ES:',default_marca)
                $.ajax({
                    url: 'model/vehiculoList.php',
                    type: 'POST',
                    data: {
                        funcion: funcion,
                        default_marca: default_marca,
                    },
                    success: function (response) {
                        let tasks = JSON.parse(response),
                            template = `
                            
                        <li class="option"><span class="option-text">Modelo</span></li>
                            
                            
                            `
                            console.log(response)
                        tasks.forEach(task => {
                            template += `
                                <li class="option"><span class="option-text">${task.modelo}</span></li>
                            `
                        })
                        $('#option_model').html(template)
                        if (tasks.length > 0) {
                            if (select_btn.classList.contains('inability')) {
                                select_btn.classList.remove('inability')
                                list_car()
                            }
                        } else {
                            if (!select_btn.classList.contains('inability')) {
                                select_btn.classList.add('inability')
                                menu_select_modelo.querySelector('.sBtn-text').innerText = 'Modelo';
                                list_car()
                            }
                        }
                    },
                })
            }
        })
    }
    get_modelo()
    /*funcion que despliega las opciones el select y reescribe el texto del seleccionado al div select*/
    let prevMarca = '#';
    function Desplegar(id) {
        const optionMenu = document.querySelector(id),
            options = optionMenu.querySelectorAll('.option'),
            select_btn = optionMenu.querySelector('.select-btn'),
            sBtn_text = optionMenu.querySelector('.sBtn-text')
        if (!select_btn.classList.contains('inability')) {
            optionMenu.classList.toggle('active')
            ///selectBtn.addEventListener("click",() => );

            options.forEach(option => {
                option.addEventListener('click', () => {
                    let selectedOption = option.querySelector('.option-text').innerText
                    sBtn_text.innerText = selectedOption
                    optionMenu.classList.remove('active')
                    if(id === '#marca' && sBtn_text.innerText != prevMarca){
                        const modeloTxt = document.querySelector('#modeloTxt')
                        modeloTxt.innerText = 'Modelo'
                        prevMarca = sBtn_text.innerText;
                    } 

                    list_car()
                })
            })
        }
    }
    /*logica de funcionamiento del select-range año, precio , kilometraje*/

    selectsRange.forEach(selectRange => {
        selectRange.addEventListener('mouseover', e => {
            const progress = selectRange.querySelector('.slider .progress'),
                rangeInput = selectRange.querySelectorAll('.range-input input'),
                select_menu = selectRange.querySelector('.select-range-output'),
                sBtn_text = selectRange.querySelectorAll('.sBtn-text')
            id = select_menu.id
            rangeInput.forEach(input => {
                input.addEventListener('input', e => {
                    let minVal = parseInt(rangeInput[0].value),
                        maxVal = parseInt(rangeInput[1].value)
                    let gap = 0
                    switch (true) {
                        case rangeInput[0].max < 100:
                            gap = 1
                            break
                        case rangeInput[0].max < 1000:
                            gap = 10
                            break
                        case rangeInput[0].max < 10000:
                            gap = 100
                            break
                        case rangeInput[0].max < 100000:
                            gap = 1000
                            break
                        case rangeInput[0].max < 1000000:
                            gap = 10000
                            break
                        case rangeInput[0].max < 10000000:
                            gap = 100000
                            break
                    }

                    if (maxVal - minVal < gap) {
                        if (e.target.className === 'range-min') {
                            rangeInput[0].value = maxVal - gap
                        } else {
                            rangeInput[1].value = minVal + gap
                        }
                    } else {
                        if (id === 'anio') {
                            sBtn_text[0].innerText = minVal + 2000
                            sBtn_text[1].innerText = maxVal + 2000
                        } else {
                            if (id === 'precio') {
                                sBtn_text[0].innerText = '$' + minVal
                                sBtn_text[1].innerText = '$' + maxVal
                            } else {
                                sBtn_text[0].innerText = minVal
                                sBtn_text[1].innerText = maxVal
                            }
                        }

                        progress.style.left = (minVal / rangeInput[0].max) * 100 + '%'
                        progress.style.right =
                            100 - (maxVal / rangeInput[1].max) * 100 + '%'
                    }
                    list_car()
                })
            })
        })
    })

    /*funcion que imprime la lista de autos*/
    $(document).ready(list_car())
    /*funcion que verfica si el valor del select corresponde a sus opciones para identificar si se ha realizado un select*/
    function select_menu(elemento) {
        const select = elemento.querySelector('.sBtn-text'),
            options = elemento.querySelectorAll('.option')
        for (const option of options) {
            if (option.innerText == select.innerText) {
                return true
            }
        }
        return false
    }
    /*funcion de busqueda que comprueba el input y compara en cuanto al titulo de las tarjeta de list__group*/
    function search_car(inputSearch) {
        const list_group = document.querySelectorAll('.list__group')
        console.log(list_group)
        list_group.forEach(car_group => {})
        list_group.forEach(group_car => {
            const title = group_car.querySelector('.group__info .group__title')
            input_text = inputSearch.toLowerCase()
            title_text = title.innerText.toLowerCase()
            console.log(input_text, !title_text.includes(input_text), title_text)

            if (!title_text.includes(input_text)) {
                group_car.classList.add('filter')
            }
        })
    }
    /*logica de funcionamiento del div search*/
    const search = document.querySelector('.select-search .select-input'),
        inputSearch = search.querySelector('.sBtn-text'),
        clear = search.querySelector('.sBtn-clear')
    inputSearch.addEventListener('input', e => {
        if (inputSearch.value != '') {
            clear.classList.add('active')
        } else {
            clear.classList.remove('active')
        }
        clear.addEventListener('click', () => {
            inputSearch.value = ''
            clear.classList.remove('active')
            const list_group = document.querySelectorAll('.list__group')
            list_group.forEach(car_group => {
                car_group.classList.remove('filter')
            })
        })
        search_car(inputSearch.value)
    })

    function result_text() {
        const section_page = document.querySelectorAll('.page-section'),
            list_group = document.querySelectorAll('.list__group'),
            list_group_active = document.querySelectorAll(
                '.page-section.exposed .list__group'
            ),
            select_page = document.querySelector('.page-section.exposed'),
            nro_inicio = document.querySelector('#nro_inicio'),
            nro_final = document.querySelector('#nro_final'),
            nro_total = document.querySelector('#nro_total'),
            group__results_text = document.querySelectorAll('.group__results-text')
        if ($('.page-section').length > 0) {
            if (group__results_text[0].classList.contains('hidden')) {
                group__results_text[0].classList.remove('hidden')
            }
            if (!group__results_text[1].classList.contains('hidden')) {
                group__results_text[1].classList.add('hidden')
            }
            if (select_page.id == section_page.length) {
                nro_inicio.innerText = list_group.length - list_group_active.length + 1
                nro_final.innerText = list_group.length
            } else {
                nro_inicio.innerText =
                    select_page.id * list_group_active.length -
                    (list_group_active.length - 1)
                nro_final.innerText = select_page.id * list_group_active.length
            }
            nro_total.innerText = list_group.length
        } else {
            if (group__results_text[1].classList.contains('hidden')) {
                group__results_text[1].classList.remove('hidden')
            }
            if (!group__results_text[0].classList.contains('hidden')) {
                group__results_text[0].classList.add('hidden')
            }
        }
    }

    /*funcion que imprime la lista de autos dependiendo de los filtros que haya en pantalla*/
    function list_car() {
        var default_condicion = '',
            default_marca = '',
            default_modelo = '',
            default_carroceria = '',
            default_anio_min = 0,
            default_anio_max = 2023,
            default_transmision = '',
            default_combustible = '',
            default_traccion = '',
            default_departamento = '',
            default_precio_min = 0,
            default_precio_max = 50000,
            default_kilometraje_min = 0,
            default_kilometraje_max = 500000,
            default_order = 'id_vehiculo ASC',
            default_limit = 6
        funcion = 'listar'

        const e_condicion = document.querySelector('#condicion'),
            e_marca = document.querySelector('#marca'),
            e_modelo = document.querySelector('#modelo'),
            e_carroceria = document.querySelector('#carroceria'),
            e_anio = document.querySelectorAll('#anio .sBtn-text'),
            e_transmision = document.querySelector('#transmision'),
            e_combustible = document.querySelector('#combustible'),
            e_traccion = document.querySelector('#traccion'),
            e_departamento = document.querySelector('#departamentos'),
            e_precio = document.querySelectorAll('#precio .sBtn-text'),
            e_kilometraje = document.querySelectorAll('#kilometraje .sBtn-text'),
            e_order = document.querySelector('#order .sBtn-text')

        if (select_menu(e_condicion)) {
            default_condicion = e_condicion.querySelector('.sBtn-text').innerText === 'Condicion' ? '' : e_condicion.querySelector('.sBtn-text').innerText;
        }
        if (select_menu(e_marca)) {
            default_marca = e_marca.querySelector('.sBtn-text').innerText === 'Marca' ? '' :  e_marca.querySelector('.sBtn-text').innerText;
        }
        if (select_menu(e_carroceria)) {
            default_carroceria = e_carroceria.querySelector('.sBtn-text').innerText === 'Carroceria' ? '' : e_carroceria.querySelector('.sBtn-text').innerText;
        }
        if (select_menu(e_modelo)) {
            default_modelo = e_modelo.querySelector('.sBtn-text').innerText === 'Modelo' ? '' :  e_modelo.querySelector('.sBtn-text').innerText
        }
        if (select_menu(e_transmision)) {
            default_transmision = e_transmision.querySelector('.sBtn-text').innerText === 'Transmision' ? '' : e_transmision.querySelector('.sBtn-text').innerText
        }
        if (select_menu(e_combustible)) {
            default_combustible = e_combustible.querySelector('.sBtn-text').innerText === 'Combustible' ? '' : e_combustible.querySelector('.sBtn-text').innerText
        }
        if (select_menu(e_traccion)) {
            default_traccion = e_traccion.querySelector('.sBtn-text').innerText === 'Traccion' ? '' : e_traccion.querySelector('.sBtn-text').innerText
        }
        if (select_menu(e_departamento)) {
            default_departamento = e_departamento.querySelector('.sBtn-text').innerText === 'Departamentos' ? '' : e_departamento.querySelector('.sBtn-text').innerText
        }
        const precio_min = e_precio[0].innerText.slice(1)
        const precio_max = e_precio[1].innerText.slice(1)
        default_precio_min = parseInt(precio_min)
        default_precio_max = parseInt(precio_max)
        const anio_min = e_anio[0].innerText
        const anio_max = e_anio[1].innerText
        default_anio_min = parseInt(anio_min)
        default_anio_max = parseInt(anio_max)
        const kilometraje_min = e_kilometraje[0].innerText
        const kilometraje_max = e_kilometraje[1].innerText
        default_kilometraje_min = parseInt(kilometraje_min)
        default_kilometraje_max = parseInt(kilometraje_max)
        switch (e_order.innerText) {
            case 'Precio ascendiente':
                default_order = 'preciovista DESC'
                break
            case 'Precio descendiente':
                default_order = 'preciovista ASC'
                break
            case 'Año ascendiente':
                default_order = 'fecha_fabricacion DESC'
                break
            case 'Año descendiente':
                default_order = 'fecha_fabricacion ASC'
                break
        }

        $.ajax({
            url: 'model/vehiculoList.php',
            type: 'POST',
            data: {
                default_condicion: default_condicion,
                default_marca: default_marca,
                default_modelo: default_modelo,
                default_carroceria: default_carroceria,
                default_anio_min: default_anio_min,
                default_anio_max: default_anio_max,
                default_transmision: default_transmision,
                default_combustible: default_combustible,
                default_traccion: default_traccion,
                default_departamento: default_departamento,
                default_precio_min: default_precio_min,
                default_precio_max: default_precio_max,
                default_kilometraje_min: default_kilometraje_min,
                default_kilometraje_max: default_kilometraje_max,
                default_order: default_order,
                default_limit: default_limit,
                funcion: funcion,
            },
            success: function (response) {
                let tasks = JSON.parse(response)
                let template = ''
                let paginacion = ''

                const nro_elxpag = 6,
                    nro_el = tasks.length
                var pagina = 1
                for (i = 0; i < nro_el; i += nro_elxpag) {
                    const filter = tasks.slice(i, i + nro_elxpag)
                    if (screen.width <= 992) {
                        if (pagina == 1) {
                            template += `<div class="page-section  grid exposed" id="${pagina}" >`
                        } else {
                            template += `<div class="page-section  grid hidden" id="${pagina}">`
                        }
                    } else {
                        if (pagina == 1) {
                            template += `<div class="page-section exposed" id="${pagina}" >`
                        } else {
                            template += `<div class="page-section hidden" id="${pagina}">`
                        }
                    }
                    filter.forEach(task => {
                        template += `
                        <div class="list__group">
                            <a href="detalles-auto-${task.id}?id=${
                            task.id
                        }" style="text-decoration:none" ><div class="group__image" style="background-image: url(${
                            'views/images/imagenes_vehiculos/' +
                            task.id +
                            '/principal.jpg'
                        }),
                            url(${
                                'views/images/imagenes_vehiculos/' +
                                task.id +
                                '/principal.png'
                            }),url(${'views/images/imagenes_vehiculos/nofoto.jpg'})">
                            </div></a>
                            <div class="group__info">
                                <div class="group__title">
                                    <div class="item__title">
                                        ${
                                            task.marca +
                                            ' ' +
                                            task.modelo +
                                            ' ' +
                                            task.fecha_fabricacion
                                        }
                                    </div>
                                    <div class="item__price">
                                        <span class="item__price-text">${
                                            '$ ' + task.precio
                                        }</span>
                                    </div>
                                </div>
                                <div class="group__detail">
                                    <div class="item__detail" id="kilometraje">
                                        <div rel="icon" type="image/png" class="item__detail-icon" style="background-image:url(views/images/icon/speedometer.png);"></div>
                                        <span class="item__detail-title">Kilometraje</span>
                                        <span class="item__detail-text">${
                                            task.kilometraje + ' km'
                                        }</span>
                                    </div>
                                    <div class="item__detail">
                                        <div rel="icon" type="image/png" class="item__detail-icon" style="background-image:url(views/images/icon/gas-station.png);"></div>
                                        <span class="item__detail-title">Combustible</span>
                                        <span class="item__detail-text">${
                                            task.combustible
                                        }</span>
                                    </div>
                                    <div class="item__detail">
                                        <div rel="icon" type="image/png" class="item__detail-icon" style="background-image:url(views/images/icon/gearshift.png);"></div>
                                        <span class="item__detail-title">Transmision</span>
                                        <span class="item__detail-text">${
                                            task.transmision
                                        }</span>
                                    </div>
                                    <div class="item__detail item__detail__anio">
                                        <div rel="icon" type="image/png" class="item__detail-icon" style="background-image:url(views/images/icon/calendar.png);"></div>
                                        <span class="item__detail-title">año</span>
                                        <span class="item__detail-text">${
                                            task.fecha_fabricacion
                                        }</span>
                                    </div>
                                </div>
                            </div>
                        </div>       
                        `
                    })
                    template += `</div>`
                    pagina += 1
                }
                $('#list__car').html(template)

                const nro_paginas = Math.ceil(nro_el / nro_elxpag)
                if (nro_paginas > 1) {
                    paginacion += `<ul>
                                <li class="page-control prev disabled">
                                    <a class="page-link" href="#">Anterior</a>
                                </li>`

                    for (j = 1; j <= nro_paginas; j++) {
                        if (j == 1) {
                            paginacion += `<li class="page-item active"><a class="page-link" href="#${j}"><span class="page-text">${j}</span></a></li>`
                        } else {
                            paginacion += `<li class="page-item"><a class="page-link" href="#${j}"><span class="page-text">${j}</span></a></li>`
                        }
                    }
                    paginacion += `<li class="page-control next active">
                                        <a class="page-link" href="#2">Siguiente</a>
                                    </li>
                                    </ul>`
                }
                $('#paginacion').html(paginacion)
            },
        }).then(() => {
            cambiar_vista()
            var items_page = document.querySelectorAll('.page-item'),
                section_page = document.querySelectorAll('.page-section'),
                items_control = document.querySelectorAll('.page-control'),
                items_control_link = document.querySelectorAll('.page-control .page-link')

            result_text()

            items_page.forEach((item_page, index) => {
                const item_link = item_page.querySelector('.page-link')
                item_link.addEventListener('click', () => {
                    if (!item_page.classList.contains('active')) {
                        const item_page_disabled =
                                document.querySelector('.page-item.active'),
                            section_page_disabled = document.querySelector(
                                '.page-section.exposed'
                            )
                        item_page_disabled.classList.remove('active')
                        section_page_disabled.classList.remove('exposed')
                        section_page_disabled.classList.add('hidden')
                        item_page.classList.add('active')
                        section_page[index].classList.remove('hidden')
                        section_page[index].classList.add('exposed')
                        if (index == 0) {
                            items_control[0].classList.add('disabled')
                            items_control[0].classList.remove('active')
                            items_control_link[0].href = '#'
                        } else {
                            items_control[0].classList.remove('disabled')
                            items_control[0].classList.add('active')
                            items_control_link[0].href = '#' + String(index)
                        }
                        if (index == section_page.length - 1) {
                            items_control[1].classList.add('disabled')
                            items_control[1].classList.remove('active')
                            items_control_link[1].href = '#'
                        } else {
                            items_control[1].classList.remove('disabled')
                            items_control[1].classList.add('active')
                            items_control_link[1].href = '#' + String(index + 2)
                        }
                    }
                    result_text()
                })
            })
            items_control_link.forEach(item_control => {
                item_control.addEventListener('click', () => {
                    var section_page_disabled = document.querySelector(
                            '.page-section.exposed'
                        ),
                        id = parseInt(section_page_disabled.id)
                    items_page[id - 1].classList.remove('active')
                    if (item_control.innerText == 'Anterior') {
                        section_page_disabled.classList.remove('exposed')
                        section_page_disabled.classList.add('hidden')
                        section_page[id - 2].classList.remove('hidden')
                        section_page[id - 2].classList.add('exposed')
                        id = id - 1
                    } else {
                        section_page_disabled.classList.remove('exposed')
                        section_page_disabled.classList.add('hidden')
                        section_page[id].classList.remove('hidden')
                        section_page[id].classList.add('exposed')
                        id = id + 1
                    }
                    items_page[id - 1].classList.add('active')
                    if (id == 1) {
                        items_control[0].classList.add('disabled')
                        items_control[0].classList.remove('active')
                        items_control_link[0].href = '#'
                    } else {
                        items_control[0].classList.remove('disabled')
                        items_control[0].classList.add('active')
                        items_control_link[0].href = '#' + String(id)
                    }
                    if (id == section_page.length) {
                        items_control[1].classList.add('disabled')
                        items_control[1].classList.remove('active')
                        items_control_link[1].href = '#'
                    } else {
                        items_control[1].classList.remove('disabled')
                        items_control[1].classList.add('active')
                        items_control_link[1].href = '#' + String(id)
                    }
                    result_text()
                })
            })
        })
    }
}
