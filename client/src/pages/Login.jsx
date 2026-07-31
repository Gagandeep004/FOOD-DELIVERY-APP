import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "../styles/auth.css";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const data = await loginUser(formData);

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            switch (data.user.role) {

                case "customer":
                    navigate("/customer");
                    break;

                case "restaurant":
                    navigate("/restaurant");
                    break;

                case "delivery":
                    navigate("/delivery");
                    break;

                case "admin":
                    navigate("/admin");
                    break;

                default:
                    navigate("/");
            }

        } catch (error) {

            alert(
                error.response?.data?.message ||
                error.message ||
                "Login Failed"
            );

        }

    };

    return (

        <div className="container">

            <div className="card">

                <h1>Food Delivery</h1>

                <h2>Login</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />

                    <button>

                        Login

                    </button>

                </form>

                <p>

                    Don't have an account?

                    <Link to="/register">

                        Register

                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Login;
