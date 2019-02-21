const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Project = require('../models/project');


router.get('/', (req, res, next) => {
    Project.find()
    .exec()
    .then(result => {
        if(result.length > 0){
            res.status(200).json(result)
        }else{
            res.status(404).json({
                message: "No Result Found"
            });
        }        
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next) => {
    const project = new Project({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        testing_type: req.body.testing_type,
        sub_project_name: req.body.sub_project_name,
        sub_description: req.body.sub_description,
        testing_account_detail: req.body.testing_account_detail
    });
    project.
    save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Handeling POST request',
            data: project
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.get('/:id', (req, res, next)=>{
    const id = req.params.id;
    Project.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        if(doc){
            res.status(200).json({
                message: "Project Data",
                data: doc
            });
        }else{
            res.status(200).json({
                message: "No Project Found!"
            });
        }
       
    })
    .catch(err => {console.log(err); res.status(500).json({error: err})});
});

router.patch('/:id', (req, res, next) => {
    //console.log(req.body);
    const id = req.params.id;
    const updateOps = {};

    const input = req.body;
    for (const key of Object.keys(input)) {
        console.log(key, input[key]);
        updateOps[key] = input[key];
    }

    Project.update({_id: id}, {$set : updateOps})
    .exec()
    .then(result => {
        console.log(result);
        if(result.ok){
            res.status(200).json({
                message: "Updated Successfully"
            });
        }else{
            res.status(500).json({
                error: err
            });
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }); 
});

router.delete('/:id', (req, res, next)=>{
    const id = req.params.id;
    Project.remove({_id: id})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

module.exports = router;