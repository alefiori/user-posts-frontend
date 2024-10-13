import { isLoggedIn } from "@/lib/auth"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

export default function Auth() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn()) navigate("/login")
  }, [navigate])

  return <Outlet />
}
