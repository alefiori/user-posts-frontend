import { LoginForm } from "@/components/loginForm"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { login } from "@/lib/auth"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const onSubmit = async (values: LoginForm) => {
    try {
      await login(values)
      navigate("/")
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your email and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm onSubmit={onSubmit} />
      </CardContent>
    </Card>
  )
}
