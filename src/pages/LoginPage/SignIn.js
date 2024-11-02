import React, { useContext } from "react";
import { getUsers } from "../../utils/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../router/AuthContext";

function SignInForm() {
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

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
      const users = await getUsers();
      const user = users.find(user => user.email === email && user.password === password);

      if (user) {
        localStorage.setItem('userId', user.id);
        localStorage.setItem('userEmail', user.email);
        
        toast.info("Lütfen profil bilgilerinizi tamamlayın");
        setIsAuthenticated(true);

        // Navigate based on accountType
        if (user.accountType === "personal" ) {
          navigate('/home');
        } else if (user.accountType === "business") {
          navigate('/home');
        } else {
          navigate('/ProfileDetails'); // default navigation if accountType is missing
        }
         
      } else {
        setError("Geçersiz email veya şifre.");
        toast.error("Geçersiz email veya şifre.");
      }
    } catch (error) {
      console.error("Giriş sırasında hata oluştu:", error);
      setError("Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.");
      toast.error("Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.");
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
        <h1>Giriş Yap</h1>
        <span>Hesabınızı kullanın</span>
        {error && <p style={{ color: 'red' }}>{error}</p>}
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
          placeholder="Şifre"
          value={state.password}
          onChange={handleChange}
        />
        <a href="#">Şifrenizi mi unuttunuz?</a>
        <button>Giriş Yap</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default SignInForm;
