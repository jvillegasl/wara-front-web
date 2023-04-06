import { Navigate, RouteObject } from "react-router-dom";

export const publicRoutes: RouteObject = {
    path: "*",
    element: <Navigate to="/" replace />,
};
