const express=require('express');
const router=express.Router();
const todoController = require('../controller/todo')

router.post('/',todoController.create);
router.put('/:id',todoController.update);
router.get('/',todoController.fetchList);
router.delete('/:id',todoController.delete);
router.get('/:id' ,todoController.getEachTask);
 router.patch('/:id',todoController.markAsCompleted);

module.exports=router;