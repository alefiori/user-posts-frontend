import { FC } from "react"
import { AddIcon } from "./addIcon"
import { Card } from "./ui/card"

type Props = {
  onClick: () => void
}

export const NewPostCard: FC<Props> = ({ onClick }) => {
  return (
    <Card
      className="w-full h-full cursor-pointer hover:shadow-lg hover:bg-blue-50"
      onClick={onClick}
    >
      <AddIcon className="m-auto h-full" />
    </Card>
  )
}
