const mongoose = require('mongoose');
const { Schema,model } = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {type: String, required: [true, "can't be blank"], index: true, unique:true, minlength:3},
  description: String,
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
}, {timestamps: true});

const projectModel = mongoose.model('Project', projectSchema);

export default projectModel;