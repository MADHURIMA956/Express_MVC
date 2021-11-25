const express = require('express');
const User = require('../models/users.model');

const router = express.Router();



router.post('/users' , async (req, res) => {
    //thenable

    try {
        const users = await User.create( req.body );
        return res.status( 201 ).send( users ); 
    }catch(e){
        return res.status(500).json( { message : e.message , status : 'Failed' } )
    }
});


// get 

router.get('/users' , async (req, res) => {
    //thenable

    try {
        const users = await User.find().lean().exec();
        return res.status( 201 ).send( users ); 
    }catch(e){
        return res.status(500).json( { message : e.message , status : 'Failed' } )
    }
});

//get single

router.get('/users/:id' , async (req, res) => {
    //thenable

    let idd = req.params.id

    try {
        const users = await User.findById( idd ).lean().exec();
        return res.status( 201 ).send( users );  
    }catch(e){
        return res.status(500).json( { message : e.message , status : 'Failed' } )
    }
});


//patch

router.patch('/users/:id' , async (req, res) => {
    //thenable
    let idd =  req.params.id 
    try {
        
        const users = await User.findByIdAndUpdate(idd , req.body , { new : true  } ).exec();
        return res.status( 201 ).send( users );  
    }catch(e){
        return res.status(500).json( { message : e.message , status : 'Failed' } )
    }
});


// delete users

router.delete('/users/:id' , async (req, res) => {
    //thenable
    let idd =  req.params.id 
    try {
        const users = await User.findByIdAndDelete( idd ).lean().exec();
        return res.status( 201 ).send( users );  
    }catch(e){
        return res.status(500).json( { message : e.message , status : 'Failed' } )
    }
});


module.exports = router;