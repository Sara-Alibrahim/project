const Course = require('../models/Course');
const Deadline = require('../models/Deadline');

exports.getCourses = async (req, res) => {
  const courses = await Course.find({ user: req.user.id });
  res.json(courses);
};

exports.addCourse = async (req, res) => {
  try {
    const { name, hours } = req.body;
    const course = await Course.create({
      name,
      hours,
      user: req.user.id
    });
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ error: 'Course not found' });
  await Deadline.deleteMany({ course: course.name });
  await Course.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

exports.updateCourse = async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(course);
};