import express from 'express';
import Project from '../modals/projectModals'
import Task from '../modals/taskModal'
import User from '../modals/userModals'
import { isAuth, isAdmin } from '../util';
const sendEmail = require('../email/email.send')
const cookieParser = require('cookie-parser')
const router = express.Router();

// CREATE TASK
router.post('/', async (req,res) => {
    const project = await Project.findById(req.body.projectId);
    const task = new Task({
        projectId:req.body.projectId,
        description:req.body.description,
        worker:req.body.worker
    });
    try {
        project.tasks.push(task)
        const updatedProject = await project.save()
        const newTask = await task.save()

        if(newTask) {
            return res 
            .status(201)
            .send({message : 'new task is created' , data: newTask})
        }
        return res.status(500).send({message:'error in creatin task'})
    } catch (error) {
        console.log({message:"error"});
    }

})

// GET ALL TASK
router.get('/' , async (req,res) => {
  const tasks = await Task.find()
  res.send(tasks)
}) 

// GET BY ID
router.get('/:id' , async (req,res) => {
  const task = await Task.findById({_id:req.params.id})
  res.send(task)
}) 

// DELETE TASK
router.delete('/:id', async (req,res) => {
  const deleteTask = await Task.findById({_id:req.params.id});
  if(deleteTask) {
    await deleteTask.remove()
    res.send({message:"Task Deleted"})
  } else {
    res.send('Error in deleting')
  }
})


// UPDATE TASK
router.put('/:id', async (req,res) => {
   const task = await Task.findById({_id:req.params.id});
if(task) {
  task.description =  req.body.description || task.description
  task.worker = req.body.worker || task.worker
  const updatedtask = await task.save();
  const user = await User.findOne({"name":task.worker})

  if(user) {
    const msg = {
      subject: 'Simple msg test',
      html: `<p> This is for task : ${task.description}  </p>`
    }
  const mail = await sendEmail(user.email, msg)
  }
  if(updatedtask) {
    return res
      .status(200)
      .send({ message: 'Product Updated', data: updatedtask })
  }
}
  return res.status(500).send({ message: ' Error in Updating Project.' });

})


export default router;