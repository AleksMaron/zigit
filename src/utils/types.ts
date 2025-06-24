export type Field = {
  type: 'input' | 'input_number' | 'textarea' | 'select';
  label: string;
  rules: {
    required?: { value: boolean; error_message: string };
    min?: { value: number; error_message: string };
    max?: { value: number; error_message: string };
    regex?: { value: string; error_message: string };
  };
  options?: { key: string; value: string }[];
};

export type FormSection = {
  title: string;
  fields: Field[];
};