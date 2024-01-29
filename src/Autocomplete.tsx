import React, { useState, ChangeEvent } from "react";
import "./Autocomplete.scss";
import { useFilterData } from "./hooks/useFilterData";

interface AutoCompleteProps<T> {
  data: T[];
  loading: boolean;
  error?: string;
  onSelect: (value: string) => void;
}

const AutoComplete = <T extends { title: string; id: number }>({
  onSelect,
  data,
  loading,
  error,
}: AutoCompleteProps<T>) => {
  const [inputValue, setInputValue] = useState<string>("");
  const filteredData = useFilterData(data, inputValue);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleItemClick = (index: number) => {
    onSelect(filteredData[index].title);
    setInputValue("");
  };

  return (
    <div className="autocomplete">
      <input
        className="autocomplete-input"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        !!inputValue.length &&
        !!filteredData.length && (
          <ul className="autocomplete-list">
            {filteredData.map((item: T, index: number) => (
              <li
                key={index}
                className="autocomplete-list-item"
                onClick={() => handleItemClick(index)}
              >
                {item.title.toLowerCase().includes(inputValue.toLowerCase()) ? (
                  <>
                    {item.title.substring(
                      0,
                      item.title.toLowerCase().indexOf(inputValue.toLowerCase())
                    )}
                    <strong>{inputValue}</strong>
                    {item.title.substring(
                      item.title
                        .toLowerCase()
                        .indexOf(inputValue.toLowerCase()) + inputValue.length
                    )}
                  </>
                ) : (
                  item.title
                )}
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
};

export default AutoComplete;
