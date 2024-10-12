import { RouteObject } from "react-router-dom"
import Login from "./login"
import Signup from "./signup"
import Root from "./root"

export const routes: Array<RouteObject> = [
  {
    element: <Root />,
    children: [
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]
