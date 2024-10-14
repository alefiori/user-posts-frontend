import {
  deleteUser,
  getUser,
  updateUser,
  updateUserPassword,
  uploadUserImage,
} from "@/apis/user"
import { ChangePasswordDialog } from "@/components/changePasswordDialog"
import { ChangePasswordData } from "@/components/changePasswordForm"
import { ProfileData, ProfileForm } from "@/components/profileForm"
import { useToast } from "@/hooks/use-toast"
import { getUserId, logout } from "@/lib/auth"
import { User } from "@/types/user"
import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Profile() {
  const [user, setUser] = useState<User>()
  const { toast } = useToast()
  const navigate = useNavigate()

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

  const onSubmit = async ({ profilePicture, ...values }: ProfileData) => {
    try {
      if (profilePicture) {
        const { url } = await uploadUserImage(userId, profilePicture[0])
        await updateUser(userId, { ...values, pictureUrl: url })
      } else {
        await updateUser(userId, values)
      }
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

  const onDelete = async () => {
    try {
      await deleteUser(userId)
      toast({
        title: "Success",
        description: "Profile deleted",
      })
      await logout()
      navigate("/login")
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    }
  }

  const onChangePassword = async (values: ChangePasswordData) => {
    try {
      await updateUserPassword(userId, {
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
      })
      toast({
        title: "Success",
        description: "Password changed",
      })
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
    user && (
      <>
        <ProfileForm onSubmit={onSubmit} onDelete={onDelete} {...user} />
        <ChangePasswordDialog onSubmit={onChangePassword} />
      </>
    )
  )
}
