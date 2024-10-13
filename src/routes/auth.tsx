import { Header } from "@/components/header"
import { isLoggedIn, logout } from "@/lib/auth"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

export default function Auth() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn()) navigate("/login")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <main className="max-w-screen-2xl mx-auto">
      <Header onLogout={onLogout} />
      <section className="mt-4 px-4">
        <Outlet />
      </section>
    </main>
  )
}
