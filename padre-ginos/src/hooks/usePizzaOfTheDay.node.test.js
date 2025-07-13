import { expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import createFetchMock from "vitest-fetch-mock";
import { usePizzaOfTheDay } from "./usePizzaOfTheDay";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const testPizza = {
  id: "calabrese",
  name: "The Calabrese Pizza",
  category: "Supreme",
  description: "lol pizza from Calabria",
  image: "/public/pizzas/calabrese.webp",
  sizes: {
    S: 12.25,
    M: 16.25,
    L: 20.25,
  },
};

it("gives null when first called", () => {
  fetchMocker.mockResponse(JSON.stringify(testPizza));

  const { result } = renderHook(() => usePizzaOfTheDay());
  expect(result.current).toBeNull();
});

it("to call the api and gives back to pizza of the day", async () => {
  fetchMocker.mockResponse(JSON.stringify(testPizza));

  const { result } = renderHook(() => usePizzaOfTheDay());

  await waitFor(() => {
    expect(result.current).toBeNull();
  });
  expect(fetchMocker).toBeCalledWith("/api/pizza-of-the-day");
});
