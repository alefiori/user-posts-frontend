export type Post = {
  id: number
  title: string
  content: string
}

export type PostCreate = Omit<Post, "id">

export type PostUpdate = Partial<PostCreate>
