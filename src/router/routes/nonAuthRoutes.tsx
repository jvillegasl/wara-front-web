import { RouteObject } from "react-router-dom";
import { GuardedRoute } from "../GuardedRoute";
import { Login } from "@/pages";
import { isAuthenticated } from "@/utils";

export const nonAuthRoutes: RouteObject = {
    element: (
        <GuardedRoute canAccess={() => !isAuthenticated()} redirectTo="/" />
    ),
    children: [
        {
            path: "/login",
            element: <Login />,
        },
    ],
};
