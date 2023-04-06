import { Navigate, Outlet } from "react-router-dom";

type GuardedRouteProps = {
    canAccess: () => boolean;
    redirectTo: string;
};

export function GuardedRoute({ canAccess, redirectTo }: GuardedRouteProps) {
    if (canAccess()) return <Outlet />;

    return <Navigate to={redirectTo} replace />;
}
