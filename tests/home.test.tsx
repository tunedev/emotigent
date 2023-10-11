import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import HomerPage from "../app/page";

vi.mock("@clerk/nextjs", () => ({
  auth: () => ({ userId: "raasadffjonouian" }),
  ClerkProvider: ({ children }) => <div>{children}</div>,
  useUsers: () => ({
    isSignedIn: true,
    user: {
      id: "user_2WRLN6soF29drfMY9FgSx2Iu3aI",
      fullName: "Charles Babbage",
    },
  }),
}));

vi.mock("next/font/google", () => ({
  Inter: () => ({ className: "inter" }),
}));

test("Home", async () => {
  render(HomerPage());
  expect(screen.getByText("Map Your Emotions Through Journaling")).toBeTruthy();
});
