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

// src/.umi/api/mindmap.ts
var mindmap_exports = {};
__export(mindmap_exports, {
  default: () => mindmap_default3
});
module.exports = __toCommonJS(mindmap_exports);

// src/.umi/api/_middlewares.ts
var middlewares_default = async (req, res, next) => {
  next();
};

// src/services/mindmap.json
var nodes = [
  {
    id: "a3519d4a-786f-49d8-b4d6-e67f8843c920",
    name: "Link_clone_afterfull",
    ref: "2930ee04-f0d5-4216-adc5-57768f9cc652",
    parentId: null,
    resourceType: "VM",
    description: null,
    virtualMachineId: null,
    status: null,
    size: null,
    updateTime: null,
    disk: null,
    createTime: "2022-07-07 14:08:29",
    autoSnapshot: null,
    systemFlag: null,
    createUserId: null,
    ownerId: null,
    zoneId: "b34339f8-0f4a-4dd5-a184-1702d808f157",
    timerTaskId: null,
    depth: 0
  },
  {
    id: "471cebc8-116c-42e9-ad74-ba0ffe96eec6",
    name: "snapcsht-111",
    ref: "b7b82851-18b0-420a-aa7c-06b365ceaddf",
    parentId: "a3519d4a-786f-49d8-b4d6-e67f8843c920",
    resourceType: "SNAPSHOT",
    description: "",
    virtualMachineId: "a3519d4a-786f-49d8-b4d6-e67f8843c920",
    status: "AVAILABLE",
    size: 20,
    updateTime: "2022-07-11 11:07:27",
    disk: [
      {
        diskId: "baa2170d-b3dd-4400-a567-76522807b406",
        diskName: "802b3103-0070-4288-86d8-bfadf561c9c5_clone"
      }
    ],
    createTime: "2022-07-11 11:07:14",
    autoSnapshot: false,
    systemFlag: null,
    createUserId: null,
    ownerId: null,
    zoneId: "b34339f8-0f4a-4dd5-a184-1702d808f157",
    timerTaskId: null,
    depth: 1
  },
  {
    id: "4e732cf3-1b7e-403f-873e-689bd363200f",
    name: "snapcsht-222",
    ref: "7a6c5523-7cf0-4344-93b2-82096d3b6c6b",
    parentId: "471cebc8-116c-42e9-ad74-ba0ffe96eec6",
    resourceType: "SNAPSHOT",
    description: "",
    virtualMachineId: "a3519d4a-786f-49d8-b4d6-e67f8843c920",
    status: "AVAILABLE",
    size: 20,
    updateTime: "2022-07-12 11:15:22",
    disk: [
      {
        diskId: "baa2170d-b3dd-4400-a567-76522807b406",
        diskName: "802b3103-0070-4288-86d8-bfadf561c9c5_clone"
      }
    ],
    createTime: "2022-07-12 11:15:18",
    autoSnapshot: false,
    systemFlag: null,
    createUserId: null,
    ownerId: null,
    zoneId: "b34339f8-0f4a-4dd5-a184-1702d808f157",
    timerTaskId: null,
    depth: 2
  },
  {
    id: "e6da396e-e9a5-4335-8442-2d613deb376b",
    name: "snapcsht-333",
    ref: "8566f1a8-3a78-40ee-855c-789a529d757d",
    parentId: "4e732cf3-1b7e-403f-873e-689bd363200f",
    resourceType: "SNAPSHOT",
    description: "",
    virtualMachineId: "a3519d4a-786f-49d8-b4d6-e67f8843c920",
    status: "AVAILABLE",
    size: 20,
    updateTime: "2022-07-12 11:15:51",
    disk: [
      {
        diskId: "baa2170d-b3dd-4400-a567-76522807b406",
        diskName: "802b3103-0070-4288-86d8-bfadf561c9c5_clone"
      }
    ],
    createTime: "2022-07-12 11:15:41",
    autoSnapshot: false,
    systemFlag: null,
    createUserId: null,
    ownerId: null,
    zoneId: "b34339f8-0f4a-4dd5-a184-1702d808f157",
    timerTaskId: null,
    depth: 3
  }
];
var edges = [
  {
    source: "4e732cf3-1b7e-403f-873e-689bd363200f",
    target: "e6da396e-e9a5-4335-8442-2d613deb376b",
    shape: "tree-edge"
  },
  {
    source: "471cebc8-116c-42e9-ad74-ba0ffe96eec6",
    target: "4e732cf3-1b7e-403f-873e-689bd363200f",
    shape: "tree-edge"
  },
  {
    source: "a3519d4a-786f-49d8-b4d6-e67f8843c920",
    target: "471cebc8-116c-42e9-ad74-ba0ffe96eec6",
    shape: "tree-edge"
  }
];
var mindmap_default = {
  nodes,
  edges
};

// src/api/mindmap.ts
async function mindmap_default2(req, res) {
  res.status(200).json(mindmap_default);
}

// src/.umi/api/mindmap.ts
var import_apiRoute = __toESM(require_apiRoute());
var apiRoutes = [{ "path": "posts/[postId]", "id": "posts/[postId]", "file": "posts/[postId].ts", "absPath": "/posts/[postId]", "__content": 'import type { UmiApiRequest, UmiApiResponse } from "umi";\r\nimport { PrismaClient } from "@prisma/client";\r\n// import { Redis } from "@upstash/redis";\r\n\r\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\r\n  let prisma: PrismaClient;\r\n  switch (req.method) {\r\n    case "GET":\r\n      // const redis = Redis.fromEnv();\r\n      // let post = await redis.get("post-" + req.params.postId);\r\n      // if (post) {\r\n      //   res.status(200).json(post);\r\n      //   return;\r\n      // }\r\n      // if (!post) {\r\n      prisma = new PrismaClient();\r\n      let post = await prisma.post.findUnique({\r\n        where: { id: +req.params.postId },\r\n        include: { author: true },\r\n      });\r\n      if (post) {\r\n        res.status(200).json(post);\r\n      } else {\r\n        res.status(404).json({ error: "Post not found." });\r\n      }\r\n      // await redis.set("post-" + req.params.postId, JSON.stringify(post));\r\n      await prisma.$disconnect();\r\n\r\n      break;\r\n    default:\r\n      console.log("");\r\n      break;\r\n  }\r\n}\r\n' }, { "path": "user/[userId]", "id": "user/[userId]", "file": "user/[userId].ts", "absPath": "/user/[userId]", "__content": 'import type { UmiApiRequest, UmiApiResponse } from "umi";\r\nimport { PrismaClient } from "@prisma/client";\r\n\r\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\r\n  switch (req.method) {\r\n    case "GET":\r\n      const prisma = new PrismaClient();\r\n      const user = await prisma.user.findUnique({\r\n        where: { id: +req.params.userId },\r\n      });\r\n      res.status(200).json(user);\r\n      await prisma.$disconnect();\r\n      break;\r\n    default:\r\n      res.status(405).json({ error: "Method not allowed" });\r\n  }\r\n}\r\n' }, { "path": "posts", "id": "posts/index", "file": "posts/index.ts", "absPath": "/posts", "__content": 'import { PrismaClient } from "@prisma/client";\r\nimport type { UmiApiRequest, UmiApiResponse } from "umi";\r\nimport bcrypt from "bcryptjs";\r\nimport { signToken, verifyToken } from "@/utils/jwt";\r\n\r\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\r\n  let prisma: PrismaClient;\r\n  switch (req.method) {\r\n    case "GET":\r\n      let prisma = new PrismaClient();\r\n\r\n      const postList = await prisma.post.findMany({\r\n        include: { author: true },\r\n      });\r\n      if (postList?.length > 0) {\r\n        res.status(200).json(postList);\r\n        await prisma.$disconnect();\r\n      }\r\n      break;\r\n    case "POST":\r\n      if (!req.cookies?.token) {\r\n        return res.status(401).json({\r\n          message: "Unauthorized",\r\n        });\r\n      }\r\n      const authorId = (await verifyToken(req.cookies.token)).id;\r\n      prisma = new PrismaClient();\r\n      const newPost = await prisma.post.create({\r\n        data: {\r\n          title: req.body.title,\r\n          content: req.body.content,\r\n          createdAt: new Date(),\r\n          authorId,\r\n          tags: req.body.tags.join(","),\r\n          imageUrl: req.body.imageUrl,\r\n        },\r\n      });\r\n      res.status(200).json(newPost);\r\n      await prisma.$disconnect();\r\n      break;\r\n    default:\r\n      // \u5982\u679C\u4E0D\u662F POST \u8BF7\u6C42\uFF0C\u4EE3\u8868\u4ED6\u6B63\u5728\u7528\u9519\u8BEF\u7684\u65B9\u5F0F\u8BBF\u95EE\u8FD9\u4E2A API\r\n      res.status(405).json({ error: "Method not allowed" });\r\n      break;\r\n  }\r\n}\r\n' }, { "path": "user", "id": "user/index", "file": "user/index.ts", "absPath": "/user", "__content": 'import type { UmiApiRequest, UmiApiResponse } from "umi";\r\nimport { PrismaClient } from "@prisma/client";\r\n\r\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\r\n  switch (req.method) {\r\n    case "GET":\r\n      const prisma = new PrismaClient();\r\n      const allUsers = await prisma.user.findMany({\r\n        select: {\r\n          id: true,\r\n          name: true,\r\n          email: true,\r\n          avatarUrl: true,\r\n          passwordHash: false,\r\n        },\r\n      });\r\n      res.status(200).json(allUsers);\r\n      await prisma.$disconnect();\r\n      break;\r\n    default:\r\n      res.status(405).json({ error: "Method not allowed" });\r\n  }\r\n}\r\n' }, { "path": "register", "id": "register", "file": "register.ts", "absPath": "/register", "__content": 'import type { UmiApiRequest, UmiApiResponse } from "umi";\r\nimport { PrismaClient } from "@prisma/client";\r\nimport bcrypt from "bcryptjs";\r\nimport { signToken } from "@/utils/jwt";\r\n\r\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\r\n  switch (req.method) {\r\n    case "POST":\r\n      try {\r\n        const prisma = new PrismaClient();\r\n        // const formData = JSON.parse(req.body).data;\r\n        const formData = req.body.data;\r\n        const user = await prisma.user.create({\r\n          data: {\r\n            email: formData.email,\r\n            passwordHash: bcrypt.hashSync(formData.password, 8),\r\n            firstname: formData.firstname,\r\n            lastname: formData.lastname,\r\n            avatarUrl: formData.avatarUrl,\r\n            gender: formData.gender,\r\n            birthday: formData.birthday,\r\n            contacts: formData.contacts,\r\n            address: formData.address.join(),\r\n          },\r\n        });\r\n        res\r\n          .status(201)\r\n          .setCookie("token", await signToken(user.id))\r\n          .json({ ...user, passwordHash: undefined });\r\n        // \u5904\u7406\u5B8C\u8BF7\u6C42\u4EE5\u540E\u8BB0\u5F97\u65AD\u5F00\u6570\u636E\u5E93\u94FE\u63A5\r\n        await prisma.$disconnect();\r\n      } catch (e: any) {\r\n        console.log(e);\r\n        res.status(500).json({\r\n          result: false,\r\n          message:\r\n            typeof e.code === "string"\r\n              ? "https://www.prisma.io/docs/reference/api-reference/error-reference#" +\r\n                e.code.toLowerCase()\r\n              : e,\r\n        });\r\n      }\r\n      break;\r\n    default:\r\n      // \u5982\u679C\u4E0D\u662F POST \u8BF7\u6C42\uFF0C\u4EE3\u8868\u4ED6\u6B63\u5728\u7528\u9519\u8BEF\u7684\u65B9\u5F0F\u8BBF\u95EE\u8FD9\u4E2A API\r\n      res.status(405).json({ error: "Method not allowed" });\r\n  }\r\n}\r\n' }, { "path": "mindmap", "id": "mindmap", "file": "mindmap.ts", "absPath": "/mindmap", "__content": 'import type { UmiApiRequest, UmiApiResponse } from "umi";\r\nimport data from "src/services/mindmap.json";\r\n\r\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\r\n  res.status(200).json(data);\r\n}\r\n' }, { "path": "/", "id": "index", "file": "index.ts", "absPath": "/", "__content": 'import type { UmiApiRequest, UmiApiResponse } from "umi";\r\n\r\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\r\n  res.status(200).json({\r\n    posts_url: req.headers.host + "/api/posts",\r\n    post_url: req.headers.host + "/api/posts/{post_id}",\r\n    users_url: req.headers.host + "/api/users",\r\n    user_url: req.headers.host + "/api/users/{user_id}",\r\n  });\r\n}\r\n' }, { "path": "login", "id": "login", "file": "login.ts", "absPath": "/login", "__content": 'import { PrismaClient } from "@prisma/client";\r\nimport type { UmiApiRequest, UmiApiResponse } from "umi";\r\nimport bcrypt from "bcryptjs";\r\nimport { signToken } from "@/utils/jwt";\r\n\r\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\r\n  switch (req.method) {\r\n    case "POST":\r\n      try {\r\n\r\n        const prisma = new PrismaClient();\r\n        const user = await prisma.user.findUnique({\r\n          where: { email: req.body.email },\r\n        });\r\n        if (\r\n          !user ||\r\n          !bcrypt.compareSync(req.body.password, user.passwordHash)\r\n        ) {\r\n          return res.status(401).json({\r\n            message: "Invalid email or password",\r\n          });\r\n        }\r\n        res\r\n          .status(200)\r\n          .setCookie("token", await signToken(user.id))\r\n          .json({ ...user, passwordHash: undefined });\r\n        // \u5904\u7406\u5B8C\u8BF7\u6C42\u4EE5\u540E\u8BB0\u5F97\u65AD\u5F00\u6570\u636E\u5E93\u94FE\u63A5\r\n        await prisma.$disconnect();\r\n      } catch (e: any) {\r\n        res.status(500).json({\r\n          result: false,\r\n          message:\r\n            typeof e.code === "string"\r\n              ? "https://www.prisma.io/docs/reference/api-reference/error-reference#" +\r\n                e.code.toLowerCase()\r\n              : e,\r\n        });\r\n      }\r\n      break;\r\n    default:\r\n      // \u5982\u679C\u4E0D\u662F POST \u8BF7\u6C42\uFF0C\u4EE3\u8868\u4ED6\u6B63\u5728\u7528\u9519\u8BEF\u7684\u65B9\u5F0F\u8BBF\u95EE\u8FD9\u4E2A API\r\n      res.status(405).json({ error: "Method not allowed" });\r\n  }\r\n}\r\n' }];
var mindmap_default3 = async (req, res) => {
  const umiReq = new import_apiRoute.UmiApiRequest(req, apiRoutes);
  await umiReq.readBody();
  const umiRes = new import_apiRoute.UmiApiResponse(res);
  await new Promise((resolve) => middlewares_default(umiReq, umiRes, resolve));
  await mindmap_default2(umiReq, umiRes);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
