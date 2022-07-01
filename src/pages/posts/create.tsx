import type { FunctionComponent } from "react";
import React, { useState, useEffect } from "react";
import Editor from "@/components/Editor";
import { Form, Input } from "antd";
interface CreatePageProps {}

const CreatePage: FunctionComponent<CreatePageProps> = () => {
  return (
    <>
      <Form>
        <Form.Item name="title">
          <Input name="title"></Input>
        </Form.Item>
        <Form.Item>
          <Editor />
        </Form.Item>
      </Form>
    </>
  );
};

export default CreatePage;
