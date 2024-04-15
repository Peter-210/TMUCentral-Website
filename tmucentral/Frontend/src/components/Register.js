import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import Header from "./Header"

// Function to allow the user to register
export default function Register({ onFormSubmit }) {
  // Get the references for the entered data
  const emailRef = useRef()
  const passwordRef = useRef()
  const nameRef = useRef();
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    console.log(emailRef);
    console.log(emailRef.value);

    // in case both passswords are not the same
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    // the email must be @torontomu.ca
    if (!emailRef.current.value.includes('@torontomu.ca')) {

      return setError("Invalid email entered")
    }

    // password must be strong, at least 8 characters
    if (passwordRef.current.value.length < 8) {
      return setError("Password must be at least 8 characters long")
    }

    try {
      // define the user and then signup using firebase API
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      const user = {
        name: nameRef.current.value,
        email: emailRef.current.value
      };
      const msg = "Advertisement submitted successfully!";
      await onFormSubmit('/postUser', user, msg);
      console.log("test");
      navigate("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  // Display the register page
  const registerProp = (<>
    <Card style={{ width: '50%', margin: '0 auto', marginTop: '20px' }}>
      <Card.Body>
        <h2 className="text-center mb-4">Sign Up</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="name" className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Full Name</Form.Label>
            <Form.Control type="text" ref={nameRef} required />
          </Form.Group>
          <Form.Group id="email" className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} required />
            <Form.Text muted>@torontomu.ca email needed!</Form.Text>
          </Form.Group>
          <Form.Group id="password" className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Password</Form.Label>
            <Form.Control type="password" ref={passwordRef} required />
            <Form.Text muted>Minimum of 8 characters needed!</Form.Text>
          </Form.Group>
          <Form.Group id="password-confirm" className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Password Confirmation</Form.Label>
            <Form.Control type="password" ref={passwordConfirmRef} required />
            <Form.Text muted>Minimum of 8 characters needed!</Form.Text>
          </Form.Group>
          <Button disabled={loading} className="w-100" type="submit">
            Sign Up
          </Button>
        </Form>
      </Card.Body>
    </Card>
    <div className="w-100 text-center mt-2">
      Already have an account? <Link to="/login">Log In</Link>
    </div>
  </>
  );

  return (<Header childComp={registerProp} />);

}