const Deadline = require('../models/Deadline');

exports.addDeadline = async (req, res, next) => {
  try {
    const { type, course, name, date, estimatedHours } = req.body;

    if (!type || !course || !name || !date) {
      return res.status(400).json({ error: 'الرجاء إدخال جميع الحقول' });
    }

    const deadline = await Deadline.create({
      type,
      course,
      name,
      date,
      estimatedHours: estimatedHours && estimatedHours > 0 ? estimatedHours : 1,
      user: req.user.id 
    });

    res.status(201).json({ success: true, deadline });
  } catch (err) {
    next(err);
  }
};

exports.getDeadlines = async (req, res, next) => {
  try {
    
    const deadlines = await Deadline.find({ user: req.user.id }).sort({ date: 1 });
    res.status(200).json(deadlines);
  } catch (err) {
    next(err);
  }
};

exports.deleteDeadline = async (req, res, next) => {
  try {
    const deadline = await Deadline.findById(req.params.id);

    if (!deadline) {
      return res.status(404).json({ error: 'المهمة غير موجودة' });
    }

    if (deadline.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'غير مصرح لك بالحذف' });
    }

    await Deadline.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'تم الحذف بنجاح' });
  } catch (err) {
    next(err);
  }
};