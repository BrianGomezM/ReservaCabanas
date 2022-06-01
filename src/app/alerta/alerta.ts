import Swal from 'sweetalert2'

declare var $: any;
export class AlertMessage{

    constructor() { }
    error(titulo: string, texto: string, icono:any){
        Swal.fire({
            icon: icono,
            title: titulo,
            text: texto,
            confirmButtonColor: '#3085d6',
            timer: 2000,
            confirmButtonText:'Aceptar',
          })
    }
    correcto(titulo: string, texto: string){
      Swal.fire({
        icon: 'success',
        title: titulo,
        text: texto,
        showConfirmButton: false,
        timer: 2000
      })
    }
    eliminarRegistros(titulo: string, texto: string):any{     
      var respuesta =false;
        Swal.fire({
            title: titulo,
            text: texto,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, bórralo'
          }).then((result) => {
            if (result.value) {
              Swal.fire(
                'Eliminado!',
                'El registro seleccionado fue eliminado correctamente.',
                'success') 
                respuesta= true;
            }else{
              respuesta= false;
            }
          }); 
    }


    notificacionExito(from, align, opcion, titulo, mesanje){
        const type = ['success','danger'];
        const color = opcion;
        $.notify({
            icon: titulo,
            message: mesanje
        },{
            type: type[color],
            timer: 2000,
            placement: {
                from: from,
                align: align
            },
            template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
              '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
              '<i class="material-icons" data-notify="icon">notifications</i> ' +
              '<span data-notify="title">{1}</span> ' +
              '<span data-notify="message">{2}</span>' +
              '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
              '</div>' +
              '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
    }

}