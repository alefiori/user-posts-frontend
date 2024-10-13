import { getHttpResponse } from "@/lib/http"
import { Post, PostCreate, PostUpdate } from "@/types/post"

const POST_API = "posts"

export const createPost = async (post: PostCreate) =>
  getHttpResponse<Post>(POST_API, "POST", post)

export const getPostList = async () => getHttpResponse<Array<Post>>(POST_API)

export const updatePost = async (id: number, post: PostUpdate) =>
  getHttpResponse<Post>(`${POST_API}/${id}`, "PATCH", post)

export const deletePost = async (id: number) =>
  getHttpResponse<Post>(`${POST_API}/${id}`, "DELETE")
