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
import { Textarea } from "./ui/textarea"

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  content: z.string().min(1, {
    message: "Body is required",
  }),
})

export type PostData = z.infer<typeof formSchema>

type Props = Partial<PostData> & {
  onSubmit: (values: PostData) => void
  onCancel: () => void
}

export const PostForm: FC<Props> = ({
  title = "",
  content = "",
  onSubmit,
  onCancel,
}) => {
  const form = useForm<PostData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title,
      content,
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Post title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Post content" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-x-2">
          <Button type="button" variant="destructive" onClick={onCancel}>
            {title ? "Remove" : "Cancel"}
          </Button>
          <Button type="submit">{title ? "Save" : "Create"}</Button>
        </div>
      </form>
    </Form>
  )
}
