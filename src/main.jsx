import * as React from "react";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    Link,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import './reset.css'

import Make from "./pages/Make/Make.jsx";
import Test from "./pages/Test/Test.jsx";
import Home from "./pages/Home/Home.jsx";


let router = createBrowserRouter([
        {
            path: "/",
            element: (
                <Layout />
            ),
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/make",
                    element: <Make />,
                },
                {
                    path: "/test",
                    element: <Test />,
                },
            ]
        },
]);




createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);