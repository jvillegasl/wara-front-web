import { RouteObject } from "react-router-dom";
import { GuardedRoute } from "../GuardedRoute";
import { Home, New } from "@/pages";
import { isAuthenticated } from "@/utils";

export const authRoutes: RouteObject = {
    element: <GuardedRoute canAccess={isAuthenticated} redirectTo="/login" />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/new",
            element: <New />,
        },
    ],
};
