/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "@testing-library/react";

import useInner from "..";

function TestComponent({ value }: { value: string }) {
    let [inner, setInner] = useInner(value);
    return (
        <div data-testid="testcomponent" onClick={() => setInner("foo")}>
            {inner}
        </div>
    );
}

function TestComponentWithWatch({
    value,
    watched,
}: {
    value: string;
    watched: string;
}) {
    let [inner, setInner] = useInner(value, [watched]);
    return (
        <div data-testid="testcomponent" onClick={() => setInner("foo")}>
            {inner}
        </div>
    );
}

describe("useInner", () => {
    test("initial state should be copied from value", () => {
        let { getByTestId } = render(<TestComponent value="moo" />);
        let div = getByTestId("testcomponent");
        expect(div.textContent).toBe("moo");
    });
    test("clicking should change inner state", () => {
        let { getByTestId } = render(<TestComponent value="moo" />);
        let div = getByTestId("testcomponent");
        div.click();
        expect(div.textContent).toBe("foo");
    });
    test("changing prop after inner change should change the value", () => {
        let { getByTestId, rerender } = render(<TestComponent value="moo" />);
        let div = getByTestId("testcomponent");
        div.click();
        rerender(<TestComponent value="qux" />);
        expect(div.textContent).toBe("qux");
    });
    test("adding a watch list should no longer watch the outer prop", () => {
        let { getByTestId, rerender } = render(
            <TestComponentWithWatch value="moo" watched="bar" />
        );
        let div = getByTestId("testcomponent");
        div.click();
        rerender(<TestComponentWithWatch value="qux" watched="bar" />);
        expect(div.textContent).toBe("foo");
    });
    test("adding a watch list should watch the watch list", () => {
        let { getByTestId, rerender } = render(
            <TestComponentWithWatch value="moo" watched="bar" />
        );
        let div = getByTestId("testcomponent");
        div.click();
        rerender(<TestComponentWithWatch value="qux" watched="baz" />);
        expect(div.textContent).toBe("qux");
    });
});
