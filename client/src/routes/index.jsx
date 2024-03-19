import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import AppContainer from "./AppContainer";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MoviesPage from "../pages/MoviesPage";
import ProfilePage from "../pages/ProfilePage";
import AdminProfilePage from "../pages/Admin/AdminProfilePage";
import MovieDetailsPage from "../pages/MovieDetailsPage";
import BookSeatsPage from "../pages/BookSeats";
import SuccessPage from "../pages/Success";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: (
          <AppContainer>
            <MoviesPage />
          </AppContainer>
        ),
        index: true,
      },
      {
        element: (
          <AppContainer>
            <ProfilePage />
          </AppContainer>
        ),
        path: "/profile",
      },
      {
        element: (
          <AppContainer>
            <AdminProfilePage />
          </AppContainer>
        ),
        path: "/admin",
      },
      {
        element: (
          <AppContainer>
            <MovieDetailsPage />
          </AppContainer>
        ),
        path: "/movie/:id",
      },
      {
        path: "/book-show/:showId",
        element: (
          <AppContainer>
            <BookSeatsPage />
          </AppContainer>
        ),
      },
      {
        path: "/success",
        element: <SuccessPage />,
      },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
