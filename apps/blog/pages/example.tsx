import Container from "../components/container";
import Layout from "../components/layout";
import Head from "next/head";
import Header from "../components/header";
import PostTitle from "../components/post-title";
import { FormEvent, useEffect, useState } from "react";

const pageTitle = `Example of analytics events`;

export default function Example() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    fetchPosts()
      .then((posts) => setPosts(posts))
      .catch(console.error);
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (title.trim().length === 0) return;

    const newPost = await createPost({
      title: title,
      publishedAt: new Date().toISOString(),
    });
    setTitle("");
    setPosts((posts) => [...posts, newPost]);
  };

  return (
    <>
      <Layout>
        <Head>
          <title>{pageTitle}</title>
        </Head>
        <Container>
          <Header />
          <section>
            <PostTitle>{pageTitle}</PostTitle>
            <form onSubmit={onSubmit} className="mt-16">
              <div className="flex items-center justify-start mb-6 gap-6">
                <input
                  className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Create a new post to trigger an analytics event from the API..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <button className="bg-black hover:bg-white hover:text-black border border-black rounded text-white font-bold py-2.5 px-12 duration-200 transition-color text-base whitespace-nowrap flex-1">
                  Create Post
                </button>
              </div>
            </form>
            <ul className="mb-6">
              {posts.map((post, key) => (
                <li
                  key={key}
                  className="flex items-center justify-start py-2 gap-4"
                >
                  <span className="text-xl font-semibold">{post.title}</span>
                  <span className="italic">{formatDate(post.publishedAt)}</span>
                </li>
              ))}
            </ul>
          </section>
        </Container>
      </Layout>
    </>
  );
}

const fetchPosts = async () => {
  const res = await fetch("api/posts");
  const posts = await res.json();
  return posts;
};

const createPost = async (data: Post) => {
  const res = await fetch("api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const newPost = (await res.json()) as Post;
  return newPost;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleString();
};

interface Post {
  title: string;
  publishedAt: string;
}
