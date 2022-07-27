import React from "react";
import { login } from "@/services/api";
import type { Password as PasswordType } from "@/types/login";
import { Form } from "sula";

import { useRequest, useIntl, setLocale, history } from "umi";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { useStore } from "@/stores";

export default observer(() => {
  const intl = useIntl();
  const { UserStore } = useStore();
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
            UserStore.login(ctx.result);
            history.push("/");
            console.log(ctx);
          },
        ],
      },
    ],
  };
  return <Form {...config} />;
});
