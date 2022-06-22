import { PrismaClient } from "@prisma/client";
import type { UmiApiRequest, UmiApiResponse } from "umi";
import bcrypt from "bcryptjs";
import { signToken, verifyToken } from "utils/jwt";

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  let prisma: PrismaClient;
  switch (req.method) {
    case "GET":
      let prisma = new PrismaClient();

      const postList = await prisma.post.findMany({
        include: { author: true },
      });
      if (postList?.length > 0) {
        res.status(200).json(postList);
        await prisma.$disconnect();
      }

    case "POST":
      if (!req.cookies?.token) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }
      const authorId = (await verifyToken(req.cookies.token)).id;
      prisma = new PrismaClient();
      const newPost = await prisma.post.create({
        data: {
          title: req.body.title,
          content: req.body.content,
          createdAt: new Date(),
          authorId,
          tags: req.body.tags.join(","),
          imageUrl: req.body.imageUrl,
        },
      });
      res.status(200).json(newPost);
      await prisma.$disconnect();
      break;
    default:
      // 如果不是 POST 请求，代表他正在用错误的方式访问这个 API
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
