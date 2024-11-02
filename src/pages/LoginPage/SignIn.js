import React from "react";
import { getUsers } from "../../utils/api"; // Import the getUsers function
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify components
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toastify

function SignInForm() {
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });
  const [error, setError] = React.useState(""); // To handle login errors

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = async evt => {
    evt.preventDefault();
    const { email, password } = state;

    try {
      // Fetch all users to check credentials
      const users = await getUsers();
      const user = users.find(user => user.email === email && user.password === password);

      if (user) {
        toast.success(`You are logged in with email: ${email}`); // Use toast for success message
      } else {
        setError("Invalid email or password."); 
        toast.error("Invalid email or password."); // Use toast for error message
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      setError("An error occurred during sign in. Please try again.");
      toast.error("An error occurred during sign in. Please try again."); // Use toast for error message
    } finally {
      setState({
        email: "",
        password: ""
      });
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <span>use your account</span>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
}

export default SignInForm;
