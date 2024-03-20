import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios"
export const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch("http://localhost:5000/api/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log("response data : ", response);
      if (response.ok) {
        const responseData = await response.json();
        alert("registration successful");
        setUser({ firstName: "",lastName: "", email: "", phone: "", password: "" });
        navigate("/login");
        console.log(responseData);
      } else {
        console.log("error inside response ", "error");
      }
    } catch (error) {
      console.error("Error", error);
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
                <h1 className="main-heading mb-3">registration form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="firstname">First name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={user.firstName}
                      onChange={handleInput}
                      placeholder="firstname"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastname">Lastname</label>
                    <input
                      type="text"
                      name="lastName"
                      value={user.lastName}
                      onChange={handleInput}
                      placeholder="lastname"
                      required
                    />
                  </div>
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
                    <label htmlFor="phone">phone</label>
                    <input
                      type="number"
                      name="phone"
                      value={user.phone}
                      onChange={handleInput}
                      placeholder="phone"
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