import { api } from 'boot/axios'

export default function useApi (url: string) {

  const list = async () => {
    try {
      const { data } = await api.get(url)
      return data

    } catch (error: any) {
      throw new Error(error)
    }
  }

  const getById = async (id: number) => {
    try {
      const { data } = await api.get(`${url}/${id}`)
      return data

    } catch (error: any) {
      throw new Error(error)
    }
  }

  const post = async (form: any, headers: any) => {

    try {
      const { data } = await api.post(url, form)
      return data

    } catch (error: any) {
      throw new Error(error)
    }
  }

  const update = async (form: any) => {

    try {

      const { data } = await api.put(`${url}/${form.id}`, form)
      return data

    } catch (error: any) {
      throw new Error(error)
    }
  }

  const remove = async (id:any) => {
    try {
      const { data } = await api.delete(`${url}/${id}`)

      return data

    } catch (error: any) {

      throw new Error(error)

    }

  }

  return {
    list,
    post,
    update,
    remove,
    getById
  }
}
