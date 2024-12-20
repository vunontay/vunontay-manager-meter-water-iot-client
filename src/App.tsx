import { RouterProvider } from "react-router-dom";
import { router } from "@/routes/routes";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/shared/theme-provider";

function App() {
    return (
        <>
            <Toaster
                position="top-center"
                expand={true}
                richColors
                closeButton
            />
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <RouterProvider router={router} />
            </ThemeProvider>
        </>
    );
}

export default App;
