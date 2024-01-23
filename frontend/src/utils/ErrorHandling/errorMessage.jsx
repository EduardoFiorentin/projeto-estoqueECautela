import Swal from "sweetalert2"

export const errorMessage = message => {
    console.log(message)
    var msg = ''
    message.map(item => msg += item+'<br/>')
    return ( 
        Swal.fire({
        icon: 'error',
        title: 'Erro!',
        html: msg,
      })
    )
}
