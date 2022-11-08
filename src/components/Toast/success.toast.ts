import Swal from "sweetalert2"

export const showGenericToast = async (props : any)=>{
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      })
      return await Toast.fire({
        icon: props.icon,
        title: props.title
      })
 }