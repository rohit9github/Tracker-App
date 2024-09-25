import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import {Form, Input, message, Modal, Select} from "antd"
import axios from 'axios'

function HomePage() {


    const [showModal,setShowModal] = useState(false)

    const handleSubmit =async (values)=>{
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            await axios.post('/transection/add-transection',{...values,userId:user._id})
            message.success("transection added")
        } catch (error) {
            message.error("faild to add")
        }
        
    }

  return (
    <Layout>
        <div className='filters'>
            <div>Range Filter</div>
            <div>
                <button className='btn btn-primary' onClick={()=>setShowModal(true)}>Add New</button>
            </div>
        </div>
            <Modal title="add Transection" visible={showModal} onCancel={()=>setShowModal(false)} footer={false}>
                <Form layout='vertical' onFinish={handleSubmit}>
                    <Form.Item label="Amount" name={"amount"}>
                        <Input type='text'/>
                    </Form.Item>
                    <Form.Item label="Type" name={"type"}>
                        <Select>
                            <Select.Option value="income">Income</Select.Option>
                            <Select.Option value="expanse">Expanse</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="category" name={"category"}>
                        <Select>
                            <Select.Option value="bills">bills</Select.Option>
                            <Select.Option value="tip">tip</Select.Option>
                            <Select.Option value="project">project</Select.Option>
                            <Select.Option value="food">food</Select.Option>
                            <Select.Option value="salary">salary</Select.Option>
                            <Select.Option value="Movie">movie</Select.Option>
                            <Select.Option value="medical">Medical</Select.Option>
                            <Select.Option value="fees">fees</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="date" name={"date"}>
                        <Input type='date'/>
                    </Form.Item>
                    <Form.Item label="reference" name={"reference"}>
                        <Input type='text'/>
                    </Form.Item>
                    <Form.Item label="description" name={"description"}>
                        <Input type='text'/>
                    </Form.Item>
                    <div className='d-flex justify-content-end'>
                        <button type='submit' className='btn btn-primary' >{""}save</button>
                    </div>
                </Form>
            </Modal>
    </Layout>
  )
}

export default HomePage
