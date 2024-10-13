import { RouteObject } from "react-router-dom"
import Auth from "./auth"
import Home from "./home"
import Login from "./login"
import Root from "./root"
import Signup from "./signup"

export const routes: Array<RouteObject> = [
  {
    element: <Root />,
    children: [
      {
        element: <Auth />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
        ],
      },
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
