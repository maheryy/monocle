import { NextApiRequest, NextApiResponse } from "next";

const posts = [];

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
  res.status(201).json(post);
};

export default handler;
