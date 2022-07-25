import React from "react";

import { Form, FormItem, Input, Password, Submit } from "@formily/antd";
import { Tabs, Card } from "antd";
import * as ICONS from "@ant-design/icons";
import { login } from "@/services/api";
import type { Password as PasswordType } from "@/types/login";
import { normalSchema, SchemaField } from "./config";

export default () => {
  const handleLogin = ({ password, email }: PasswordType) => {
    login({ password, email });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        background: "#eee",
        padding: "40px 0",
      }}
    >
      <Card style={{ width: 400 }}>
        <Tabs style={{ overflow: "visible", marginTop: -10 }}>
          <Tabs.TabPane key="1" tab="Password Login">
            <Form
              form={normalForm}
              layout="vertical"
              size="large"
              onAutoSubmit={handleLogin}
            >
              <SchemaField schema={normalSchema} />
              <Submit block size="large">
                Log in
              </Submit>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane key="2" tab="Mobile Login">
            <Form
              form={phoneForm}
              layout="vertical"
              size="large"
              onAutoSubmit={console.log}
            >
              <SchemaField schema={phoneSchema} />
              <Submit block size="large">
                Log in
              </Submit>
            </Form>
          </Tabs.TabPane>
        </Tabs>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <a href="#Sign up">Sign up</a>
          <a href="#Forgot password">Forgot password?</a>
        </div>
      </Card>
    </div>
  );
};