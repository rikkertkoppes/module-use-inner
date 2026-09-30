import React from "react";

/**
 * Creates a state that depends on an outside state.
 * Updates when outer state changes, but allows for inner changes.
 * Useful for input fields that only need to set values on
 * button press or enter
 */
export const useInner = <T>(
    outer: T,
    watch?: any[]
): [T, React.Dispatch<React.SetStateAction<T>>] => {
    let [inner, setInner] = React.useState<T>(outer);
    React.useEffect(() => {
        setInner(outer);
    }, watch || [outer]);
    return [inner, setInner];
};

export default useInner;
