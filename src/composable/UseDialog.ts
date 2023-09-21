import { Dialog } from 'quasar'
import useNotify from 'src/composable/UseNotify';

const { notifySuccess } = useNotify()


export default function useDialog() {



  const notifyConfirmar = (titulo: string, mensagem: string, callback?: () => Promise<void>) => {

    return Dialog.create({
      html: true,
      title: titulo,
      message: mensagem,
      cancel: true,
      persistent: true
    }).onOk(() => {
      if (callback) {
        callback().then(() => {
          notifySuccess('Este registro foi removido.')

        }).catch((error) => {
          notifySuccess('Ops! Algo deu errado.' + error.response.data[0].mensagem);

        });
      }
    })
  }



  return {
    notifyConfirmar,

  }
}
