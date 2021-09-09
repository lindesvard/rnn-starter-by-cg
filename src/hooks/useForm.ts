import { FormikConfig, FormikValues, useFormik } from 'formik'

export function useForm<T extends FormikValues = FormikValues>(args: FormikConfig<T>) {
  const form = useFormik(args)
  return {
    ...form,
    props: (name: string, cb?: (value: string) => void) => ({
      onChangeText: (value: string) => {
        form.setFieldValue(name, value)
        if (typeof cb === 'function') {
          cb(value)
        }
      },
      value: form.values[name],
    }),
  }
}
