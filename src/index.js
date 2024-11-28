import React, { lazy, Suspense } from "react";
import "./index.css";
import "flowbite";
import "tw-elements";
import "tailwindcss/tailwind.css";
import ReactDOM from "react-dom/client";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import './i18n';
import { Toaster } from "react-hot-toast";
import ProtectedRouterLog from "./ProtectedRouteLog";
import LottieHandler from "./components/Lottie/LottieHandler";
import Loader from "./components/Assets/loader.json";
import App from "./App";
import NotFound from "./components/NotFound";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Developers from "./components/Developers";
import ForgetPassword from "./components/Password/ForgetPassword";
import ResetPassword from "./components/Password/ResetPassword";
import TeacherComp from "./components/TeacherComp/TeacherComp";
const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const Tetsh = lazy(() => import("./components/Tetsh"));
const Chat = lazy(() => import("./components/Chat"));
const TeacherS = lazy(() => import("./components/TeacherS"));
const Login = lazy(() => import("./components/Login/Login"));
const Register = lazy(() => import("./components/Register/Register"));
const Teacher = lazy(() => import("./components/Teacher"));
const Support = lazy(() => import("./components/Support"));
const LiveStreamingPage = lazy(() => import("./components/Sessions/LiveStreamingPage"));
const VideoConference = lazy(() => import("./components/Sessions/VideoConference"));
const AddQuestions = lazy(() => import("./components/Quiz/AddQuestions"));
const RoutingSting = lazy(() => import("./components/Profile/RoutingSting"));
const DesignWallet = lazy(() => import("./components/Wallet/DesignWallet"));

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("accessToken");
  return token ? children : <Navigate to="/LogIn" />;
}

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "Login",
        element: (
          <ProtectedRouterLog>
            <Suspense fallback={<LottieHandler animationData={Loader} />}>
              <Login />
            </Suspense>
          </ProtectedRouterLog>
        ),
      },
      {
        path: "Login/:forgetpassword",
        element: (
          <ProtectedRouterLog>
            <Suspense fallback={<LottieHandler animationData={Loader} />}>
              <Login />
            </Suspense>
          </ProtectedRouterLog>
        ),
      },
      {
        index: true,
        path: "/",
        element: (
          <Suspense fallback={<LottieHandler animationData={Loader} />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "teth",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LottieHandler animationData={Loader} />}>
              <Tetsh />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<LottieHandler animationData={Loader} />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "Privacy-Policy",
        element: (
          <Suspense fallback={<LottieHandler animationData={Loader} />}>
            <PrivacyPolicy />
          </Suspense>
        ),
      },
      {
        path: "forgetPassword",
        element: (
          <Suspense fallback={<LottieHandler animationData={Loader} />}>
            <ForgetPassword />
          </Suspense>
        ),
      },
      {
        path: "resetPassord",
        element: (
          <Suspense fallback={<LottieHandler animationData={Loader} />}>
            <ResetPassword />
          </Suspense>
        ),
      },
      {
        path: "Developers",
        element: (
          <Suspense fallback={<LottieHandler animationData={Loader} />}>
            <Developers />
          </Suspense>
        ),
      },
      {
        path: "Dashboard",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LottieHandler animationData={Loader} />}>
              <Dashboard />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "chat",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LottieHandler animationData={Loader} />}>
              <Chat />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "TeacherS",
        element: (
          <Suspense fallback={<LottieHandler animationData={Loader} />}>
            <TeacherS />
          </Suspense>
        ),
      },
      {
        path: "TeacherCards",
        element: (
          <Suspense fallback={<LottieHandler animationData={Loader} />}>
            <TeacherComp />
          </Suspense>
        ),
      },
      {
        path: "TeacherS/:Teacher",
        element: (
          <Suspense fallback={<LottieHandler animationData={Loader} />}>
            <Teacher />
          </Suspense>
        ),
      },
      {
        path: "TeacherCards/:Teacher",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LottieHandler animationData={Loader} />}>
              <Teacher />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/Session/:SingleSession",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LottieHandler animationData={Loader} />}>
              <LiveStreamingPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "register",
        element: (
          <ProtectedRouterLog>
            <Suspense fallback={<LottieHandler animationData={Loader} />}>
              <Register />
            </Suspense>
          </ProtectedRouterLog>
        ),
      },
      {
        path: "support",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LottieHandler animationData={Loader} />}>
              <Support />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "Session/:SingleSession/VideoConference",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LottieHandler animationData={Loader} />}>
              <VideoConference />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "addQuestion",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LottieHandler animationData={Loader} />}>
              <AddQuestions />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "setting",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LottieHandler animationData={Loader} />}>
              <RoutingSting />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "wallet",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LottieHandler animationData={Loader} />}>
              <DesignWallet />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "*", // This will catch all undefined routes
        element: <NotFound />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster position="top-center" reverseOrder={false} />
  </React.StrictMode>
);