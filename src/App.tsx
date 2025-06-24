import { useState } from 'react';
import './App.css';
import { useFormSchema } from './hooks/useFormSchema';
import { DynamicForm } from './components/DynamicForm';

function App() {
  const schema = useFormSchema();
  const [submitted, setSubmitted] = useState<any>(null);

  if (!schema) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>{schema[0].title}</h2>
      {submitted ? (
        <div className="submitted-data">
          <h3>Submitted Data:</h3>
          <pre>{JSON.stringify(submitted, null, 2)}</pre>
          <button onClick={() => setSubmitted(null)}>Edit</button>
        </div>
      ) : (
        <DynamicForm schema={schema[0].fields} onSubmit={setSubmitted} />
      )}
    </div>
  );
}

export default App;