import { isLoggedIn } from "@/lib/auth"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

export default function Public() {
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn()) navigate("/")
  }, [navigate])

  return (
    <main className="h-screen flex items-center">
      <Outlet />
    </main>
  )
}
