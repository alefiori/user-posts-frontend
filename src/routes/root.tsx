import { Toaster } from "@/components/ui/toaster"
import { Outlet } from "react-router-dom"

export default function Root() {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  )
}
