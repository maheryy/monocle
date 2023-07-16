import { NextApiRequest, NextApiResponse } from "next";
import { MonocleClient } from "@monocle/node";
import { MONOCLE_HOST, MONOCLE_ID, MONOCLE_SECRET } from "../../lib/constants";

const posts = [];

MonocleClient.initialize({
  app: "blog-api",
  appId: MONOCLE_ID,
  host: MONOCLE_HOST,
  secret: MONOCLE_SECRET,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  res.setHeader("Content-Type", "application/json");

  switch (method) {
    case "GET":
      return getPosts(req, res);
    case "POST":
      return createPost(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

const getPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(posts);
};

const createPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const post = req.body;
  posts.push(post);

  MonocleClient.event("post_created", {
    post_id: post.id,
    post_title: post.title,
  });

  res.status(201).json(post);
};

export default handler;
