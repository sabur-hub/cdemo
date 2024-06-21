import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import "../adduser/add.css";
import toast from "react-hot-toast";
import MyComponent from "../AddData/MyComponent";
import MyComponent1 from "../AddData/MyComponent1";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [achievements1, setAchievements1] = useState({});
  const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [selectedOption3, setSelectedOption3] = useState(null);
  const [selectedOption4, setSelectedOption4] = useState(null);
  const [selectedOption5, setSelectedOption5] = useState(null);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`http://193.57.210.140:8000/api/getone/${id}`)
      .then((response) => {
        console.log(response);
        setUser({ ...response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    const achievementsUpdate = {
      maktab: achievements1.maktab || null,
      ozmun: achievements1.ozmun || null,
      other1: selectedOption1 ? selectedOption1.label : null,
      other2: selectedOption2 ? selectedOption2.label : null,
      other3: selectedOption3 ? selectedOption3.label : null,
      other4: selectedOption4 ? selectedOption4.label : null,
      other5: selectedOption5 ? selectedOption5.label : null,
    };

    const userData = {
      ...user,
      achievements: [...(user.achievements || []), achievementsUpdate],
    };

    console.log("Data to be sent to the backend:", userData); // Лог перед отправкой данных
    await axios
      .put(`http://193.57.210.140:8000/api/update/${id}`, userData)
      .then((response) => {
        toast.success(response.data.msg, { position: "top-right" });
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const options = [
    { value: "Математика", label: "Математика" },
    { value: "Физика", label: "Физика" },
    { value: "Химия", label: "Химия" },
    { value: "Биология", label: "Биология" },
    { value: "География", label: "География" },
    { value: "Информатика", label: "Информатика" },
  ];
  const options1 = [
    { value: "Забони тоҷики", label: "Забони тоҷики" },
    { value: "Забон  ва адабиёти тоҷик ", label: "Забон  ва адабиёти тоҷик" },
    { value: "Забони Русси ", label: "Забони Русси" },
    { value: "Забон ва адабиёти Рус", label: "Забон ва адабиёти Рус" },
    { value: "Забони англиси", label: "забони англиси" },
    { value: "Таърих", label: "Таърих" },
    { value: "Ҳуқуқ  ", label: "Ҳуқуқ" },
  ];
  const options2 = [
    { value: "5-6 ", label: "5-6 " },
    { value: "7-8  ", label: "7-8 " },
    { value: "9-10 ", label: "9-10" },
    { value: "9-10(якачин)", label: "9-10(якачин)" },
    { value: "11", label: "11" },
  ];
  const options3 = [
    { value: "Ноҳиявӣ", label: "Ноҳиявӣ" },
    { value: "Шаҳрӣ", label: "Шаҳрӣ" },
    { value: "Ҷумҳуриявӣ", label: "Ҷумҳуриявӣ" },
  ];
  const options4 = [
    { value: "Шохмот", label: "Шохмот" },
    { value: "Spealing bee ", label: "Spealing bee " },
  ];

  return (
    <div className="addUser">
      <Link to={"/"} className={"addButton"}>
        Ба қафо
      </Link>
      <h3>навсозӣ</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fname">ном</label>
          <input
            type="text"
            value={user.fname || ""}
            onChange={inputChangeHandler}
            id="fname"
            name="fname"
            autoComplete="off"
            placeholder="ном"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">насаб</label>
          <input
            type="text"
            value={user.lname || ""}
            onChange={inputChangeHandler}
            id="lname"
            name="lname"
            autoComplete="off"
            placeholder="насаб"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Номер</label>
          <input
            type="text"
            value={user.email || ""}
            onChange={inputChangeHandler}
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Email"
          />
        </div>
        <label htmlFor="select1">Муассиса</label>
        <MyComponent
          onSelectChange={(selectedOption) => {
            setAchievements1((prev) => ({
              ...prev,
              maktab: selectedOption.label,
            }));
          }}
        />
        <label htmlFor="select1">Озмун</label>
        <MyComponent1
          onSelectChange={(selectedOption) => {
            setAchievements1((prev) => ({
              ...prev,
              ozmun: selectedOption.label,
            }));
          }}
        />
        <div className="inputGroup">
          <label htmlFor="select1">Фаннҳои олимпи фаннҳои табби риёзи</label>
          <Select
            id="select1"
            value={selectedOption1}
            onChange={setSelectedOption1}
            options={options}
            placeholder="Фанни риёзи"
            isSearchable
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="select2">Фаннҳои ҷамъияти гуманитарӣ</label>
          <Select
            id="select2"
            value={selectedOption2}
            onChange={setSelectedOption2}
            options={options1}
            placeholder="Фанни гуманитари"
            isSearchable
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="select3">Олимпиадаи фанни барои синфи:</label>
          <Select
            id="select3"
            value={selectedOption3}
            onChange={setSelectedOption3}
            options={options2}
            placeholder="Синф"
            isSearchable
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="select4">Даври озмун</label>
          <Select
            id="select4"
            value={selectedOption4}
            onChange={setSelectedOption4}
            options={options3}
            placeholder="Даврҳои озмун"
            isSearchable
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="select5">Олимпиада</label>
          <Select
            id="select5"
            value={selectedOption5}
            onChange={setSelectedOption5}
            options={options4}
            placeholder="Олимпиадаҳо"
            isSearchable
          />
        </div>
        <div className="inputGroup">
          <button type="submit">навсозӣ</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
