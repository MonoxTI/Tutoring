import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Nav.jsx'
import About from "./Pages/About.jsx";
import Staff from "./Pages/Staff.jsx";
import Services from "./Pages/Services.jsx";
import Bookings from "./Pages/Bookings.jsx";
import Alumni from "./Pages/Alumni.jsx";
import Contact from "./Pages/Contact.jsx";
import Footer from "./Components/Footer.jsx";

function App() {
  

  return (
    <>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/services" element={<Services />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/alumni" element={<Alumni />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
