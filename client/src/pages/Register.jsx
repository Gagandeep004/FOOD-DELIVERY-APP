import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import "../styles/auth.css";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        name: "",

        email: "",

        password: "",

        phone: "",

        role: "customer"

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

            await registerUser(formData);

            alert("Registration Successful");

            navigate("/");

        }

        catch (error) {

            console.error("Register error:", error);
            alert(
                error.response?.data?.message ||
                error.message ||
                "Registration Failed"
            );

        }

    };

    return (

        <div className="container">

            <div className="card">

                <h1>Create Account</h1>

                <form onSubmit={handleSubmit}>

                    <input
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                    />

                    <input
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                    />

                    <input
                        name="phone"
                        placeholder="Phone"
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />

                    <select
                        name="role"
                        onChange={handleChange}
                    >

                        <option value="customer">

                            Customer

                        </option>

                        <option value="restaurant">

                            Restaurant

                        </option>

                        <option value="delivery">

                            Delivery Partner

                        </option>

                    </select>

                    <button>

                        Register

                    </button>

                </form>

                <p>

                    Already Registered?

                    <Link to="/">

                        Login

                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Register;