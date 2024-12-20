import { ROUTE_URL } from "@/constants/route";
import AdminLayout from "@/layouts/(admin)/admin";
import AuthLayout from "@/layouts/(auth)/auth";
import UserLayout from "@/layouts/(user)/user";
import NotFoundPage from "@/pages/not-found";
import {
    AdminHomePage,
    AdminInvoiceManagerPage,
    AdminLocationManagerPage,
    AdminMeasurementManagerPage,
    AdminMeterManagerPage,
    AdminUserManagerPage,
    AuthLoginPage,
    AuthRegisterPage,
    UserHomePage,
    UserMeasurementPage,
} from "@/routes/lazy-path";
import { AdminProtectedRouter, ProtectedRouter } from "@/routes/middleware";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    //USER ROUTES ----------------------------------------------------------------------------------------

    {
        path: `${ROUTE_URL.USER.INDEX}`,
        element: <UserLayout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: `${ROUTE_URL.USER.INDEX}`,
                element: <UserHomePage />,
            },
            {
                path: `${ROUTE_URL.USER.MEASUREMENT}`,
                element: <UserMeasurementPage />,
            },
        ],
    },
    //ADMIN ROUTES ---------------------------------------------------------------------------------------
    {
        path: `${ROUTE_URL.ADMIN.INDEX}`,
        element: (
            <ProtectedRouter>
                <AdminLayout />
            </ProtectedRouter>
        ),
        errorElement: <NotFoundPage />,
        children: [
            {
                path: `${ROUTE_URL.ADMIN.INDEX}`,
                element: (
                    <AdminProtectedRouter>
                        <AdminHomePage />
                    </AdminProtectedRouter>
                ),
            },
            {
                path: `${ROUTE_URL.ADMIN.MANAGER.USERS}`,
                element: (
                    <AdminProtectedRouter>
                        <AdminUserManagerPage />
                    </AdminProtectedRouter>
                ),
            },

            {
                path: `${ROUTE_URL.ADMIN.MANAGER.METERS}`,
                element: (
                    <AdminProtectedRouter>
                        <AdminMeterManagerPage />
                    </AdminProtectedRouter>
                ),
            },

            {
                path: `${ROUTE_URL.ADMIN.MANAGER.LOCATION}`,
                element: (
                    <AdminProtectedRouter>
                        <AdminLocationManagerPage />
                    </AdminProtectedRouter>
                ),
            },

            {
                path: `${ROUTE_URL.ADMIN.MANAGER.MEASUREMENT}`,
                element: (
                    <AdminProtectedRouter>
                        <AdminMeasurementManagerPage />
                    </AdminProtectedRouter>
                ),
            },

            {
                path: `${ROUTE_URL.ADMIN.MANAGER.INVOICE}`,
                element: (
                    <AdminProtectedRouter>
                        <AdminInvoiceManagerPage />
                    </AdminProtectedRouter>
                ),
            },
        ],
    },

    //ADMIN ROUTES ---------------------------------------------------------------------------------------
    {
        path: `${ROUTE_URL.AUTH.INDEX}`,
        element: <AuthLayout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: `${ROUTE_URL.AUTH.LOGIN}`,
                element: <AuthLoginPage />,
            },
            {
                path: `${ROUTE_URL.AUTH.REGISTER}`,
                element: <AuthRegisterPage />,
            },
        ],
    },
]);
