import React from "react";
import { Table } from "antd";

export default function Form(params) {

  const column = [
    {
      title: "地址",
      dataIndex: "address"
    },
    {
      title: "姓名",
      dataIndex: "name"
    }
  ]

  return (<div>
    <Table dataSource={[]} />
  </div>)
}















