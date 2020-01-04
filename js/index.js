// Responsive vertical-line class 

$(document).ready(function () {
    $('.vertical-line').removeClass('d-none');
});

$(window).resize(function(){     

    if ($(window).width() < 768 ){

        $('.vertical-line').addClass('d-none');

    }else{
        $('.vertical-line').removeClass('d-none');
    }

});

// Select Element Rule Function
$.validator.addMethod("valueNotEquals", function(value, element, arg){
    return arg != value;
}, "Value must not equal arg.");

// Forzar descarga de un archivo
function SaveToDisk(fileURL, fileName) {
    // para navegadores que no son IE
    if (!window.ActiveXObject) {
        var save = document.createElement('a');
        save.href = fileURL;
        save.target = '_blank';
        save.download = fileName || 'unknown';

        var evt = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': false
        });
        save.dispatchEvent(evt);

        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }

    // para IE < 11
    else if ( !! window.ActiveXObject && document.execCommand)     {
        var _window = window.open(fileURL, '_blank');
        _window.document.close();
        _window.document.execCommand('SaveAs', true, fileName || fileURL)
        _window.close();
    }
}

// Registration Form Validation
$(document).ready(function(){

    var validator = $('#itsystems-form1').validate({
            rules:{
            txtNom:{
                required:true
            },
            txtTelf:{
                required:true,
                digits:true,
                minlength: 7
            },
            txtNroDoc:{
                required:true,
                digits:true
            },
            txtEmpresa:{
                required: true
            },
            txtEmail:{
                required:true,
                email: true
            },
            txtCargo:{
                required:true
            },
            selTipoDoc:{
                valueNotEquals: "default"
            },
            chkAuto:{
                required: true
            }
        },
        messages:{
            txtNom:{
                required:"Ingrese sus nombres completos"
            },
            txtTelf:{
                required: "Ingrese su numero telefonico",
                digits: "Ingrese solo numeros",
                minlength: "Minimo 7 caracteres"
            },
            txtNroDoc:{
                required: "Ingrese numero de su documento de identidad",
                digits: "Ingrese solo numeros"
            },
            txtEmpresa:{
                required: "Ingrese el nombre de la empresa en la que pertenece"
            },
            txtEmail:{
                required:"Ingrese su Correo electrónico",
                email:"Correo invalido"
            },
            txtCargo:{
                required:"Ingrese su cargo"
            },
            selTipoDoc:{
                valueNotEquals: "Selecciona un tipo de documento"
            },
            chkAuto:{
                required: "Este campo es obligatorio"
            }
        },
        errorPlacement: function( label, element ) {
            if( element.attr( "name" ) === "audience[]" || element.attr( "name" ) === "event_services[]" ) {
                element.parent().append( label ); // this would append the label after all your checkboxes/labels (so the error-label will be the last element in <div class="controls"> )
            } else {
                label.insertBefore( element ); // standard behaviour
            }
        }
        ,
        submitHandler: function(form) {
            // Mientras carga el envio se bloquea el boton y luego realiza la animacion de carga.
            $('.btn-enviar').attr('disabled', 'true');
            $('.btn-enviar')
            .append('<span id="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');

            // Variables para el envio
            var nombre = $('#itsystems-form1').find('input[name="txtNom"]').val();
            var telf = $('#itsystems-form1').find('input[name="txtTelf"]').val();
            var nroDoc = $('#itsystems-form1').find('input[name="txtNroDoc"]').val();
            var empresa = $('#itsystems-form1').find('input[name="txtEmpresa"]').val();
            var email = $('#itsystems-form1').find('input[name="txtEmail"]').val();
            var cargo = $('#itsystems-form1').find('input[name="txtCargo"]').val();
            var tipoDoc = $('#itsystems-form1').find('select[name="selTipoDoc"]').val();

            // Nombre del temario
            var temario = "Temario RPA - ROBOTIZACION PROCESOS";

            $.ajax({
                url: '',
                type: 'POST',
                // TODO: Cambiar los valores por el formulario actual 
                data: {
                    "entry.20737030": nombre,
                    "entry.1412086532": email,
                    "entry.1444273475": telf,
                    "entry.900012785": cargo,
                    "entry.1086137710": tipoDoc,
                    "entry.1991317504": nroDoc,
                    "entry.64693255": empresa
                },
                success: function(data) {
                    console.log(data);
                    // Remover la etiqueta loading del botón Enviar
                    $('#loading').remove();
                    // Eliminar el bloque completo de ambos formularios
                    $('.after-post').remove();
                    // Deshabilitar el atributo disabled del botón Enviar
                    $('.btn-enviar').attr('disabled', 'false');
                    // Ejecutar la impresión de PDF 
                    SaveToDisk("files/"+ temario +".pdf", temario);
                    var src_icon = 'img/icons/exito.png';
                    var mensaje = 'Se envió el mensaje con éxito.';
                    $('.response').append("<img class='mx-auto pt-6' src='"+ src_icon +"'>");
                    $('.response').append("<h4 class='mx-auto text-white text-center'>"+mensaje+"</h4>");
                    $('.response')
                    .append("<p class='mx-auto text-center text-white'>Se descargará el temario del curso.</p>");
                    $('.response')
                    .append("<p class='mx-auto pb-6 text-center text-white'>Si no se descarga el archivo, haga click <a target='_blank' href='files/"+temario+".pdf'>Aquí</a>.</p>");
                    // Clear the form
					validator.resetForm();
                },
                error: function (e) {
                    console.log(e);
                }            
            });
            return false;
        }
    });

    var validator2 = $('#itsystems-form2').validate({
            rules:{
            txtNom2:{
                required:true
            },
            txtTelf2:{
                required:true,
                digits:true,
                minlength: 7
            },
            txtNroDoc2:{
                required:true,
                digits:true
            },
            txtEmpresa2:{
                required: true
            },
            txtEmail2:{
                required:true,
                email: true
            },
            txtCargo2:{
                required:true
            },
            selTipoDoc2:{
                valueNotEquals: "default"
            },
            chkAuto2:{
                required: true
            }
        },
        messages:{
            txtNom2:{
                required:"Ingrese sus nombres completos"
            },
            txtTelf2:{
                required: "Ingrese su numero telefonico",
                digits: "Ingrese solo numeros",
                minlength: "Minimo 7 caracteres"
            },
            txtNroDoc2:{
                required: "Ingrese numero de su documento de identidad",
                digits: "Ingrese solo numeros"
            },
            txtEmpresa2:{
                required: "Ingrese el nombre de la empresa en la que pertenece"
            },
            txtEmail2:{
                required:"Ingrese su Correo electrónico",
                email:"Correo invalido"
            },
            txtCargo2:{
                required:"Ingrese su cargo"
            },
            selTipoDoc2:{
                valueNotEquals: "Selecciona un tipo de documento"
            },
            chkAuto2:{
                required: "Este campo es obligatorio"
            }
        },
        errorPlacement: function( label, element ) {
            if( element.attr( "name" ) === "audience[]" || element.attr( "name" ) === "event_services[]" ) {
                element.parent().append( label ); // this would append the label after all your checkboxes/labels (so the error-label will be the last element in <div class="controls"> )
            } else {
                label.insertBefore( element ); // standard behaviour
            }
        }
        ,
        submitHandler: function(form) {
            // Mientras carga el envio se bloquea el boton y luego realiza la animacion de carga.
            $('.btn-enviar').attr('disabled', 'true');
            $('.btn-enviar')
            .append('<span id="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');

            // Variables para el envio
            var nombre = $('#itsystems-form2').find('input[name="txtNom2"]').val();
            var telf = $('#itsystems-form2').find('input[name="txtTelf2"]').val();
            var nroDoc = $('#itsystems-form2').find('input[name="txtNroDoc2"]').val();
            var empresa = $('#itsystems-form2').find('input[name="txtEmpresa2"]').val();
            var email = $('#itsystems-form2').find('input[name="txtEmail2"]').val();
            var cargo = $('#itsystems-form2').find('input[name="txtCargo2"]').val();
            var tipoDoc = $('#itsystems-form2').find('select[name="selTipoDoc2"]').val();

            // Nombre del temario
            var temario = "Temario RPA - ROBOTIZACION PROCESOS";

            $.ajax({
                url: '',
                type: 'POST',
                // TODO: Cambiar los valores por el formulario actual 
                data: {
                    "entry.20737030": nombre,
                    "entry.1412086532": email,
                    "entry.1444273475": telf,
                    "entry.900012785": cargo,
                    "entry.1086137710": tipoDoc,
                    "entry.1991317504": nroDoc,
                    "entry.64693255": empresa
                },
                success: function(data) {
                    console.log(data);
                    // Remover la etiqueta loading del botón Enviar
                    $('#loading').remove();
                    // Eliminar el bloque completo de ambos formularios
                    $('.after-post').remove();
                    // Deshabilitar el atributo disabled del botón Enviar
                    $('.btn-enviar').attr('disabled', 'false');
                    // Ejecutar la impresión de PDF 
                    SaveToDisk("files/"+ temario +".pdf", temario);
                    var src_icon = 'img/icons/exito.png';
                    var mensaje = 'Se envió el mensaje con éxito.';
                    $('.response').append("<img class='mx-auto pt-6' src='"+ src_icon +"'>");
                    $('.response').append("<h4 class='mx-auto text-white text-center'>"+mensaje+"</h4>");
                    $('.response')
                    .append("<p class='mx-auto text-center text-white'>Se descargará el temario del curso.</p>");
                    $('.response')
                    .append("<p class='mx-auto pb-6 text-center text-white'>Si no se descarga el archivo, haga click <a target='_blank' href='files/"+temario+".pdf'>Aquí</a>.</p>");
                    // Clear the form
                    validator2.resetForm();
                },
                error: function (e) {
                    console.log(e);
                }            
            });
            return false;
        }
    });
});

