export const schema = {
  type: "object",
  properties: {
    username: {
      type: "string",
      title: "Username",
      required: true,
      "x-decorator": "FormItem",
      "x-component": "Input",
    },
    password: {
      type: "string",
      title: "Password",
      required: true,
      "x-decorator": "FormItem",
      "x-component": "Password",
      "x-component-props": {
        checkStrength: true,
      },
      "x-reactions": [
        {
          dependencies: [".confirm_password"],
          fulfill: {
            state: {
              selfErrors:
                '{{$deps[0] && $self.value && $self.value !== $deps[0] ? "确认password不匹配" : ""}}',
            },
          },
        },
      ],
    },
    confirm_password: {
      type: "string",
      title: "Confirm Password",
      required: true,
      "x-decorator": "FormItem",
      "x-component": "Password",
      "x-component-props": {
        checkStrength: true,
      },
      "x-reactions": [
        {
          dependencies: [".password"],
          fulfill: {
            state: {
              selfErrors:
                '{{$deps[0] && $self.value && $self.value !== $deps[0] ? "Confirm that the password does not match" : ""}}',
            },
          },
        },
      ],
    },
    name: {
      type: "void",
      title: "name",
      "x-decorator": "FormItem",
      "x-decorator-props": {
        asterisk: true,
        feedbackLayout: "none",
      },
      "x-component": "FormGrid",
      properties: {
        firstname: {
          type: "string",
          required: true,
          "x-decorator": "FormItem",
          "x-component": "Input",
          "x-component-props": {
            placeholder: "firstname",
          },
        },
        lastname: {
          type: "string",
          required: true,
          "x-decorator": "FormItem",
          "x-component": "Input",
          "x-component-props": {
            placeholder: "lastname",
          },
        },
      },
    },
    email: {
      type: "string",
      title: "Email",
      required: true,
      "x-decorator": "FormItem",
      "x-component": "Input",
      "x-validator": "email",
    },
    gender: {
      type: "string",
      title: "Gender",
      enum: [
        {
          label: "male",
          value: 1,
        },
        {
          label: "female",
          value: 2,
        },
        {
          label: "third gender",
          value: 3,
        },
      ],
      "x-decorator": "FormItem",
      "x-component": "Select",
    },
    birthday: {
      type: "string",
      required: true,
      title: "Birthday",
      "x-decorator": "FormItem",
      "x-component": "DatePicker",
    },
    address: {
      type: "string",
      required: true,
      title: "Address",
      "x-decorator": "FormItem",
      "x-component": "Cascader",
      "x-reactions": "{{fetchAddress}}",
    },
    // idCard: {
    //   type: "string",
    //   required: true,
    //   title: "Avator",
    //   "x-decorator": "FormItem",
    //   "x-component": "AvatorUpload",
    // },
    contacts: {
      type: "string",
      title: "Phone Number",
      "x-decorator": "FormItem",
      "x-component": "Input",
      "x-validator": [{ required: true }, "phone"],
      "x-component-props": {
        // style: {
        //   width: 300,
        // },
      },
    },
  },
};
