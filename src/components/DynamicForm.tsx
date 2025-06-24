import type { Field } from '../utils/types';
import { useForm } from 'react-hook-form';
import { getFieldRules } from '../utils/validationRules';

type Props = {
  schema: Field[];
  onSubmit: (data: any) => void;
};

export const DynamicForm = ({ schema, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const renderField = (field: Field, index: number) => {
    const name = field.label.replace(/\s+/g, '_').toLowerCase();
    const rules = getFieldRules(field);
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
                Select {field.label.toLowerCase()}
              </option>
              {field.options?.map((opt) => (
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {schema.map(renderField)}
      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};