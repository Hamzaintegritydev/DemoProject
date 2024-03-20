import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import CategoryPage from "./components/Category";


const App = () =>{
  return <>


  
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/category" element={<CategoryPage />} />
    </Routes>
    </BrowserRouter>


  
        
  </>
}

export default App;