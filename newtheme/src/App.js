import "./assets/css/tailwind.css";
import "./assets/css/materialdesignicons.min.css";
import { Route, Routes } from "react-router-dom";
import Index from "./pages";
import Blog from "./pages/blog";
import Framework from "./pages/framework";
import IndexThree from "./pages/index-three";
import IndexLight from "./pages/index-light";
import AboutUs from "./pages/aboutus";
import Pricing from "./pages/pricing";
import Services from "./pages/services";
import BlogDetails from "./pages/blog-detail";
import Helpcenter from "./pages/helpcenter";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ResetPassword from "./pages/reset-password";
import Terms from "./pages/terms";
import Privacy from "./pages/privacy";
import Error from "./pages/error";
import Contact from "./pages/contact";
import Navbar from "./components/navbar";
import Features from "./pages/features";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/agentframework" element={<Framework />} />
        <Route path="/index-three" element={<IndexThree />} />
        <Route path="/index-light" element={<IndexLight />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog-detail" element={<BlogDetails />} />
        <Route path="/blog-detail/:id" element={<BlogDetails />} />
        <Route path="/helpcenter" element={<Helpcenter />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Error />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
