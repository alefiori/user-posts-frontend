import userImage from "@/assets/user.png"
import { useToast } from "@/hooks/use-toast"
import { User } from "@/types/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { CameraIcon } from "./cameraIcon"

const formSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1, {
    message: "First name is required",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required",
  }),
  profilePicture: z.instanceof(FileList).optional(),
})

export type ProfileData = z.infer<typeof formSchema>

type Props = Omit<User, "id"> & {
  onSubmit: (values: ProfileData) => void
  onDelete: () => void
}

export const ProfileForm: FC<Props> = ({
  onSubmit,
  onDelete,
  pictureUrl,
  ...defaultValues
}) => {
  const [preview, setPreview] = useState<File>()
  const form = useForm<ProfileData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })
  const { toast } = useToast()

  const profilePictureRef = form.register("profilePicture")

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="profilePicture"
          render={() => {
            return (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <div className="relative w-24 h-24 hover:brightness-50 group">
                  <img
                    src={
                      preview
                        ? URL.createObjectURL(preview)
                        : pictureUrl || userImage
                    }
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                  <FormControl>
                    <Input
                      className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
                      type="file"
                      accept="image/*"
                      placeholder="profilePicture"
                      {...profilePictureRef}
                      onChange={(event) => {
                        if (!event.target.files?.length) return
                        const { size } = event.target.files[0]
                        if (size > 5 * 1024 * 1024) {
                          toast({
                            title: "Error",
                            description: "File size must be less than 5MB",
                            variant: "destructive",
                          })
                          event.target.value = ""
                          return
                        }
                        setPreview(event.target.files[0])
                      }}
                    />
                  </FormControl>
                  <CameraIcon className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100" />
                </div>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="user@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Save
        </Button>
        <Button
          type="button"
          variant="destructive"
          className="w-full"
          onClick={onDelete}
        >
          Delete Account
        </Button>
      </form>
    </Form>
  )
}
