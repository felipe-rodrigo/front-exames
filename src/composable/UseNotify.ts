import { Notify  } from 'quasar'
export default function useNotify () {
  

  const notifySuccess = (message: string) => {
   
    Notify.create({
      type: 'positive',
      message: message || 'All right !'
    })
  }

  const notifyError = (message: string) => {
    console.log(message);
    Notify.create({
      type: 'negative',
      message: message || 'Failed !'
    })
  }

  return {
    notifySuccess,
    notifyError
  }
}
