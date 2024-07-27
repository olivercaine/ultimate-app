import { render } from "@testing-library/react";

import Home from "./page";

describe.skip("Home", () => {
  it("should renders a heading", () => {
    const { getByText } = render(<Home />);
    expect(getByText("Hello World!")).toBeVisible();
  });
});
