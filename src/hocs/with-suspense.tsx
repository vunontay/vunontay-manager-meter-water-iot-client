import { ComponentType, FC, Suspense } from "react";

const withSuspense = <T extends JSX.IntrinsicAttributes>(
    WrappedComponent: ComponentType<T>,
    fallback: React.ReactNode = null
): FC<T> => {
    return function SuspendedComponent(props: T) {
        return (
            <Suspense fallback={fallback}>
                <WrappedComponent {...props} />
            </Suspense>
        );
    };
};

export default withSuspense;
