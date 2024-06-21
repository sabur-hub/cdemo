import React, { useState, useEffect } from "react";
import Select from "react-select";
import optionsData from "./data2.json"; // Подставьте путь к вашему файлу JSON

const MyComponent1 = ({ onSelectChange }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setOptions(optionsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (selectedOption) => {
    console.log("MyComponent1 selected option:", selectedOption); // Добавляем лог выбранной опции
    setSelectedOption(selectedOption);
    onSelectChange(selectedOption);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={handleSelectChange}
      placeholder={"Озмунҳо"}
    />
  );
};

export default MyComponent1;
