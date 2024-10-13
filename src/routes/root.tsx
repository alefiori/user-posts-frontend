import { Toaster } from "@/components/ui/toaster"
import { Outlet } from "react-router-dom"

export default function Root() {
  return (
    <main className="h-screen flex items-center">
      <Outlet />
      <Toaster />
    </main>
  )
}
