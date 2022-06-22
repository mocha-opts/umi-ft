import type { UmiApiRequest, UmiApiResponse } from "umi";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { signToken } from "utils/jwt";

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  switch (req.method) {
    case "POST":
      try {
        const prisma = new PrismaClient();
        const user = await prisma.user.create({
          data: {
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, 8),
            name: req.body.name,
            avatarUrl: req.body.avatarUrl,
          },
        });
        res
          .status(201)
          .setCookie("token", await signToken(user.id))
          .json({ ...user, passwordHash: undefined });
        // 处理完请求以后记得断开数据库链接
        await prisma.$disconnect();
      } catch (e: any) {
        res.status(500).json({
          result: false,
          message:
            typeof e.code === "string"
              ? "https://www.prisma.io/docs/reference/api-reference/error-reference#" +
                e.code.toLowerCase()
              : e,
        });
      }
      break;
    default:
      // 如果不是 POST 请求，代表他正在用错误的方式访问这个 API
      res.status(405).json({ error: "Method not allowed" });
  }
}
