
import React, { Children, Component, useEffect, useMemo, useRef, useState } from "react";
import { Button, Form, Input, Select, Spin } from 'antd';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

let data = [
  {
    name: '张三',
    age: 18
  },
  {
    name: '李四',
    age: 21
  },
  {
    name: '王五',
    age: 23
  },
];

const getData = ({ method, item, startIndex }) =>
  new Promise((resolve, reject) => {
    console.log(method, 'method');
    setTimeout(() => {
      switch (method) {
        case 'GET':
          resolve([...data]);
          break;
        case 'POST':
          //  data.push(item);
          data = [...data, item];
          resolve({ success: true });
          break;
        case 'DELETE':
          data.splice(startIndex, 1);
          resolve({ success: true });
          break;
        case 'PUT':
          data.splice(startIndex, 1, item);
          resolve({ success: true });
          break;
        default:
          break;
      }
    }, 1500)
  })

function Crud() {

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alterStatus, setAlterStatus] = useState(true);

  useEffect(() => {
    if (alterStatus) {
      setLoading(true);
      getData({ method: 'GET' })
        .then(data => {
          setAlterStatus(false);
          setLoading(false);
          setList(data);
        })
    }

  }, [alterStatus])

  return (<div>
    <Button onClick={() => {
      getData({ method: "POST", item: { name: '阿三', age: 20 } })
        .then(({ success }) => {
          if (success) {
            setAlterStatus(true);
          }
        })
    }}> 新增</Button>
    <Spin spinning={loading} >
      <div style={{ minHeight: '88px' }}>
        {list.map((i, index) => (<p key={index}>
          <span>{i.name}</span>&nbsp;&nbsp;
          <span>{i.age}</span>
        </p>))}
      </div>
    </Spin>
  </div >)
}


function Crud1() {
  const { data, isLoading, isError } = useQuery(
    {
      queryKey: ['todos'],
      queryFn: () => getData({ method: 'GET' })
    });

  // 修改
  // const mutation = useMutation({
  //   mutationFn: getData({ method: "POST", item: { name: '阿三', age: 20 } }),
  //   onSuccess: () => {
  //     console.log("onSuccess");
  //     // 错误处理和刷新
  //     // queryClient.invalidateQueries(["todos"]);
  //   },
  // });

  return (<div>
    <Button onClick={() => {

    }}> 新增</Button>
    <Spin spinning={isLoading} >
      <div style={{ minHeight: '88px' }}>
        {data?.map((i, index) => (<p key={index}>
          <span>{i.name}</span>&nbsp;&nbsp;
          <span>{i.age}</span>
        </p>))}
      </div>
    </Spin>
  </div >)

}

// 创建一个 client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default Crud;
// export default function App() {
//   return (
//     // 提供 client 至 App
//     <QueryClientProvider client={queryClient}>
//       <Crud1 />
//     </QueryClientProvider>
//   )
// }