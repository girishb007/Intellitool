import React from "react";
import { bgLinearGradientClassName } from '@/styles/styles';
import { useRouter } from 'next/router'; 
import { setSession } from "./session"; // Import session management utility

function SignInForm() {
  const router = useRouter(); // Initialize useRouter hook

  const [state, setState] = React.useState({
    email: "",
    password: "",
    role: ""
  });

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = evt => {
    evt.preventDefault();

    const { email, password, role } = state;

    // Check if email, password, and role match the hardcoded values
    if (email === "girish@gmail.com" && password === "1234" && role === "student") {
      // Store session
      setSession(true, email, role);
      // Redirect to Home component upon successful login
      router.push("/");
    } else {
      // Display alert for incorrect email/password
      alert("Incorrect email or password");
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <input
        required
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
        required
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />

        {/* Radio buttons for selecting role */}
        <div className="role-selection">
          <input
            type="radio"
            id="student"
            name="role"
            value="student"
            checked={state.role === "student"}
            onChange={handleChange}
          />
          <label htmlFor="student">Student</label>

          <input
            type="radio"
            id="teacher"
            name="role"
            value="teacher"
            checked={state.role === "teacher"}
            onChange={handleChange}
          />
          <label htmlFor="teacher">Teacher</label>

          <input
            type="radio"
            id="admin"
            name="role"
            value="admin"
            checked={state.role === "admin"}
            onChange={handleChange}
          />
          <label htmlFor="admin">Admin</label>

        </div>

        <button type="submit" className={`w-max px-3 py-2 text-white font-bold ${bgLinearGradientClassName}`}>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
