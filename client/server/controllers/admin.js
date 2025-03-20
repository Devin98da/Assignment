const Student = require("../models/student");

exports.GetStudents = async (req, res, next) => {
    try {
        const students = await Student.find();

        res.status(200).json(students);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.GetStudent = async (req, res, next) => {

}

exports.AddStudent = async (req, res, next) => {
    try {
        const { id, name, email, age, status } = req.body;

        if (!id || !name || !email || !age || !req.file || !status) {
            return res.status(400).json("All fields are required");
        }

        const imagePath = `${req.protocol}://${req.get("host")}/uploads/student-images/${req.file.filename}`;

        const existingStudent = await Student.findOne({
            $or: [{ email: email }, { id: id }]
        });

        if (existingStudent) {
            if (existingStudent.email === email) {
                return res.status(400).json({ message: "Email already in use" });
            } else if (existingStudent.id === id) {
                return res.status(400).json({ message: "ID already in use" });
            }
        }

        const student = new Student({
            id,
            name,
            email,
            age,
            image: imagePath,
            status
        });

        const newStudent = await student.save();

        return res.status(200).json({
            student: newStudent,
            message: "Student added successfully"
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};


exports.EditStudent = async (req, res, next) => {
    try {
        const studentId = req.params.id;
        console.log(req.body)
        const { id, name, email, age, status } = req.body;

        const student = await Student.findById({ _id: studentId });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        let imagePath = student.image;

        if (req.file) {
            imagePath = `${req.protocol}://${req.get("host")}/uploads/student-images/${req.file.filename}`;

        };

        student.id = id;
        student.name = name;
        student.age = age;
        student.email = email;
        student.status = status;
        student.image = imagePath;

        const updatedStudent = await student.save();

        return res.status(200).json({
            student: updatedStudent,
            message: "Student status updated successfully"
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.DeleteStudent = async (req, res, next) => {
    try {
        const id = req.params.id;

        const deleteStudent = await Student.findByIdAndDelete({ _id: id });

        res.status(200).json({
            id: deleteStudent._id,
            message: "Attendance deleted is succefully",
        })


    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.ToggleStudentStatus = async (req, res, next) => {
    try {
        const id = req.params.id;
        const student = await Student.findById({ _id: id });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        student.status = student.status === "Active" ? "Inactive" : "Active";

        const updatedStudent = await student.save();

        return res.status(200).json({
            student: updatedStudent,
            message: "Student status updated successfully"
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};