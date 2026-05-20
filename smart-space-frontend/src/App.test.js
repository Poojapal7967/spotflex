import { render, screen } from "@testing-library/react";
jest.mock(
  "react-router-dom",
  () => ({
    BrowserRouter: ({ children }) => children,
    Routes: ({ children }) => children,
    Route: ({ element }) => element,
    Link: ({ children }) => children,
    Navigate: () => null,
    useNavigate: () => jest.fn(),
    useLocation: () => ({ pathname: "/" }),
  }),
  { virtual: true }
);
import App from "./App";

test("renders SpotFlex brand", () => {
  render(<App />);
  const brandTexts = screen.getAllByText(/spotflex/i);
  expect(brandTexts.length).toBeGreaterThan(0);
});
