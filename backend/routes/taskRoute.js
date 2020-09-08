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
        name:req.body.name,
        projectId:req.body.projectId,
        description:req.body.description,
        worker:req.body.worker,
        status:req.body.status ,
        started:req.body.started,
        end:req.body.end

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

// GET MINE TASKS 
router.get("/mine", isAuth, async (req, res) => {
  const userInfo = JSON.parse(req.cookies['userInfo'])
  const userName = userInfo.name
  const tasks = await Task.find({"worker" : userName}).populate('user');
  res.send(tasks);
});

// GET ALL TASK
router.get('/' , async (req,res) => {
  const tasks = await Task.find()
  res.send(tasks)
}) 

// GET PROJECT BY TASK ID
router.get('/:id',  async (req,res) => {
  const project = await Project.findOne({tasks:req.params.id},{_id:0, "tasks.$" : 1 , name: 1, description:1}).populate('tasks');
  if(project) {
    res.send(project);
  } else {
        res.status(404).send({ message: 'Product Not Found.' });
  }
})



// DELETE TASK
router.delete('/:id', async (req,res) => {
  const deleteTask = await Task.findById({_id:req.params.id});
  // const deleteTaskfromTask = await Task.findById({_id:req.params.id});
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
    const userInfo = JSON.parse(req.cookies['userInfo'])
    const currentuser = userInfo
if(task) {
  task.name =  req.body.name || task.name
  task.description =  req.body.description || task.description
  task.worker = req.body.worker || task.worker
  task.status = req.body.status || task.status
  task.started = req.body.started || task.started
  task.end = req.body.end || task.end
  const updatedtask = await task.save();
  const worker = await User.findOne({"name":task.worker})

  if(currentuser.isAdmin) {
    const msg = {
      subject: 'Simple msg test',
      html: `<p> New task has been assignemd to you by ${currentuser.name} This is for task : ${task.name}  </p>`
    }
  const mail = await sendEmail(worker.email, msg)
  }

  if(!currentuser.isAdmin) {
    const adminEmail = 'sengargeetendra123@gmail.com'
    const msg = {
      subject: 'Updation Email ',
      html: `<p> New updation has been done by ${currentuser.name} This is for task : ${task.name}  </p>`
    }
  const mail = await sendEmail(adminEmail, msg)
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