import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./AddData1.css"; 

const AddData2 = () => {
  const [formData, setFormData] = useState({
    value: "",
    label: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://193.57.210.140:9000/api/add2", formData); // Измените URL на вашу конечную точку
      toast.success("Данните бомуваффақият сохраншуд");
    } catch (error) {
      console.error(error);
      toast.error("Дар ҷои таъминкунии донешодани маълумот хато рух дод");
    }
  };

  return (
    <div className="addData1Container">
      <h2>Дохилкунии Озмун</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="value"
          placeholder="Введите значение"
          value={formData.value}
          onChange={handleChange}
          className="inputField"
        />
        <input
          type="text"
          name="label"
          placeholder="Введите метку"
          value={formData.label}
          onChange={handleChange}
          className="inputField"
        />
        <button type="submit" className="hh">
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default AddData2;
