import { useEffect, useState } from "react";

export const useFilterData = <T extends { title: string; id: number }>(
    data: T[],
    inputValue: string
  ) => {
    const [filteredData, setFilteredData] = useState<T[]>([]);
  
    useEffect(() => {
      const filtered = data
        .filter((item) =>
          item.title.toLowerCase().includes(inputValue.toLowerCase())
        )
        .map((item) => ({ title: item.title, id: item.id } as T));
      setFilteredData(filtered);
    }, [data, inputValue]);
  
    return filteredData;
  };