import { SignupData, SignupForm } from "@/components/signupForm"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { signup } from "@/lib/auth"
import { useNavigate } from "react-router-dom"

export default function Signup() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const onSubmit = async (values: SignupData) => {
    try {
      await signup(values)
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
        <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
        <CardDescription>
          Enter your email and password to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm onSubmit={onSubmit} />
      </CardContent>
    </Card>
  )
}
