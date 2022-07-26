import React from "react";
import { login } from "@/services/api";
import type { Password as PasswordType } from "@/types/login";
import { Form } from "sula";

import { useRequest, useIntl, setLocale } from "umi";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";

export default () => {
  const intl = useIntl();
  const { run: runLogin, error, loading } = useRequest(login, { manual: true });
  const handleLogin = ({ password, email }: PasswordType) => {
    runLogin({ password, email });
  };

  const config = {
    fields: [
      {
        name: "email",
        label: "Email",
        field: {
          type: "input",
          props: {
            placeholder: "请输入邮箱",
            prefix: <UserOutlined />,
            suffix: <InfoCircleOutlined />,
          },
        },
        rules: [{ required: true, message: "请输入其他" }],
      },

<<<<<<< Updated upstream
      {
        name: "password",
        label: "Password",
        field: {
          type: "password",
          props: {
            placeholder: "请输入密码",
          },
        },
        rules: [{ required: true, message: "请输入其他" }],
      },
    ],
    actionsRender: [
      {
        type: "button",
        props: {
          type: "primary",
          children: intl.formatMessage({
            id: "welcome",
          }),
        },
        action: [
          "validateFields",
          {
            url: "/api/login",
            method: "POST",
            params: (ctx) => {
              console.log(ctx, ctx.result, "ctx");

              return { ...(ctx.result || {}) };
            },
          },
          (ctx) => {
            console.log(ctx.result);
          },
        ],
      },
    ],
  };
  return <Form {...config} />;
};
=======
/*
form(onsubmit="return false")
  .form-item
    label Username
    .input-wrapper
      input(type="text" id="username" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" data-lpignore="true")
  .form-item
    label Password
    .input-wrapper
      input(type="password" id="password" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" data-lpignore="true")
      button(type="button" id="eyeball")
        .eye
      #beam
  button(id="submit") Sign in
*/
>>>>>>> Stashed changes
