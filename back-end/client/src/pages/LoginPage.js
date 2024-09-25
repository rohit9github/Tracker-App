import React, { useEffect } from 'react'
import { Form, Input, message } from "antd"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'

const LoginPage = () => {

    const navigate = useNavigate()

    const submitHandler = async (values)=>{
        try {
         const {data} = await axios.post('/users/login',values)    
         message.success("login success");
         localStorage.setItem("user",JSON.stringify({...data.user,Password:''}))
         navigate("/")
        } catch (error) {
            message.error("something wrong")
        }
        
    }

    useEffect(()=>{
        if(localStorage.getItem("user")){
            navigate("/")
        }
    },[navigate])
  return (
    <div className='register-page'>
      
    <Form layout='vertical' onFinish={submitHandler}>
      <h2>Login Page</h2>
      <Form.Item label="Email" name={"email"}> 
          <Input  />
      </Form.Item>
      <Form.Item label="password" name={"password"}> 
          <Input  />
      </Form.Item>
      <div className='d-flex'>
          <Link to={"/register"}>new register</Link>
          <button>Login</button>
      </div>
    </Form>
  </div>
  )
}

export default LoginPage
