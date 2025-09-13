import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
// import ProductList from "../pages/Marketplace/ProductList";
// import ProductDetail from "../pages/Marketplace/ProductDetail";
// import ProductCreate from "../pages/Marketplace/ProductCreate";
// import Profile from "../pages/Profile/MyProfile";
// import ProtectedRoute from "./ProtectedRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* 인증 관련 페이지 */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 인증이 필요한/없는 페이지들 */}
        <Route path="/" element={<Layout />}>
          {/* <Route path="products" element={<ProductList />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route
            path="products/new"
            element={
              <ProtectedRoute>
                <ProductCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
