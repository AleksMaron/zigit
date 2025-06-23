import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.css';

const schemaUrl = 'https://private-705dcb-formgenerator1.apiary-mock.com/form_fields';

function App() {
  const [schema, setSchema] = useState<any | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const [submitted, setSubmitted] = useState<any | null>(null);

  useEffect(() => {
    fetch(schemaUrl)
      .then((res) => res.json())
      .then(setSchema)
      .catch(console.error);
  }, []);

  const onSubmit = (data: any) => {
    setSubmitted(data);
  };

  const renderField = (field: any, index: number) => {
    const name = field.label.replace(/\s+/g, '_').toLowerCase();
    const rules: any = {};

    if (field.rules?.required?.value) {
      rules.required = field.rules.required.error_message;
    }

    if (field.type === 'input_number') {
      rules.valueAsNumber = true;
      if (field.rules?.min?.value) {
        rules.min = {
          value: field.rules.min.value,
          message: field.rules.min.error_message.replace('{{value}}', field.rules.min.value),
        };
      }
      if (field.rules?.max?.value) {
        rules.max = {
          value: field.rules.max.value,
          message: field.rules.max.error_message.replace('{{value}}', field.rules.max.value),
        };
      }
    } else {
      if (field.rules?.min?.value) {
        rules.minLength = {
          value: field.rules.min.value,
          message: field.rules.min.error_message.replace('{{value}}', field.rules.min.value),
        };
      }
      if (field.rules?.max?.value) {
        rules.maxLength = {
          value: field.rules.max.value,
          message: field.rules.max.error_message.replace('{{value}}', field.rules.max.value),
        };
      }
    }

    if (field.rules?.regex?.value) {
      rules.pattern = {
        value: new RegExp(field.rules.regex.value),
        message: field.rules.regex.error_message,
      };
    }

    const commonProps = {
      ...register(name, rules),
      name,
    };

    switch (field.type) {
      case 'input':
        return (
          <div key={index}>
            <label>{field.label}</label>
            <input type="text" {...commonProps} />
            {errors[name] && <p className="error">{errors[name]?.message as string}</p>}
          </div>
        );
      case 'input_number':
        return (
          <div key={index}>
            <label>{field.label}</label>
            <input type="number" {...commonProps} />
            {errors[name] && <p className="error">{errors[name]?.message as string}</p>}
          </div>
        );
      case 'textarea':
        return (
          <div key={index}>
            <label>{field.label}</label>
            <textarea {...commonProps} />
            {errors[name] && <p className="error">{errors[name]?.message as string}</p>}
          </div>
        );
      case 'select':
        return (
          <div key={index}>
            <label>{field.label}</label>
            <select {...commonProps} defaultValue="">
              <option value="" disabled>
                Select {field.label}
              </option>
              {field.options.map((opt: any) => (
                <option key={opt.value} value={opt.value}>
                  {opt.key}
                </option>
              ))}
            </select>
            {errors[name] && <p className="error">{errors[name]?.message as string}</p>}
          </div>
        );
      default:
        return null;
    }
  };

  if (!schema) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>{schema[0].title}</h2>

      {submitted ? (
        <div className="submitted-data">
          <h3>Submitted Data:</h3>
          <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </div>
      ) : <form onSubmit={handleSubmit(onSubmit)}>
        {schema[0].fields.map((field: any, index: number) => renderField(field, index))}
        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>}
    </div>
  );
}

export default App;