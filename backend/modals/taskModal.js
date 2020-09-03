import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  // projectName : {}
  projectId : {type: mongoose.Schema.Types.ObjectId, require: true},
  description: {type: String, index:true, required:true},
  completed: {type: Boolean,default: false},
  completionDate: {type:Date}
}, {timestamps: true});

const taskmodel = mongoose.model('Task', taskSchema);

export default taskmodel;