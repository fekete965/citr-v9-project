import { render, cleanup } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { Pizza } from "./Pizza";

afterEach(() => {
  cleanup();
});

it("alt test renders on Pizza images", () => {
  const name = "My favourite pizza";
  const description = "Super cool pizza";
  const src = "https://picsum.photos/200";

  const screen = render(
    <Pizza name={name} description={description} image={src} />,
  );

  const img = screen.getByRole("img");
  expect(img.src).toBe(src);
  expect(img.alt).toBe(name);
});

it("to have default image if none is provided", () => {
  const name = "A meeh pizza";
  const description = "Naaah...";

  const screen = render(<Pizza name={name} description={description} />);

  const img = screen.getByRole("img");
  expect(img.src).not.toBe("");
  expect(img.alt).toBe(name);
});
