import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";
import UserProvider from "./context/userContext.js";

import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail.jsx";
import REgister from "./pages/REgister";
import LoginPage from "./pages/LoginPage";
import UserProfile from "./pages/UserProfile.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import EditPost from "./pages/EditPost.jsx";
import LogoutPage from "./pages/LogoutPage.jsx";
import Categoryposts from "./pages/Categoryposts.jsx";
import Authors from "./pages/Authors.jsx";
import AuthorPosts from "./pages/AuthorPosts.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DeletePost from "./pages/DeletePost.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserProvider>
        <Layout />
      </UserProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "posts/:id", element: <PostDetail /> },
      { path: "register", element: <REgister /> },
      { path: "login", element: <LoginPage /> },
      { path: "profile/:id", element: <UserProfile /> },
      { path: "createpost", element: <CreatePost /> },
      { path: "posts/categories/:category", element: <Categoryposts /> },
      { path: "posts/:id/edit", element: <EditPost /> },
      { path: "posts/:id/delete", element: <DeletePost /> },
      { path: "logout", element: <LogoutPage /> },
      { path: "posts/users/:id", element: <AuthorPosts /> },
      { path: "authors", element: <Authors /> },
      { path: "myposts/:id", element: <Dashboard /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
