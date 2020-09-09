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

// ------------Admin Products---------------------// 
// router.get("/admin/products", async (req,res) => {
//     const userInfo = JSON.parse(req.cookies['userInfo'])
//     const userName = userInfo.name
//     const products = await Product.find({"owner":userName})
//     res.send(products)
// })



// router.post('/:id/reviews', isAuth, async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   if (product) {
//     const review = {
//       name: req.body.name,
//       rating: Number(req.body.rating),
//       comment: req.body.comment,
//     };
//     product.reviews.push(review);
//     product.numReviews = product.reviews.length;
//     product.rating =
//       product.reviews.reduce((a, c) => c.rating + a, 0) /
//       product.reviews.length;
//     const updatedProduct = await product.save();
//     res.status(201).send({
//       data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
//       message: 'Review saved successfully.',
//     });
//   } else {
//     res.status(404).send({ message: 'Product Not Found' });
//   }
// });




// // ----------------------Add PRoduct(Admin)-------------------//
// router.post('/', isAuth, isAdmin, async (req, res) => {
//     const userInfo = JSON.parse(req.cookies['userInfo'])
//     const userName = userInfo.name
    
//   const product = new Product({
//     name: req.body.name,
//     price: req.body.price,
//     image: req.body.image,
//     brand: req.body.brand,
//     category: req.body.category,
//     countInStock: req.body.countInStock,
//     description: req.body.description,
//     rating: req.body.rating,
//     numReviews: req.body.numReviews,
//   });
//   try {
//   const newProduct = await product.save()
//   const recentProduct = await Product.update({"name": product.name},{$set:{"owner":userName}})
//   if (newProduct) {
//     return res
//       .status(201)
//       .send({ message: 'New Product Created', data: newProduct });
//   }
//   return res.status(500).send({ message: ' Error in Creating Product.' });
    
//   } catch (error) {
//     console.log({msg:"error"});
//   }
// });


// POST NEW PROJECTS
router.post('/', isAuth, isAdmin,  async (req,res) => {
    const userInfo = JSON.parse(req.cookies['userInfo'])
    const userName = userInfo.name
    console.log("name", userName);
    const project = new Project({
    name: req.body.name,
    description:req.body.description,
    onwer:userName,
    started:req.body.started,
    end:req.body.end,
  });

  console.log("owner",project.owner);
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
      name : req.body.name
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