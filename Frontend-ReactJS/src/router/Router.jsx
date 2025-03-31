import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
// Components
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Loader from "../components/Loader/Loader";
// Pages
import Home from '../pages/Home/Home';
import Terms from "../pages/Terms/Terms";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import DeletedAccount from "../pages/DeletedAccount/DeletedAccount"
// Protected pages
import ProtectedUserRoute from "./ProtectedRoute"; //wrapper
import Dashboard from "../pages/Dashboard/Dashboard";

const Router = () => {
 //Loader
 const loaderDisplay = useSelector((state) => state.loader.display);

 return (
  <BrowserRouter>
   {loaderDisplay ? <Loader></Loader> : ""}
   <Header />
   <Routes>
    <Route index element={<Home />} />
    <Route exact path="/" element={<Home />} />
    <Route exact path="terms" element={<Terms />} />
    <Route exact path="login" element={<Login />} />
    <Route exact path="signup" element={<Signup />} />
    <Route exact path="deletedAccount" element={<DeletedAccount />} />
    <Route element={<ProtectedUserRoute />}>
     <Route index element={<Navigate to="dashboard" replace />} />
     <Route path="dashboard" element={<Dashboard />} />
    </Route>
   </Routes>
   <Footer />
  </BrowserRouter>
 )
}
export default Router