import { useEffect, useRef, useState } from "react";

// Making the hook generic so it can handle any type
export const useDebounce = <T>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    const timerRef = useRef<number | undefined>();

    useEffect(() => {
        // Clear the previous timer if value or delay changes before it expires
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        // Set a new timer to update debouncedValue after delay
        timerRef.current = window.setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup function to clear the timer if the component unmounts or if value/delay changes
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [value, delay]);

    return debouncedValue;
};
