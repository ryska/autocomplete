import { useState } from "react";
import "./App.scss";
import AutoComplete from "./Autocomplete";
import { useFetchBooks } from "./hooks/useFetchBooks";

function App() {
  const [results, setResults] = useState<string[]>([]);
  const { books, loading } = useFetchBooks();

  const handleAutocompleteResults = (value: string) => {
    setResults((prev) => [...prev, value]);
  }

  return (
    <div className="App">
      <h3>Select books to read:</h3>
      <ul>
        {results.map((result, idx) => (
          <li key={idx}>{result}</li>
        ))}
      </ul>
      <AutoComplete
        data={books}
        loading={loading}
        onSelect={handleAutocompleteResults}
      />
    </div>
  );
}

export default App;
