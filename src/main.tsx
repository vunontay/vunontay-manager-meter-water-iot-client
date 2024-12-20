// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store, { persistor } from "@/stores/store.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistGate } from "redux-persist/integration/react";
// Create a client
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
    // <StrictMode>
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <PersistGate
                    loading={<div>Loading...</div>}
                    persistor={persistor}
                >
                    <App />
                </PersistGate>
            </Provider>
        </QueryClientProvider>
    </Provider>
    // </StrictMode>,
);
