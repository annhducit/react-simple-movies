import { useEffect, useState } from "react";

function useDebounce(initialValue, delay = 500) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        const timer = setTimeout(() => {
            setValue(initialValue);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [initialValue, delay]);

    return value;
}

export default useDebounce;
