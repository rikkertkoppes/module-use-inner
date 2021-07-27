# use-inner

This is a very simple wrapper around Reacts `useState`. The entire implementation is this:

```typescript
export const useInner = <T>(
    outer: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
    let [inner, setInner] = React.useState<T>(outer);
    React.useEffect(() => {
        setInner(outer);
    }, [outer]);
    return [inner, setInner];
};
```

# usage

use `useInner` as a local shallow copy of some prop from outside. One place I use this a lot is where a default value is given through props (which may change), but there is also an inner state.

```
npm install @rkmodules/use-inner
```

```typescript
import useInner from "@rkmodules/use-inner";
```

# examples

## "lazy" input, that only updates the outside on blur

```tsx
function LazyInput({ value, onChange }) {
    let [inner, setInner] = useInner(value);
    // inner now changes whenever value changes, but also on setInner

    const handleChange = (e) => {
        setInner(e.target.value);
    };
    const handleBlur = (e) => {
        onChange(inner);
    };

    return <input value={inner} onChange={handleChange} onBlur={handleBlur} />;
}
```

# project setup

followed https://www.twilio.com/blog/2017/06/writing-a-node-module-in-typescript.html for project setup
