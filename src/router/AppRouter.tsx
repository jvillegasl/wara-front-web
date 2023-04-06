import { useRoutes } from "react-router-dom";
import { authRoutes, nonAuthRoutes, publicRoutes } from "./routes";

export function AppRouter() {
    const routes = useRoutes([authRoutes, nonAuthRoutes, publicRoutes]);

    return routes;
}
