import React from "react";
import { createForm } from "@formily/core";
import { Field } from "@formily/react";
import { Form, FormItem, Input, Password, Submit } from "@formily/antd";
import { Tabs, Card } from "antd";
import { UserOutlined, LockOutlined, PhoneOutlined } from "@ant-design/icons";
import { VerifyCode } from "@/components/VerifyCode";

const normalForm = createForm({
  validateFirst: true,
});

const phoneForm = createForm({
  validateFirst: true,
});

export default () => {
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
              onAutoSubmit={console.log}
            >
              <Field
                name="username"
                title="Username"
                required
                decorator={[FormItem]}
                component={[
                  Input,
                  {
                    prefix: <UserOutlined />,
                  },
                ]}
              />
              <Field
                name="password"
                title="Password"
                required
                decorator={[FormItem]}
                component={[
                  Password,
                  {
                    prefix: <LockOutlined />,
                  },
                ]}
              />
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
              <Field
                name="phone"
                title="Phone Number"
                required
                validator="phone"
                decorator={[FormItem]}
                component={[
                  Input,
                  {
                    prefix: <PhoneOutlined />,
                  },
                ]}
              />
              <Field
                name="verifyCode"
                title="Verification Code"
                required
                reactions={(field) => {
                  const phone = field.query(".phone");
                  field.setComponentProps({
                    readyPost: phone.get("valid") && phone.get("value"),
                    phoneNumber: phone.get("value"),
                  });
                }}
                decorator={[FormItem]}
                component={[
                  VerifyCode,
                  {
                    prefix: <LockOutlined />,
                  },
                ]}
              />
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