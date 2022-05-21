export const formValidate = () => {
  return {
    required: {
        value: true,
        message: 'Obligatory field'
      },
      patternEmail: {
        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'Formato de email incorrecto'
      },
      minLength: {
        value: 6,
        message: 'Min 6 characters'
      },
      validateTrim: {
        trim: (v) => {
          if (!v.trim()) return "No dejes espacios en blanco";
          true;
        },
      },
      validateEquals(values) {
        return{
            equals: 
                (v) => v === values || 'Password should match'
            }
        } 
    }
}
