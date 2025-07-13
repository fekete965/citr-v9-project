import { render } from "vitest-browser-react";
import { expect, it } from "vitest";
import { Pizza } from "./Pizza";

it("alt test renders on Pizza images", async () => {
  const name = "My favourite pizza";
  const description = "Cool browser stuff";
  const src = "https://picsum.photos/200";

  const screen = render(
    <Pizza name={name} description={description} image={src} />,
  );

  const img = await screen.getByRole("img");
  await expect.element(img).toBeInTheDocument();
  await expect.element(img).toHaveAttribute("src", src);
  await expect.element(img).toHaveAttribute("alt", name);
});
