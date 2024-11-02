export const validateSignUpForm = (state) => {
    const errors = {};
    if (!state.name) {
      errors.name = "Name is required";
    }
    if (!state.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(state.email)) {
      errors.email = "Email address is invalid";
    }
    if (!state.password) {
      errors.password = "Password is required";
    } else if (state.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  };
  