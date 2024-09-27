import React, { useState,useEffect } from 'react'
import Layout from '../components/layout/Layout'
import {Form, Input, message, Modal, Select, Table,DatePicker} from "antd"
import axios from 'axios'
import moment from 'moment';
const { RangePicker } = DatePicker;

function HomePage() {


    const [showModal,setShowModal] = useState(false);
    const[allTransection,setAllTransection] = useState([]);
    const [frequency,setFrequency] = useState('7');
    const[seletedDate,setSelectedDate] = useState([])


    const columns = [
        {
            title:'date',
            dataIndex:'date',
            render:(text)=><span>{moment(text).format("yyyy-mm-dd")}</span>
        },
        {
            title:'Amount',
            dataIndex:'amount'
        },
        {
            title:'type',
            dataIndex:'type'
        },
        {
            title:'Category',
            dataIndex:'category'
        },
        {
            title:'Reference',
            dataIndex:'reference'
        },
        {
            title:'Actions',
        }
    ]

    useEffect(()=>{
        getAllTransection()
    },[frequency,seletedDate])

    const handleSubmit =async (values)=>{
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            await axios.post('/transection/add-transection',{...values,userId:user._id})
            message.success("transection added")
        } catch (error) {
            message.error("faild to add")
        }
        
    }

    const getAllTransection =async ()=>{
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const res = await axios.post("/transection/get-transection",{
                userId:user._id,
                frequency,
                seletedDate
            })
            setAllTransection(res.data);
            console.log(res.data);
            
        } catch (error) {
            console.log(error);
            message.error("faild fecth transection")
        }
    }

  return (
    <Layout>
        <div className='filters'>
            <div>
                <h6>Select frequency</h6>
                <Select value={frequency} onChange={(values)=>setFrequency(values)} >
                    <Select.Option value="7">Last 1 Week</Select.Option>
                    <Select.Option value="30">Last 1 Monnth</Select.Option>
                    <Select.Option value="365 ">Last 1 year</Select.Option>
                    <Select.Option value="Custom">Custom</Select.Option>
                </Select>
                {frequency === "custom" &&(<RangePicker value={seletedDate} onChange={(values)=>setSelectedDate(values)}/>)}
            </div>
            <div>
                <button className='btn btn-primary' onClick={()=>setShowModal(true)}>Add New</button>
            </div>
        </div>
        <div>
            <Table columns={columns} dataSource={allTransection}/>
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
