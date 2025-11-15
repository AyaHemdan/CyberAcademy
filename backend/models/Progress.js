const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  currentLesson: {
    type: Number,
    default: 0
  },
  completedLessons: [{
    type: Number
  }],
  unlockedLessons: [{
    type: Number,
    default: [1]
  }],
  totalLessons: {
    type: Number,
    default: 7
  },
  finalExamPassed: {
    type: Boolean,
    default: false
  },
  certificateGenerated: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Progress', progressSchema);