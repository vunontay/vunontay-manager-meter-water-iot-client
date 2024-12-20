import { createSlice } from "@reduxjs/toolkit";

interface SidebarState {
    toggleCollapse: boolean;
}

const initialState: SidebarState = {
    toggleCollapse: false,
};

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        invokeToggleCollapse(state) {
            state.toggleCollapse = !state.toggleCollapse;
        },
        closeCollapse(state) {
            state.toggleCollapse = false;
        },
    },
});

export const { invokeToggleCollapse, closeCollapse } = sidebarSlice.actions;
export default sidebarSlice.reducer;
