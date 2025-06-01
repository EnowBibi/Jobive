import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import './index.css';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";
import SignUpFreelancer from "./routes/SignUpFreeLancer";
import SignUpSelection from "./routes/SignUpSelection";
import SignUpEmployer from "./routes/SignUpEmployer";
import Create from "./routes/Create";
import Earnings from "./routes/Earnings";
import Jobs from "./routes/Jobs";
import MoreJobs from "./routes/MoreJobs";
import Freelancers from "./routes/Freelancers";
import JobCreation from "./routes/jobCreation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/morejobs",
    element: <MoreJobs/>,
  },
  {
    path: "/freelancers",
    element: <Freelancers/>,
  },
  {
    path: "/signupselection",
    element: <SignUpSelection/>,
  },
  {
    path: "/signupfreelancer",
    element: <SignUpFreelancer/>,
  },
  {
    path: "/signupemployer",
    element: <SignUpEmployer/>,
  },
  {
    path: "/jobcreation",
    element: <JobCreation/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
  },
  {
    path: "/jobs",
    element: <Jobs/>,
  },
  {
    path: "/earnings",
    element: <Earnings/>,
  },
  {
    path: "/create",
    element: <Create/>,
  },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />
);
