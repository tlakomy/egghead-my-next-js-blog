import { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import { Article } from "@components/Article";
import type { Post } from "../index";

export default function BlogPost({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { title, body } = post;

  return (
    <Article>
      <h1>{title}</h1>
      <p>{body}</p>
    </Article>
  );
}

export const getStaticPaths = async () => {
  // Call an external API endpoint to get posts
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: Post[] = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: false };
};

// This also gets called at build time
export const getStaticProps = async (context: GetStaticPropsContext) => {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const { params } = context;
  const emptyPost = {
    title: "Post not found",
    body: "",
  };

  if (!params?.id) {
    return {
      props: {
        post: emptyPost,
      },
    };
  }

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const post: Post = await res.json();

  return {
    props: {
      post,
    },
  };
};
