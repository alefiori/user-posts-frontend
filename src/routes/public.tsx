import { isLoggedIn } from "@/lib/auth"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

export default function Public() {
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn()) navigate("/")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="h-screen flex items-center bg-blue-100">
      <Outlet />
    </main>
  )
}
