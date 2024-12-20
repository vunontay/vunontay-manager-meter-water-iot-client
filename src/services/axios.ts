import { setTokens } from "@/stores/slices/auth";
import store from "@/stores/store";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/v1",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const accessToken = state.auth.accessToken;

        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
    refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
    refreshSubscribers.map((cb) => cb(token));
    refreshSubscribers = [];
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            (error.response?.status === 401 ||
                error.response?.status === 403) &&
            !originalRequest._retry
        ) {
            if (isRefreshing) {
                return new Promise((resolve) => {
                    subscribeTokenRefresh((token: string) => {
                        originalRequest.headers["Authorization"] =
                            "Bearer " + token;
                        resolve(axiosInstance(originalRequest));
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const state = store.getState();
            const { refreshToken, role, _id } = state.auth;

            if (refreshToken) {
                try {
                    const response = await axios.post(
                        `${axiosInstance.defaults.baseURL}/auth/refresh-access-token`,
                        { refreshToken }
                    );

                    const { newAccessToken } = response.data.data.tokens;

                    store.dispatch(
                        setTokens({
                            accessToken: newAccessToken,
                            refreshToken,
                            role: role as string,
                            _id: _id as string,
                        })
                    );

                    axiosInstance.defaults.headers["Authorization"] =
                        "Bearer " + newAccessToken;
                    onRefreshed(newAccessToken);

                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    console.error("Error refreshing token:", refreshError);
                    // Handle refresh token failure (e.g., logout user)
                    // store.dispatch(logoutUser());
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }
        }

        return Promise.reject(error.response?.data || error.response);
    }
);

export default axiosInstance;
