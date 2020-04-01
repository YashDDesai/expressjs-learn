const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');

// Get all Members
router.get('/', (req, res)=>   res.json(members)) ;

// Get a single member
router.get('/:id', (req, res)=>   {
    const found = members.some(member=>member.id===parseInt(req.params.id));

    if(found){
        res.json(members.filter(member=>member.id === parseInt(req.params.id)));
    }
    else{
        res.status(400).json({msg: `member not found with ${parseInt(req.params.id)}`});
    }    
}) ;

// Post new member
router.post('/', (req, res)=>{
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: req.body.status
    };    
    members.push(newMember);
    //res.json(members);
    res.redirect('/');
});

module.exports = router;