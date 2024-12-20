import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { ROUTE_URL } from "@/constants/route";
import { RootState } from "@/stores/store";

// ProtectedRouter to handle general authenticated users
const ProtectedRouter = ({ children }: { children: ReactNode }) => {
    const user = useSelector((state: RootState) => state.auth.accessToken);

    return user ? (
        <>{children}</>
    ) : (
        <Navigate to={`${ROUTE_URL.AUTH.INDEX}/${ROUTE_URL.AUTH.LOGIN}`} />
    );
};

// AdminProtectedRouter to handle authenticated admins
const AdminProtectedRouter = ({ children }: { children: ReactNode }) => {
    const user = useSelector((state: RootState) => state.auth);

    return user && user.role === "admin" ? (
        <>{children}</>
    ) : (
        <Navigate to={`${ROUTE_URL.AUTH.INDEX}/${ROUTE_URL.AUTH.LOGIN}`} />
    );
};

export { ProtectedRouter, AdminProtectedRouter };
