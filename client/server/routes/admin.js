const express = require('express');
const {  AddStudent, EditStudent, DeleteStudent, GetStudents, GetStudent, ToggleStudentStatus } = require('../controllers/admin');
const { imageUploader } = require('../middlewares/fileUploads.js');

const router = express.Router();

router.get("/students/get", GetStudents);
router.get("/students/get:id", GetStudent);
router.post("/students/add", imageUploader, AddStudent);
router.put("/students/edit/:id", EditStudent);
router.delete("/students/delete/:id", DeleteStudent);
router.put("/students/toggle-status/:id", ToggleStudentStatus);

module.exports = router;