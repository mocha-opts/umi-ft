var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/.pnpm/@umijs+preset-umi@4.0.0/node_modules/@umijs/preset-umi/dist/features/apiRoute/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/@umijs+preset-umi@4.0.0/node_modules/@umijs/preset-umi/dist/features/apiRoute/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.matchApiRoute = exports.esbuildIgnorePathPrefixPlugin = void 0;
    function esbuildIgnorePathPrefixPlugin() {
      return {
        name: "ignore-path-prefix",
        setup(build) {
          build.onResolve({ filter: /^@fs/ }, (args) => ({
            path: args.path.replace(/^@fs/, "")
          }));
        }
      };
    }
    exports.esbuildIgnorePathPrefixPlugin = esbuildIgnorePathPrefixPlugin;
    function matchApiRoute(apiRoutes2, path) {
      if (path.startsWith("/"))
        path = path.substring(1);
      if (path.startsWith("api/"))
        path = path.substring(4);
      const pathSegments = path.split("/").filter((p) => p !== "");
      if (pathSegments.length === 0 || pathSegments.length === 1 && pathSegments[0] === "api") {
        const route2 = apiRoutes2.find((r) => r.path === "/");
        if (route2)
          return { route: route2, params: {} };
        else
          return void 0;
      }
      const params = {};
      const route = apiRoutes2.find((route2) => {
        const routePathSegments = route2.path.split("/").filter((p) => p !== "");
        if (routePathSegments.length !== pathSegments.length)
          return false;
        for (let i = 0; i < routePathSegments.length; i++) {
          const routePathSegment = routePathSegments[i];
          if (routePathSegment.match(/^\[.*]$/)) {
            params[routePathSegment.substring(1, routePathSegment.length - 1)] = pathSegments[i];
            if (i == routePathSegments.length - 1)
              return true;
            continue;
          }
          if (routePathSegment !== pathSegments[i])
            return false;
          if (i == routePathSegments.length - 1)
            return true;
        }
      });
      if (route)
        return { route, params };
    }
    exports.matchApiRoute = matchApiRoute;
  }
});

// node_modules/.pnpm/@umijs+preset-umi@4.0.0/node_modules/@umijs/preset-umi/dist/features/apiRoute/request.js
var require_request = __commonJS({
  "node_modules/.pnpm/@umijs+preset-umi@4.0.0/node_modules/@umijs/preset-umi/dist/features/apiRoute/request.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils_1 = require_utils();
    var UmiApiRequest2 = class {
      constructor(req, apiRoutes2) {
        this._params = {};
        this._body = null;
        this._req = req;
        const m = (0, utils_1.matchApiRoute)(apiRoutes2, this.pathName || "");
        if (m)
          this._params = m.params;
      }
      get params() {
        return this._params;
      }
      get body() {
        return this._body;
      }
      get headers() {
        return this._req.headers;
      }
      get method() {
        return this._req.method;
      }
      get query() {
        var _a, _b;
        return ((_b = (_a = this._req.url) === null || _a === void 0 ? void 0 : _a.split("?")[1]) === null || _b === void 0 ? void 0 : _b.split("&").reduce((acc, cur) => {
          const [key, value] = cur.split("=");
          const k = acc[key];
          if (k) {
            if (k instanceof Array) {
              k.push(value);
            } else {
              acc[key] = [k, value];
            }
          } else {
            acc[key] = value;
          }
          return acc;
        }, {})) || {};
      }
      get cookies() {
        var _a;
        return (_a = this._req.headers.cookie) === null || _a === void 0 ? void 0 : _a.split(";").reduce((acc, cur) => {
          const [key, value] = cur.split("=");
          acc[key.trim()] = value;
          return acc;
        }, {});
      }
      get url() {
        return this._req.url;
      }
      get pathName() {
        var _a;
        return (_a = this._req.url) === null || _a === void 0 ? void 0 : _a.split("?")[0];
      }
      readBody() {
        if (this._req.headers["content-length"] === "0") {
          return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
          let body = "";
          this._req.on("data", (chunk) => {
            body += chunk;
          });
          this._req.on("end", () => {
            switch (this._req.headers["content-type"]) {
              case "application/json":
                try {
                  this._body = JSON.parse(body);
                } catch (e) {
                  this._body = body;
                }
                break;
              default:
                this._body = body;
                break;
            }
            resolve();
          });
          this._req.on("error", reject);
        });
      }
    };
    exports.default = UmiApiRequest2;
  }
});

// node_modules/.pnpm/@umijs+preset-umi@4.0.0/node_modules/@umijs/preset-umi/dist/features/apiRoute/response.js
var require_response = __commonJS({
  "node_modules/.pnpm/@umijs+preset-umi@4.0.0/node_modules/@umijs/preset-umi/dist/features/apiRoute/response.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UmiApiResponse2 = class {
      constructor(res) {
        this._res = res;
      }
      status(statusCode) {
        this._res.statusCode = statusCode;
        return this;
      }
      header(key, value) {
        this._res.setHeader(key, value);
        return this;
      }
      setCookie(key, value) {
        this._res.setHeader("Set-Cookie", `${key}=${value}; path=/`);
        return this;
      }
      text(data) {
        this._res.setHeader("Content-Type", "text/plain; charset=utf-8");
        this._res.end(data);
        return this;
      }
      html(data) {
        this._res.setHeader("Content-Type", "text/html; charset=utf-8");
        this._res.end(data);
        return this;
      }
      json(data) {
        this._res.setHeader("Content-Type", "application/json");
        this._res.end(JSON.stringify(data));
        return this;
      }
    };
    exports.default = UmiApiResponse2;
  }
});

// node_modules/.pnpm/@umijs+preset-umi@4.0.0/node_modules/@umijs/preset-umi/dist/features/apiRoute/index.js
var require_apiRoute = __commonJS({
  "node_modules/.pnpm/@umijs+preset-umi@4.0.0/node_modules/@umijs/preset-umi/dist/features/apiRoute/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.matchApiRoute = exports.UmiApiResponse = exports.UmiApiRequest = void 0;
    var request_1 = require_request();
    Object.defineProperty(exports, "UmiApiRequest", { enumerable: true, get: function() {
      return __importDefault(request_1).default;
    } });
    var response_1 = require_response();
    Object.defineProperty(exports, "UmiApiResponse", { enumerable: true, get: function() {
      return __importDefault(response_1).default;
    } });
    var utils_1 = require_utils();
    Object.defineProperty(exports, "matchApiRoute", { enumerable: true, get: function() {
      return utils_1.matchApiRoute;
    } });
  }
});

// src/.umi-production/api/posts/[postId].ts
var postId_exports = {};
__export(postId_exports, {
  default: () => postId_default2
});
module.exports = __toCommonJS(postId_exports);

// src/.umi-production/api/_middlewares.ts
var middlewares_default = async (req, res, next) => {
  next();
};

// src/api/posts/[postId].ts
var import_client = require("@prisma/client");
var import_redis = require("@upstash/redis");
async function postId_default(req, res) {
  let prisma;
  switch (req.method) {
    case "GET":
      const redis = import_redis.Redis.fromEnv();
      let post = await redis.get("post-" + req.params.postId);
      if (post) {
        res.status(200).json(post);
        return;
      }
      if (!post) {
        prisma = new import_client.PrismaClient();
        post = await prisma.post.findUnique({
          where: { id: +req.params.postId },
          include: { author: true }
        });
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({ error: "Post not found." });
        }
        await redis.set("post-" + req.params.postId, JSON.stringify(post));
        await prisma.$disconnect();
      }
      break;
    default:
      break;
  }
}

// src/.umi-production/api/posts/[postId].ts
var import_apiRoute = __toESM(require_apiRoute());
var apiRoutes = [{ "path": "posts/[postId]", "id": "posts/[postId]", "file": "posts/[postId].ts", "absPath": "/posts/[postId]", "__content": 'import type { UmiApiRequest, UmiApiResponse } from "umi";\r\nimport { PrismaClient } from "@prisma/client";\r\nimport { Redis } from "@upstash/redis";\r\n\r\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\r\n  let prisma: PrismaClient;\r\n  switch (req.method) {\r\n    case "GET":\r\n      const redis = Redis.fromEnv();\r\n      let post = await redis.get("post-" + req.params.postId);\r\n      if (post) {\r\n        res.status(200).json(post);\r\n        return;\r\n      }\r\n      if (!post) {\r\n        prisma = new PrismaClient();\r\n        post = await prisma.post.findUnique({\r\n          where: { id: +req.params.postId },\r\n          include: { author: true },\r\n        });\r\n        if (post) {\r\n          res.status(200).json(post);\r\n        } else {\r\n          res.status(404).json({ error: "Post not found." });\r\n        }\r\n        await redis.set("post-" + req.params.postId, JSON.stringify(post));\r\n        await prisma.$disconnect();\r\n      }\r\n      break;\r\n\r\n    default:\r\n      break;\r\n  }\r\n}\r\n' }, { "path": "posts", "id": "posts/index", "file": "posts/index.ts", "absPath": "/posts", "__content": 'import { PrismaClient } from "@prisma/client";\r\nimport type { UmiApiRequest, UmiApiResponse } from "umi";\r\nimport bcrypt from "bcryptjs";\r\nimport { signToken, verifyToken } from "utils/jwt";\r\n\r\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\r\n  let prisma: PrismaClient;\r\n  switch (req.method) {\r\n    case "GET":\r\n      let prisma = new PrismaClient();\r\n\r\n      const postList = await prisma.post.findMany({\r\n        include: { author: true },\r\n      });\r\n      if (postList?.length > 0) {\r\n        res.status(200).json(postList);\r\n        await prisma.$disconnect();\r\n      }\r\n\r\n    case "POST":\r\n      if (!req.cookies?.token) {\r\n        return res.status(401).json({\r\n          message: "Unauthorized",\r\n        });\r\n      }\r\n      const authorId = (await verifyToken(req.cookies.token)).id;\r\n      prisma = new PrismaClient();\r\n      const newPost = await prisma.post.create({\r\n        data: {\r\n          title: req.body.title,\r\n          content: req.body.content,\r\n          createdAt: new Date(),\r\n          authorId,\r\n          tags: req.body.tags.join(","),\r\n          imageUrl: req.body.imageUrl,\r\n        },\r\n      });\r\n      res.status(200).json(newPost);\r\n      await prisma.$disconnect();\r\n      break;\r\n    default:\r\n      // \u5982\u679C\u4E0D\u662F POST \u8BF7\u6C42\uFF0C\u4EE3\u8868\u4ED6\u6B63\u5728\u7528\u9519\u8BEF\u7684\u65B9\u5F0F\u8BBF\u95EE\u8FD9\u4E2A API\r\n      res.status(405).json({ error: "Method not allowed" });\r\n      break;\r\n  }\r\n}\r\n' }, { "path": "register", "id": "register", "file": "register.ts", "absPath": "/register", "__content": 'import type { UmiApiRequest, UmiApiResponse } from "umi";\r\nimport { PrismaClient } from "@prisma/client";\r\nimport bcrypt from "bcryptjs";\r\nimport { signToken } from "utils/jwt";\r\n\r\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\r\n  switch (req.method) {\r\n    case "POST":\r\n      try {\r\n        const prisma = new PrismaClient();\r\n        const user = await prisma.user.create({\r\n          data: {\r\n            email: req.body.email,\r\n            passwordHash: bcrypt.hashSync(req.body.password, 8),\r\n            name: req.body.name,\r\n            avatarUrl: req.body.avatarUrl,\r\n          },\r\n        });\r\n        res\r\n          .status(201)\r\n          .setCookie("token", await signToken(user.id))\r\n          .json({ ...user, passwordHash: undefined });\r\n        // \u5904\u7406\u5B8C\u8BF7\u6C42\u4EE5\u540E\u8BB0\u5F97\u65AD\u5F00\u6570\u636E\u5E93\u94FE\u63A5\r\n        await prisma.$disconnect();\r\n      } catch (e: any) {\r\n        res.status(500).json({\r\n          result: false,\r\n          message:\r\n            typeof e.code === "string"\r\n              ? "https://www.prisma.io/docs/reference/api-reference/error-reference#" +\r\n                e.code.toLowerCase()\r\n              : e,\r\n        });\r\n      }\r\n      break;\r\n    default:\r\n      // \u5982\u679C\u4E0D\u662F POST \u8BF7\u6C42\uFF0C\u4EE3\u8868\u4ED6\u6B63\u5728\u7528\u9519\u8BEF\u7684\u65B9\u5F0F\u8BBF\u95EE\u8FD9\u4E2A API\r\n      res.status(405).json({ error: "Method not allowed" });\r\n  }\r\n}\r\n' }, { "path": "login", "id": "login", "file": "login.ts", "absPath": "/login", "__content": 'import { PrismaClient } from "@prisma/client";\r\nimport type { UmiApiRequest, UmiApiResponse } from "umi";\r\nimport bcrypt from "bcryptjs";\r\nimport { signToken } from "utils/jwt";\r\n\r\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\r\n  switch (req.method) {\r\n    case "POST":\r\n      try {\r\n        const prisma = new PrismaClient();\r\n        const user = await prisma.user.findUnique({\r\n          where: { email: req.body.email },\r\n        });\r\n        if (\r\n          !user ||\r\n          !bcrypt.compareSync(req.body.password, user.passwordHash)\r\n        ) {\r\n          return res.status(401).json({\r\n            message: "Invalid email or password",\r\n          });\r\n        }\r\n        res\r\n          .status(200)\r\n          .setCookie("token", await signToken(user.id))\r\n          .json({ ...user, passwordHash: undefined });\r\n        // \u5904\u7406\u5B8C\u8BF7\u6C42\u4EE5\u540E\u8BB0\u5F97\u65AD\u5F00\u6570\u636E\u5E93\u94FE\u63A5\r\n        await prisma.$disconnect();\r\n      } catch (e: any) {\r\n        res.status(500).json({\r\n          result: false,\r\n          message:\r\n            typeof e.code === "string"\r\n              ? "https://www.prisma.io/docs/reference/api-reference/error-reference#" +\r\n                e.code.toLowerCase()\r\n              : e,\r\n        });\r\n      }\r\n      break;\r\n    default:\r\n      // \u5982\u679C\u4E0D\u662F POST \u8BF7\u6C42\uFF0C\u4EE3\u8868\u4ED6\u6B63\u5728\u7528\u9519\u8BEF\u7684\u65B9\u5F0F\u8BBF\u95EE\u8FD9\u4E2A API\r\n      res.status(405).json({ error: "Method not allowed" });\r\n  }\r\n}\r\n' }];
var postId_default2 = async (req, res) => {
  const umiReq = new import_apiRoute.UmiApiRequest(req, apiRoutes);
  await umiReq.readBody();
  const umiRes = new import_apiRoute.UmiApiResponse(res);
  await new Promise((resolve) => middlewares_default(umiReq, umiRes, resolve));
  await postId_default(umiReq, umiRes);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
