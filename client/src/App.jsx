import React from "react";
import { Routes, Route, Navigate, ScrollRestoration } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import axios from "axios";
import { useSelector } from "react-redux";
import { PostDetails } from "./pages/PostDetails";
import MyProfilePage from "./pages/MyProfilePage";
import CreatePostPage from "./pages/CreatePostPage";
import { PostListPage } from "./pages/PostListPage";
import BookmarkPage from "./pages/Bookmark";


// Custom public route component
const PublicRoute = ({ element, isAuthenticated, ...rest }) => {
  return isAuthenticated ? <Navigate to="/" /> : element;
};

// Custom private route component
const PrivateRoute = ({ element, isAuthenticated, ...rest }) => {
  console.log(element, isAuthenticated);

  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  const { token } = useSelector((state) => state?.auth);
  axios.defaults.headers.common["Authorization"] = token;
  axios.defaults.baseURL =
    "https://bloggenius.onrender.com";
  // Check if the user is authenticated based on the token
  const isAuthenticated = !!token;

  axios.interceptors.response.use(
    (response) => response,

    (error) => {
      // console.log("resss",response)
      const { response } = error;
      let errorObj = { error: response };

      switch (response?.status) {
        case 401:
          // Handle 401 unauthorized error, maybe redirect to login
          break;
        case 404:
        case 403:
          errorObj.error = response?.data?.message;
          break;
        case 400:
          errorObj = {
            errorType: "fieldError",
            error: response.data,
          };
          break;
        case 422:
          errorObj.error = response.data?.errors;
          break;
        case 409:
          errorObj.error = response.data;
          break;
        default:
          break;
      }

      return Promise.reject(errorObj);
    }
  );

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        replace={true}
        element={
          <PublicRoute
            isAuthenticated={isAuthenticated}
            element={<LoginPage />}
          />
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute
            isAuthenticated={isAuthenticated}
            element={<RegistrationPage />}
          />
        }
      />

      {/* Private Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route
          path="/"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              element={<PostListPage />}
            />
          }
        />
        <Route
          path="/:id"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              element={<PostDetails />}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              element={<MyProfilePage />}
            />
          }
        />
        <Route
          path="/create-new-post"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              element={<CreatePostPage />}
            ></PrivateRoute>
          }
        ></Route>
        <Route
          path="/update-post/:id"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              element={<CreatePostPage update={"update"} />}
            ></PrivateRoute>
          }
        ></Route>
        <Route
          path="/my-bookmark-post"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              element={<BookmarkPage />}
            ></PrivateRoute>
          }
        ></Route>
      </Route>
    </Routes>
  );
};

export default App;
