import React from "react";
import { addUser } from "../../utils/api"; 
import { validateSignUpForm } from "../../utils/validation"; 
import { toast, ToastContainer, Slide } from "react-toastify"; 

function SignUpForm({ onSignUpSuccess }) {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = React.useState({}); 

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
    setErrors({ ...errors, [evt.target.name]: "" }); 
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const formErrors = validateSignUpForm(state);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const { name, email, password } = state;

    try {
      await addUser({ name, email, password });
      
      toast.success("User signed up successfully!", {
        position: "top-right",
        autoClose: 5000,
        transition: Slide
      });

      onSignUpSuccess(); 
      
      setState({
        name: "",
        email: "",
        password: ""
      });
    } catch (error) {
      console.error("Error during sign up:", error);
      if (error.message === "Email already exists.") {
        setErrors({ ...errors, email: "This email is already taken." });
      } else {
        toast.error("There was an error signing up. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          transition: Slide
        });
      }
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <span>or use your email for registration</span>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}

        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

        <button>Sign Up</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default SignUpForm;
