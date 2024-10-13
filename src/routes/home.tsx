import { createPost, deletePost, getPostList, updatePost } from "@/apis/post"
import { NewPostCard } from "@/components/newPostCard"
import { PostCard } from "@/components/postCard"
import { PostDialog } from "@/components/postDialog"
import { PostData } from "@/components/postForm"
import { useToast } from "@/hooks/use-toast"
import { Post } from "@/types/post"
import { useEffect, useState } from "react"

export default function Home() {
  const [posts, setPosts] = useState<Array<Post>>([])
  const [openModal, setOpenModal] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post>()

  const { toast } = useToast()

  const fetchPosts = async () => {
    try {
      setPosts(await getPostList())
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
    fetchPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleModal = () => setOpenModal((prev) => !prev)

  const editPost = (post: Post) => () => {
    setSelectedPost(post)
    toggleModal()
  }

  const onCancel = async () => {
    if (selectedPost) {
      try {
        const { message } = await deletePost(selectedPost.id)
        toast({
          title: "Success",
          description: message,
        })
        fetchPosts()
        setSelectedPost(undefined)
      } catch (error) {
        toast({
          title: "Error",
          description:
            error instanceof Error ? error.message : "An error occurred",
          variant: "destructive",
        })
      }
    }
    toggleModal()
  }

  const onSubmit = async (values: PostData) => {
    try {
      if (selectedPost) {
        await updatePost(selectedPost.id, values)
        toast({
          title: "Success",
          description: "Post updated successfully",
        })
        setSelectedPost(undefined)
      } else {
        await createPost(values)
        toast({
          title: "Success",
          description: "Post created successfully",
        })
      }
      fetchPosts()
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    }
    toggleModal()
  }

  return (
    <section className="mt-4 px-4">
      <ul className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-5">
        <li className="aspect-square">
          <NewPostCard onClick={toggleModal} />
        </li>
        {posts.map((post) => (
          <li className="aspect-square" key={post.id}>
            <PostCard {...post} onClick={editPost(post)} />
          </li>
        ))}
      </ul>
      <PostDialog
        open={openModal}
        toggleModal={() => {
          toggleModal()
          setSelectedPost(undefined)
        }}
        onCancel={onCancel}
        onSubmit={onSubmit}
        {...selectedPost}
      />
    </section>
  )
}
