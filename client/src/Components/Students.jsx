import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, deleteStudent, editStudent, getStudents, toggleStudentStatus } from "../Redux/Slices/adminSlice";

const Students = () => {
  const students = useSelector(state => state.students.students)
  const [modalShow, setModalShow] = useState(false);
  const [newStudentData, setNewStudentData] = useState(
    {
      id: "",
      name: "",
      email: "",
      age: "",
      image: "",
      status: "Active"
    }
  );

  const [editStudentData, setEditStudentData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editStudentId, setEditStudentId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        if (students?.length === 0) {
          const res = await dispatch(getStudents());
          console.log(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudents();

  }, [dispatch]);

  // Input Change
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      const selectedFile = files[0];

      if (selectedFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);

        if (editStudentData) {
          setEditStudentData({ ...editStudentData, image: selectedFile });
        } else {
          setNewStudentData({ ...newStudentData, image: selectedFile });
        }
      }
    } else {
      if (editStudentData) {
        setEditStudentData({ ...editStudentData, [name]: value });
      } else {
        setNewStudentData({ ...newStudentData, [name]: value });
      }
    }

    console.log(editStudentData)
  };

  // Add Student
  const handleAddStudent = async () => {
    console.log(imagePreview)


    try {
      const res = await dispatch(addStudent(newStudentData));
    } catch (error) {
      console.log(error)
    }
    setNewStudentData({ id: "", name: "", email: "", age: "", image: "", status: "Active" });
    setModalShow(false);
  };

  // Delete Student
  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this student?")) {
        const res = await dispatch(deleteStudent(id));
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Toggle Status
  const handleToggleStatus = async (id) => {
    try {
      await dispatch(toggleStudentStatus(id));
    } catch (error) {
      console.error(error);
    }
  };

  // Edit Student
  const handleEditStudent = async () => {
    try {
      const res = await dispatch(editStudent({ editStudentId, editStudentData }));
    } catch (error) {
      console.log(error);
    }
    setEditStudentData(null);
    setModalShow(false);
  };

  const handleModelOpenEdit = (student) => {
    setEditStudentId(student._id);
    setEditStudentData({
      id: student.id,
      name: student.name,
      email: student.email,
      age: student.age,
      image: student.image,
      status: student.status,
    });

    if (student.image && student.image.startsWith("http")) {
      setImagePreview(student.image);
    } else {
      setImagePreview(`http://localhost:5000/uploads/student-images/${student.image}`);
    }
    setModalShow(true);
  };



  // Modle close
  const handleModelClose = () => {
    setNewStudentData({ id: "", name: "", email: "", age: "", image: "", status: "Active" });
    setEditStudentData({
      id: "",
      name: "",
      email: "",
      age: "",
      image: "",
      status: "",
    });
    setEditStudentId("");
    setImagePreview(null);
    setModalShow(false);
  }


  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h2>Students List</h2>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Add Student
        </Button>
      </div>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr key={student._id}>
                <td>{index + 1}</td>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td
                  onClick={() => handleToggleStatus(student._id)}
                  style={{ cursor: 'pointer' }}
                >
                  {student.status}
                </td>

                <td>
                  <Button variant="warning" size="sm" className="me-2" onClick={() => handleModelOpenEdit(student)}>Edit</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(student._id)}>Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No students found</td>
            </tr>
          )}
        </tbody>

      </table>

      <Modal show={modalShow} onHide={handleModelClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editStudentData ? "Edit Student" : "Add New Student"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" name="id" value={editStudentData ? editStudentData.id : newStudentData.id} onChange={handleInputChange} placeholder="Enter ID" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={editStudentData ? editStudentData.name : newStudentData.name} onChange={handleInputChange} placeholder="Enter name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={editStudentData ? editStudentData.email : newStudentData.email} onChange={handleInputChange} placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control type="number" name="age" value={editStudentData ? editStudentData.age : newStudentData.age} onChange={handleInputChange} placeholder="Enter age" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" accept="image/png, image/jpeg" name="image" onChange={handleInputChange} placeholder="Enter age" />
              {imagePreview && (
                <div className="mb-3">
                  <p>Image Preview:</p>
                  <img src={imagePreview} alt="Preview" style={{ maxWidth: "20%", height: "auto" }} />
                </div>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={editStudentData ? editStudentData.status : newStudentData.status} onChange={handleInputChange}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModelClose}>Close</Button>
          <Button variant="primary" onClick={editStudentData ? handleEditStudent : handleAddStudent}>{editStudentData ? "Update Student" : "Save Student"}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Students;
