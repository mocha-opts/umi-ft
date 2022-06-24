import React from "react";
import { createForm } from "@formily/core";
import { createSchemaField } from "@formily/react";
import {
  Form,
  FormItem,
  FormLayout,
  Input,
  Select,
  Password,
  Cascader,
  DatePicker,
  Submit,
  Space,
  FormGrid,
  Upload,
  ArrayItems,
  Editable,
  FormButtonGroup,
} from "@formily/antd";
import { action } from "@formily/reactive";
import { Card, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { register } from "@/services/api";
import { history } from "umi";
import { schema } from "./config";
const form = createForm({
  validateFirst: true,
});

const AvatorUpload = (props) => {
  return (
    <Upload
      {...props}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      headers={{
        authorization: "authorization-text",
      }}
    >
      <Button icon={<UploadOutlined />}>上传复印件</Button>
    </Upload>
  );
};

const SchemaField = createSchemaField({
  components: {
    FormItem,
    FormGrid,
    FormLayout,
    Input,
    DatePicker,
    Cascader,
    Select,
    Password,
    // AvatorUpload,
    Space,
    ArrayItems,
    Editable,
  },
  scope: {
    fetchAddress: (field) => {
      const transform = (data = {}) => {
        return Object.entries(data).reduce((buf, [key, value]) => {
          if (typeof value === "string")
            return buf.concat({
              label: value,
              value: key,
            });
          const { name, code, cities, districts } = value;
          const _cities = transform(cities);
          const _districts = transform(districts);
          return buf.concat({
            label: name,
            value: code,
            children: _cities.length
              ? _cities
              : _districts.length
              ? _districts
              : undefined,
          });
        }, []);
      };

      field.loading = true;
      fetch("//unpkg.com/china-location/dist/location.json")
        .then((res) => res.json())
        .then(
          action.bound((data) => {
            field.dataSource = transform(data);
            field.loading = false;
          })
        );
    },
  },
});

export default () => {
  const {
    data,
    loading,
    run: registerRun,
  } = useRequest(register, {
    manual: true,
    onSuccess: () => {
      history.push(`/login`);
    },
  });
  const handleSubmit = (data: any) => {
    let {
      email,
      password,
      firstname,
      lastname,
      avatarUrl,
      gender,
      birthday,
      contacts,
      address,
    } = data;
    let params = {
      email,
      password,
      firstname,
      lastname,
      avatarUrl: avatarUrl ? avatarUrl : "",
      gender,
      birthday,
      contacts,
      address,
    };

    registerRun(params);
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
      <Card title="Sign up" style={{ width: 620 }}>
        <Form
          form={form}
          labelCol={5}
          wrapperCol={16}
          onAutoSubmit={handleSubmit}
        >
          <SchemaField schema={schema} />
          <FormButtonGroup.FormItem>
            <Submit block size="large">
              Sign up
            </Submit>
          </FormButtonGroup.FormItem>
        </Form>
      </Card>
    </div>
  );
};
