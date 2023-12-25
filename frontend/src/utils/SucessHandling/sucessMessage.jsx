import Swal from "sweetalert2"

const style = "style={}"

export const sucessMessage = message => {
    return ( 
        Swal.fire({
        icon: 'success',
        html: `<p style="color: green; font-size: 1.7rem;">${message}</p>`,
        timer: 850,
        showConfirmButton: false
      })
    )
}
