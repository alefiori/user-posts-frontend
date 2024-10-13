import { Post } from "@/types/post"
import { DialogDescription } from "@radix-ui/react-dialog"
import { FC } from "react"
import { PostData, PostForm } from "./postForm"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"

type Props = Partial<Post> & {
  open?: boolean
  toggleModal: () => void
  onSubmit: (values: PostData) => void
  onCancel: () => void
}

export const PostDialog: FC<Props> = ({ open, toggleModal, id, ...props }) => {
  return (
    <Dialog open={open} onOpenChange={toggleModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{id ? "Edit" : "Create"} Post</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <PostForm {...props} />
      </DialogContent>
    </Dialog>
  )
}
