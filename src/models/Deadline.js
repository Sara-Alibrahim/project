const mongoose = require('mongoose');

const deadlineSchema = new mongoose.Schema({
  type: { 
    type: String, 
    required: true,
    enum: ['Assignment', 'Exam'] 
  },
  course: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  estimatedHours: {
    type: Number,
    default: 1,
    min: 1
  },
  
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Deadline', deadlineSchema);