import React, { useEffect } from 'react'
import { Form, Input, message } from "antd"
import { Link, useNavigate } from 'react-router-dom'
import axios from"axios"

const Register = () => {

    const naviagte = useNavigate()

    const submitHandler = async (values)=>{
        console.log(values);
        try{
           await axios.post('/users/register',values)
           message.success("registeration Success")
           naviagte("/login")
        } catch (error) {
            message.error("invalid username or password")
        }
        
    }

    useEffect(()=>{
        if(localStorage.getItem("user")){
            naviagte("/")
        }
    },[naviagte])

  return (
    <div className='register-page'>
      
      <Form layout='vertical' onFinish={submitHandler}>
        <h2>Register Page</h2>
        <Form.Item label="name" name={"name"}> 
            <Input  />
        </Form.Item>
        <Form.Item label="Email" name={"email"}> 
            <Input  />
        </Form.Item>
        <Form.Item label="password" name={"password"}> 
            <Input  />
        </Form.Item>
        <div className='d-flex'>
            <Link to={"/login"}>alredy register</Link>
            <button>Register</button>
        </div>
      </Form>
    </div>
  )
}

export default Register
