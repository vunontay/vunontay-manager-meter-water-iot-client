import Footer from "@/components/shared/(user)/footer";
import Header from "@/components/shared/(user)/header";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
    return (
        <main>
            <Header />
            <Outlet />
            <Footer />
        </main>
    );
};

export default UserLayout;
