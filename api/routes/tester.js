const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Tester = require('../models/tester');


router.get('/', (req, res, next) => {
    Tester.find()
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
    const tester = new Tester({
        _id: new mongoose.Types.ObjectId(),
        steps: req.body.steps,
        expected: req.body.expected,
        existing: req.body.existing,
        comment: req.body.comment,
        screenshot: req.body.screenshot
    });
    tester.
    save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Handeling POST request',
            data: tester
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.get('/:id', (req, res, next)=>{
    const id = req.params.id;
    Tester.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        if(doc){
            res.status(200).json({
                message: "Tester Data",
                data: doc
            });
        }else{
            res.status(200).json({
                message: "No Tester Found!"
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

    Tester.update({_id: id}, {$set : updateOps})
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
    Tester.remove({_id: id})
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