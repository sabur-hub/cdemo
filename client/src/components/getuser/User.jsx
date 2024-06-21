import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./user.css";
import { Link } from "react-router-dom";
import AddData1 from "../AddData/AddData1";
import AddData2 from "../AddData/AddData2";

const User = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery1, setSearchQuery1] = useState(""); // Для первого поиска
  const [searchQuery2, setSearchQuery2] = useState(""); // Для второго поиска
  const [searchQuery3, setSearchQuery3] = useState(""); // Для второго поиска

  const [showAddData1, setShowAddData1] = useState(false);
  const [showAddData2, setShowAddData2] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://193.57.210.140:8000/api/getall");
      setUsers(response.data);
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://193.57.210.140:8000/api/delete/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      toast.success("Довталаб бомуваффақият нест карда шуд", {
        position: "top-right",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch1 = (event) => {
    setSearchQuery1(event.target.value);
  };

  const handleSearch2 = (event) => {
    setSearchQuery2(event.target.value);
  };

  const handleSearch3 = (event) => {
    setSearchQuery3(event.target.value);
  };

  // Фильтрация пользователей по обоим поисковым запросам
  const filteredUsers = users.filter(
    (user) =>
      user.fname.toLowerCase().includes(searchQuery1.toLowerCase()) &&
      user.lname.toLowerCase().includes(searchQuery2.toLowerCase()) &&
      user.password.toLowerCase().includes(searchQuery3.toLowerCase())
  );

  return (
    <div className="userTable">
      <div className={"block"}>
        <Link to={"/add"} className="addButton">
          Дохилкунии Довталаб
        </Link>
        <h1>МТИ</h1>
        <input
          className={"SearchInput"}
          type="text"
          placeholder="Ҷустуҷу аз рӯйи ном"
          value={searchQuery1}
          onChange={handleSearch1}
        />
        <input
          className={"SearchInput"}
          type="text"
          placeholder="Ҷустуҷу аз рӯйи насаб"
          value={searchQuery2}
          onChange={handleSearch2}
        />
        <input
          className={"SearchInput"}
          type="date"
          placeholder="Ҷустуҷу аз рӯйи сину сол"
          value={searchQuery3}
          onChange={handleSearch3}
        />
      </div>
      <div className="show">
        <div>
          <button onClick={() => setShowAddData1(true)} className="hh">
            Дохилкунии Муассиса
          </button>
        </div>
        <div>
          <button onClick={() => setShowAddData2(true)} className="hh">
            Дохилкунии Озмун
          </button>
        </div>
      </div>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>рақам.No.</th>
            <th>Ном</th>
            <th>Насаб</th>
            <th>Санаи таваллуд</th>
            <th>номер телфон</th>
            <th>Амалҳо</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.fname}</td>
              <td>{user.lname}</td>
              <td>{user.password}</td>
              <td>{user.email}</td>
              <td className="actionButtons">
                <button onClick={() => deleteUser(user._id)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
                <Link to={`/edit/${user._id}`}>
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddData1 && (
        <div className="modal">
          <div className="modal-content addData1Container">
            <span className="close" onClick={() => setShowAddData1(false)}>
              &times;
            </span>
            <AddData1 />
          </div>
        </div>
      )}

      {showAddData2 && (
        <div className="modal">
          <div className="modal-content addData2Container">
            <span className="close" onClick={() => setShowAddData2(false)}>
              &times;
            </span>
            <AddData2 />
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
