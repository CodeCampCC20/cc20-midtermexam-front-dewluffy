import * as Yup from 'yup'

export const schemaTodo = Yup.object({
  taskName: Yup.string().required("Task is required"),
})