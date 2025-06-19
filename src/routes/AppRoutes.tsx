import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import Home from "@/pages/Home";
import Cart from "@/pages/Cart";
import Product from "@/pages/product/Product";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Profile from "@/pages/Profile";
import CategoryPage from "@/pages/category/CategoryPage";
import ChildCategoryPage from "@/pages/category/ChildCategoryPage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/category/:categoryName/:categoryId" element={<CategoryPage />} />
        <Route path="/category/child/:categoryId" element={<ChildCategoryPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;