import { cn } from "@/lib/utils";
import { RootState } from "@/stores/store";
import { useSelector } from "react-redux";

interface IPageWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const PageWrapper = ({ children }: IPageWrapperProps) => {
    const toggleCollapse = useSelector(
        (state: RootState) => state.sidebar.toggleCollapse
    );

    return (
        <div
            className={cn(
                "bg-sidebar flex-grow text-sidebar-foreground p-2 mt-16",
                toggleCollapse ? "sm:pl-[18rem]" : "sm:pl-[5.6rem]"
            )}
        >
            {children}
        </div>
    );
};
