import { expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Cart } from "./Cart";

it("snapshot with nothing in cart", () => {
  const { asFragment } = render(<Cart cart={[]} />);

  expect(asFragment()).toMatchSnapshot();
});
