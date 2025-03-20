import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { login } from '../Redux/Slices/authSlice';

const Login = () => {

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  };

  const navigate = useNavigate();

  const validateInputs = () => {
    const newErrors = {};

    if (!formData.username.trim()) newErrors.username = "Username is required";

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validateInputs()) return;

    try {
      const res = await dispatch(login(formData)).unwrap();
      console.log(res)
      if (res.token) {
        navigate('/admin/dashboard');

      }
      console.log(res);

    }
    catch (error) {
      console.log(error.message);
      setApiError(error.response.data.message);
    }

  }

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="text-center mb-4">
            <h2>Login</h2>
          </div>
          <Form className="p-4 border rounded shadow bg-white w-100" onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Sign In
            </Button>
            {apiError && <p className="text-danger mt-2 text-center">{apiError}</p>}
            <p className="mt-2">Don't have an account? <Link to={'/register'}><span>Sign Up</span></Link></p>

          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;