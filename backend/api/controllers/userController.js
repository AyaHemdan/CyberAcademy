const Progress = require('../models/Progress');

// جلب تقدم المستخدم
const getProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({ userId: req.user });
    
    if (!progress) {
      return res.status(404).json({ success: false, message: 'لم يتم العثور على تقدم' });
    }

    res.json({
      success: true,
      progress
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// تحديث تقدم المستخدم
const updateProgress = async (req, res) => {
  try {
    const { currentLesson, completedLessons, unlockedLessons, finalExamPassed } = req.body;

    let progress = await Progress.findOne({ userId: req.user });
    
    if (!progress) {
      progress = await Progress.create({
        userId: req.user,
        currentLesson: 0,
        completedLessons: [],
        unlockedLessons: [1],
        finalExamPassed: false
      });
    }

    // تحديث البيانات
    if (currentLesson !== undefined) progress.currentLesson = currentLesson;
    if (completedLessons) progress.completedLessons = completedLessons;
    if (unlockedLessons) progress.unlockedLessons = unlockedLessons;
    if (finalExamPassed !== undefined) progress.finalExamPassed = finalExamPassed;

    await progress.save();

    res.json({
      success: true,
      message: 'تم تحديث التقدم بنجاح',
      progress
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// جلب بيانات المستخدم
const getUserData = async (req, res) => {
  try {
    const User = require('../models/User');
    const user = await User.findById(req.user).select('-password');
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'المستخدم غير موجود' });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getProgress, updateProgress, getUserData };