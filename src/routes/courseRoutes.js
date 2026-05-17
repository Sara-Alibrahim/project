const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const protect = require('../middleware/protect');

router.get('/', protect, courseController.getCourses);
router.post('/', protect, courseController.addCourse);
router.delete('/:id', protect, courseController.deleteCourse);
router.put('/:id', protect, courseController.updateCourse);

module.exports = router;