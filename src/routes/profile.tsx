import { getUser, updateUser } from "@/apis/user"
import { ProfileData, ProfileForm } from "@/components/profileForm"
import { useToast } from "@/hooks/use-toast"
import { getUserId } from "@/lib/auth"
import { User } from "@/types/user"
import { useEffect, useMemo, useState } from "react"

export default function Profile() {
  const [user, setUser] = useState<User>()
  const { toast } = useToast()

  const userId = useMemo(() => getUserId(), [])

  const fetchUser = async () => {
    try {
      setUser(await getUser(userId))
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    fetchUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async (values: ProfileData) => {
    try {
      await updateUser(userId, values)
      toast({
        title: "Success",
        description: "Profile updated",
      })
      fetchUser()
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    }
  }

  return <>{user && <ProfileForm onSubmit={onSubmit} {...user} />}</>
}
