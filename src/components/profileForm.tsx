import { User } from "@/types/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { FC } from "react"
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
  ...defaultValues
}) => {
  const form = useForm<ProfileData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

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
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder="profilePicture"
                    {...profilePictureRef}
                  />
                </FormControl>
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
