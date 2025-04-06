import { useState } from 'react';
import { z } from 'zod';

export const useFormRegister = (schema, initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    try {
      const fieldData = { [name]: value };
      
      const fieldSchema = z.object({
        [name]: schema.shape[name]
      });
      
      fieldSchema.parse(fieldData);
      
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
      
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldError = err.errors.find(e => e.path[0] === name);
        if (fieldError) {
          setErrors(prev => ({
            ...prev,
            [name]: fieldError.message
          }));
        }
        return false;
      }
      return true;
    }
  };

  const validateForm = () => {
    try {
      schema.parse(values);
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors = {};
        err.errors.forEach(error => {
          const [field] = error.path;
          newErrors[field] = error.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleChange = (name, value) => {
    setValues(prev => {
      const newValues = { 
        ...prev, 
        [name]: value 
      };
      
      if (touched[name]) {
        validateField(name, value);
      }
      
      return newValues;
    });
  };

  const handleBlur = (name) => {
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    validateField(name, values[name]);
  };

  const reset = (newValues = initialValues) => {
    setValues(newValues);
    setErrors({});
    setTouched({});
  };

  const handleSubmit = (onSubmit) => {
    return (e) => {
      if (e) e.preventDefault();
      
      const allTouched = Object.keys(values).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {});
      
      setTouched(allTouched);
      
      const isValid = validateForm();
      
      if (isValid) {
        onSubmit(values);
      }
    };
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    validateField,
    validateForm,
    isValid: Object.keys(errors).length === 0
  };
};

export default useFormRegister;