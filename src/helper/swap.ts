import Swal, { SweetAlertResult } from "sweetalert2"; 

class SwapMensagem {



    public static alertaConfirmacao(titulo: string, mensagem: string, callback: () => Promise<void>) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",

            },
            buttonsStyling: false,
        });

        swalWithBootstrapButtons.fire({
            title: titulo,
            html: mensagem,
            icon: "warning",
            showCancelButton: true,

            cancelButtonText: "Não",
            confirmButtonText: "Sim",
            reverseButtons: false,
        })
            .then((result) => {
                onExcluirConfirmado(result, swalWithBootstrapButtons, callback);
            });

    }



}
export default SwapMensagem;


function onExcluirConfirmado(result: SweetAlertResult<any>, swalWithBootstrapButtons: typeof Swal, callback: () => Promise<void>) {
    if (result.isConfirmed) {


        callback().then(() => {
            swalWithBootstrapButtons.fire(
                'Sucesso!',
                'Este registro foi removido.',
                'success'
            )
        }).catch((error) => {
            swalWithBootstrapButtons.fire(
                'Ops! Algo deu errado.',
                error.response.data[0].mensagem,
                'error'
            )
        });



    }

}