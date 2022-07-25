import { createForm } from "@formily/core";
import { createSchemaField } from "@formily/react";
import { FormItem, Input, Password } from "@formily/antd";
import { VerifyCode } from "@/components/VerifyCode";

export const normalForm = createForm({
  validateFirst: true,
});

export const phoneForm = createForm({
  validateFirst: true,
});

export const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Password,
    VerifyCode,
  },
  scope: {
    icon(name) {
      return React.createElement(ICONS[name]);
    },
  },
});

export const normalSchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      title: "Email",
      required: true,
      "x-decorator": "FormItem",
      "x-component": "Input",
      "x-component-props": {
        prefix: "{{icon('UserOutlined')}}",
      },
    },
    password: {
      type: "string",
      title: "Password",
      required: true,
      "x-decorator": "FormItem",
      "x-component": "Password",
      "x-component-props": {
        prefix: "{{icon('LockOutlined')}}",
      },
    },
  },
};

export const phoneSchema = {
  type: "object",
  properties: {
    phone: {
      type: "string",
      title: "Phone Number",
      required: true,
      "x-validator": "phone",
      "x-decorator": "FormItem",
      "x-component": "Input",
      "x-component-props": {
        prefix: "{{icon('PhoneOutlined')}}",
      },
    },
    verifyCode: {
      type: "string",
      title: "Verification Code",
      required: true,
      "x-decorator": "FormItem",
      "x-component": "VerifyCode",
      "x-component-props": {
        prefix: "{{icon('LockOutlined')}}",
      },
      "x-reactions": [
        {
          dependencies: [".phone#value", ".phone#valid"],
          fulfill: {
            state: {
              "component[1].readyPost": "{{$deps[0] && $deps[1]}}",
              "component[1].phoneNumber": "{{$deps[0]}}",
            },
          },
        },
      ],
    },
  },
};
