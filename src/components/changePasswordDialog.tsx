import { FC, useState } from "react"
import { ChangePasswordData, ChangePasswordForm } from "./changePasswordForm"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"

type Props = {
  onSubmit: (values: ChangePasswordData) => void
}

export const ChangePasswordDialog: FC<Props> = ({ onSubmit }) => {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => setOpen((prev) => !prev)

  return (
    <Dialog open={open} onOpenChange={toggleOpen}>
      <DialogTrigger asChild>
        <Button className="w-full mt-4">Change Password</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <ChangePasswordForm
          onSubmit={(values) => {
            onSubmit(values)
            toggleOpen()
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
