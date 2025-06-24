import type { FormSection } from '../utils/types';
import { useEffect, useState } from 'react';

const schemaUrl = 'https://private-705dcb-formgenerator1.apiary-mock.com/form_fields';

export const useFormSchema = () => {
  const [schema, setSchema] = useState<FormSection[] | null>(null);

  useEffect(() => {
    fetch(schemaUrl)
      .then((res) => res.json())
      .then(setSchema)
      .catch(console.error);
  }, []);

  return schema;
};