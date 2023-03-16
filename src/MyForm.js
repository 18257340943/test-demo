import React, { Children, Component, useEffect, useMemo, useRef, useState } from "react";
import { Button, Form, Input, Select } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function MyForm(props) {
  const formRef = useRef();

  const [disable, setDisable] = useState(false);
  const [value, setValue] = useState("");

  const onFinish = (values) => {
    console.log(values, 'values');
    console.log(formRef.current.getFieldValue(), 'this.formRef.current');
  };

  const arr = [
    {
      name: 'user',
      label: '用户名',
      children: <Input />
    },
    {
      ...tailLayout,
      children: <Button type="primary" htmlType="submit">
        Submit
      </Button>
    },
  ]

  const renderArr = (nodeList) => {
    return nodeList.map((item, index) => {
      return <Form.Item key={index} {...item} />
    })
  }
  const [nodeList, setNodeList] = useState(arr);

  return (<div>
    <Button onClick={() => {
      setNodeList([
        {
          name: "pwd",
          label: "密码",
          rules: [{ required: true }],
          children: <Input />
        },
        ...nodeList]);
    }} children="添加节点" />
    <Button onClick={() => { console.log(value) }} children="获取value值" />
    <Form {...layout} ref={formRef} onFinish={onFinish} >
      {renderArr(nodeList)}
      {/* {renderNode(nodeList)} */}
      {/* <Form.Item name={"user"} label="用户名" >
        <Input onChange={(e) => {
          if (e.target.value === "11111") {
            setDisable(true)
            formRef.current.setFieldsValue({ email: "11111" })
          }
        }} />
      </Form.Item>
      <Form.Item name={"email"} label="邮箱" rules={[{ required: true }]}>
        <Input value={value}
          onChange={e => setValue(e.target.value)}
        />
      </Form.Item>
      <Form.Item name={"sex"} label="性别">
        <Input />
      </Form.Item>
      <Form.Item name={"age"} label="年纪">
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item> */}
    </Form>
  </div>)

}