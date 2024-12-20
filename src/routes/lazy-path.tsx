import { lazy } from "react";

import { Loading } from "@/components/shared/loading";
import withSuspense from "@/hocs/with-suspense";

const LoadingComponent = () => <Loading />;

// USER PAGES---------------------------------------------------------------------------------------------------------------------------
export const UserHomePage = withSuspense(
    lazy(() => import("@/pages/(user)/home/home")),
    <LoadingComponent />
);
export const UserMeasurementPage = withSuspense(
    lazy(() => import("@/pages/(user)/measurement/measurement")),
    <LoadingComponent />
);

// ADMIN PAGES--------------------------------------------------------------------------------------------------------------------------
export const AdminHomePage = withSuspense(
    lazy(() => import("@/pages/(admin)/home/home")),
    <LoadingComponent />
);

export const AdminUserManagerPage = withSuspense(
    lazy(() => import("@/pages/(admin)/managers/user/user")),
    <LoadingComponent />
);

export const AdminMeterManagerPage = withSuspense(
    lazy(() => import("@/pages/(admin)/managers/meter/meter")),
    <LoadingComponent />
);

export const AdminLocationManagerPage = withSuspense(
    lazy(() => import("@/pages/(admin)/managers/location/location")),
    <LoadingComponent />
);

export const AdminMeasurementManagerPage = withSuspense(
    lazy(() => import("@/pages/(admin)/managers/measurement/measurement")),
    <LoadingComponent />
);

export const AdminInvoiceManagerPage = withSuspense(
    lazy(() => import("@/pages/(admin)/managers/invoice/invoice")),
    <LoadingComponent />
);

// AUTH PAGES--------------------------------------------------------------------------------------------------------------------------
export const AuthLoginPage = withSuspense(
    lazy(() => import("@/pages/(auth)/login/login")),
    <LoadingComponent />
);

export const AuthRegisterPage = withSuspense(
    lazy(() => import("@/pages/(auth)/register/register")),
    <LoadingComponent />
);
