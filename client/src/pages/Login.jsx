import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../store/auth";
import { useState } from "react";
export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  // const { saveTokenInLocalStr } = useAuth();
  const navigate = useNavigate();
  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
    if (name === "email" && /[A-Z]/.test(value)) {
      // If the entered value for email contains uppercase letters
      alert("Please use lowercase letters for email");
    }
  };
  // handle form on submit
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log("after login: ", responseData);
        // toast.success("Registration Successful");
        // saveTokenInLocalStr(responseData.token);
        alert("Login Succesfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
              </div>
              {/* our main registration code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Login form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                      required
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Register Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
  };