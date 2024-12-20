import { Header } from "@/components/shared/(admin)/header";
import { Sidebar } from "@/components/shared/(admin)/sidebar";
import { PageWrapper } from "@/components/shared/page-wrapper";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <main className="flex min-h-screen">
            <Sidebar />
            <Header />
            <PageWrapper>
                <Outlet />
            </PageWrapper>
        </main>
    );
};

export default AdminLayout;
