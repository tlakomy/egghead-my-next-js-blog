import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { Article } from "@components/Article";

type Params = {
  id: string;
};

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

interface Props {
  post: Post;
}

export default function Post({ post }: Props) {
  if (!post) {
    return null;
  }
  const { title, body } = post;

  return (
    <Article>
      <h1>{title}</h1>
      <p>{body}</p>
    </Article>
  );
}

// This function gets called at build time
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
export const getStaticProps: GetStaticProps = async (context) => {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const { params } = context;
  if (!params) {
    return {
      props: {},
    };
  }

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const post = await res.json();

  // Pass post data to the page via props
  return {
    props: {
      post,
    },
  };
};
