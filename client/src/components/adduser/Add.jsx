import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "./add.css";
import toast from 'react-hot-toast';


const Add = () => {

  const users = {
    fname:"",
    lname:"",
    email:"",
    password:"",
  }

  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  const inputHandler = (e) =>{
      const {name, value} = e.target;
      setUser({...user, [name]:value});
  }

  const submitForm = async(e) =>{
    e.preventDefault();
    await axios.post("http://193.57.210.140:8000/api/create", user)
    .then((response)=>{
       toast.success(response.data.msg, {position:"top-right"})
       navigate("/")
    })
    .catch(error => console.log(error))
  }


  return (
    <div className='addUser'>
        <Link className={'hh'} to={"/"}>ба қафо</Link>
        <h3>Довталаби навро дохил кунед</h3>
        <form className='addUserForm' onSubmit={submitForm}>
            <div className="inputGroup">
                <label htmlFor="fname">Ном</label>
                <input type="text" onChange={inputHandler} id="fname" name="fname" autoComplete='off' placeholder='ном' />
            </div>
            <div className="inputGroup">
                <label htmlFor="lname">Насаб</label>
                <input type="text" onChange={inputHandler} id="lname" name="lname" autoComplete='off' placeholder='насаб' />
            </div>
            <div className="inputGroup">
                <label htmlFor="text">Номер</label>
                <input type="text" onChange={inputHandler} id="email" name="email" autoComplete='off' placeholder='+992...' />
            </div>
            <div className="inputGroup">
                <label htmlFor="password">Саннаи таваллуд</label>
                <input type="date" onChange={inputHandler} id="password" name="password" autoComplete='off' placeholder='Санаи таваллуд' />
            </div>
            <div className="inputGroup">
                <button type="submit">Дохилкунии довталаб</button>
            </div>
        </form>
    </div>
  )
}

export default Add