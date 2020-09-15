import express from 'express';
import Project from '../modals/projectModals'
import Task from '../modals/taskModal'
import { isAuth, isAdmin } from '../util';
const cookieParser = require('cookie-parser')
const router = express.Router();

// router.get('/', async (req, res) => {
//   const category = req.query.category ? {
//         name: {
//           $regex: req.query.category,
//           $options: 'i',
//         },
//       }
//     : {};
//   const searchKeyword = req.query.searchKeyword
//     ? {
//         name: {
//           $regex: req.query.searchKeyword,
//           $options: 'i',
//         },
//       }
//     : {};
//   const sortOrder = req.query.sortOrder
//     ? req.query.sortOrder === 'lowest'
//       ? { price: 1 }
//       : { price: -1 }
//     : { _id: -1 };
//   const products = await Product.find({ ...category, ...searchKeyword }).sort(
//     sortOrder
//   );
//   res.send(products);
// });


// POST NEW PROJECTS
router.post('/', isAuth, isAdmin,  async (req,res) => {
    const userInfo = JSON.parse(req.cookies['userInfo'])
    const userName = userInfo.name
    console.log("name", userName);
    const project = new Project({
    name: req.body.name,
    description:req.body.description,
    started:req.body.started,
    end:req.body.end,
  });
  console.log("routes",project.name, project.description);
  try {
    const newProject = await project.save()
    if(newProject) {
      return res
      .status(201)
      .send({ message: 'New Product Created', data: newProject });
    }
  return res.status(500).send({ message: ' Error in Creating Product.' });

  } catch (error) {
     console.log({msg:"error"});
   }
})

// ADD A MEMBER TO A PROJECT
router.post('/:id/members' , isAuth, isAdmin, async (req,res) => {
  const project = await Project.findById(req.params.id);
console.log("project", project);
  if(project) {
    const member = {
      name : req.body.membername
    }
    project.teamMember.push(member)
    const updatedProject = await project.save()
    res.status(201).send({message: 'Member Added', data: updatedProject})
  } else {
    res.status(404).send({ message: 'Project Not Found or member not added' });
  }
})

// GET ALL PROJECTS 
router.get("/" , async (req,res) => {
  const projects = await Project.find().populate('tasks')
  res.send(projects)
}) 


// GET PROJECT BY ID
router.get('/:id',  async (req,res) => {
  const project = await Project.findOne({_id:req.params.id}).populate('tasks');
  if(project) {
    res.send(project);
  } else {
        res.status(404).send({ message: 'Product Not Found.' });
  }
})


// DELETE PROJECT
router.delete('/:id', isAuth , isAdmin, async (req,res) => {
  const deleteProject = await Project.findById({_id:req.params.id});
  const deleteTasks = await Task.findById({"projectId":req.params.id})
  if(deleteProject) {
    await deleteProject.remove()
    res.send({message:"Project Deleted"})
  } else {
    res.send('Error in deleting')
  }
})

// UPDATE PROJECT
router.put('/:id', isAuth ,isAdmin, async (req,res) => {
   const project = await Project.findOne({_id:req.params.id});
if(project) {
  project.name = req.body.name || project.name,
  project.description =  req.body.description || project.description
  project.started =  req.body.started || project.started
  project.end =  req.body.end || project.end
  const updatedProject = await project.save();
  if(updatedProject) {
    return res
      .status(200)
      .send({ message: 'Product Updated', data: updatedProject })
  }
}
  return res.status(500).send({ message: ' Error in Updating Project.' });

})

export default router;