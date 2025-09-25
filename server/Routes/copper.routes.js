const express=require('express')
const router=express.Router()

const copper=require('../Controllers/copper.controllers')

router.post('/',copper.createCopper)
router.put('/:id',copper.updateCopper)
router.get('/',copper.getCopper);
module.exports=router