import { Post } from "@/types/post"
import { FC } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { P } from "./ui/typography"

type Props = Omit<Post, "id"> & {
  onClick: () => void
}

export const PostCard: FC<Props> = ({ title, content, onClick }) => {
  return (
    <Card
      className="w-full h-full cursor-pointer hover:shadow-lg hover:bg-blue-50"
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <P>{content}</P>
      </CardContent>
    </Card>
  )
}
