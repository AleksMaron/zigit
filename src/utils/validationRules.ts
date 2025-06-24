import type { Field } from '../utils/types';

const getErrorMessage = (template: string, value: any): string =>
  template.replace('{{value}}', String(value));

export const getFieldRules = (field: Field): any => {
  const rules: any = {};

  if (field.rules?.required?.value) {
    rules.required = field.rules.required.error_message;
  }

  if (field.type === 'input_number') {
    rules.valueAsNumber = true;

    if (field.rules?.min?.value) {
      rules.min = {
        value: field.rules.min.value,
        message: getErrorMessage(field.rules.min.error_message, field.rules.min.value),
      };
    }
    if (field.rules?.max?.value) {
      rules.max = {
        value: field.rules.max.value,
        message: getErrorMessage(field.rules.max.error_message, field.rules.max.value),
      };
    }
  } else {
    if (field.rules?.min?.value) {
      rules.minLength = {
        value: field.rules.min.value,
        message: getErrorMessage(field.rules.min.error_message, field.rules.min.value),
      };
    }
    if (field.rules?.max?.value) {
      rules.maxLength = {
        value: field.rules.max.value,
        message: getErrorMessage(field.rules.max.error_message, field.rules.max.value),
      };
    }
  }

  if (field.rules?.regex?.value) {
    rules.pattern = {
      value: new RegExp(field.rules.regex.value),
      message: field.rules.regex.error_message,
    };
  }

  return rules;
};