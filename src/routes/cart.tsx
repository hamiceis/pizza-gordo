import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "./__root";
import { CartPage } from "@/pages/CartPage";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: CartPage,
});
