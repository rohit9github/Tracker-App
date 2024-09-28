
const transectionModel = require("../models/transectionModel");
const moment = require('moment')

const getAllTransection = async(req,res)=>{
    try {
        const {frequency,seletedDate,type} = req.body;
        const transections = await transectionModel.find({
            ...(frequency !== "custom"?{
                date: {
                    $gt:moment().subtract(Number(frequency),"d").toDate()
                    },
            }:{
                date:{
                    $gte:seletedDate[0],
                    $lte:seletedDate[1]
                }
            }),
           
            userId:req.body.userId,
            ...(type !== "all" && {type})
        });
        res.status(200).json(transections)
    } catch (error) {
        console.log(error) 
        res.status(500).json(error)
    }
}

const addTransection = async(req,res)=>{
try{
    const newTransection = new transectionModel(req.body);
    await newTransection.save();
    res.status(201).send("transection createed")
}
catch(error){
    console.log(error);
        res.status(500).json(error)
}
}

module.exports={getAllTransection,addTransection}