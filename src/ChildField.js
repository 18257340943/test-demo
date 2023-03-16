import React, { Component, useEffect, useMemo, useRef, useState } from "react";
import { Button, Form, Input, Select } from 'antd';
import MyForm from "./MyForm";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = props.formRef;
  }

  onGenderChange = (value) => {
    switch (value) {
      case 'male':
        this.formRef.current?.setFieldsValue({ note: 'Hi, man!' });
        return;
      case 'female':
        this.formRef.current?.setFieldsValue({ note: 'Hi, lady!' });
        return;
      case 'other':
        this.formRef.current?.setFieldsValue({ note: 'Hi there!' });
    }
  };

  onFinish = (values) => {
    console.log(this.formRef.current.getFieldValue(), 'this.formRef.current');
  };

  onReset = () => {
    this.formRef.current?.resetFields();
    console.log(this.formRef.current, ' this.formRef.current')
  };

  onFill = () => {
    this.formRef.current?.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };

  render() {
    return (
      <Form {...layout} ref={this.formRef} name="control-ref"
        onFinish={this.onFinish}>
        <Form.Item name="note" label="Note" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
          <Select
            placeholder="Select a option and change input text above"
            onChange={this.onGenderChange}
            allowClear
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
        >
          {({ getFieldValue }) =>
            getFieldValue('gender') === 'other' ? (
              <Form.Item
                name="customizeGender"
                label="Customize Gender"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            ) : null
          }
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={this.onReset}>
            Reset
          </Button>
          <Button type="link" htmlType="button" onClick={this.onFill}>
            Fill form
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

class Parent extends React.Component {

  getAppField = (value) => {
    console.log(value, 'value');
  }

  render() {
    this.formRef = React.createRef();

    return (<div>
      <Button children="获取子组件所有的field值"
        onClick={() => {
          console.log(this.formRef.current);
        }} />
      <App getAppField={this.getAppField} formRef={this.formRef} />
    </div >);
  }

}

export default Parent;