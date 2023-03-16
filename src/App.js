import React, { Component, useEffect, useMemo, useRef, useState } from "react";
import { Button, Form, Input, Select } from 'antd';
import MyForm from "./MyForm";
import Crud from './Crud.jsx';
// import { Form, Input } from 'antd';
// import { Button } from 'antd';
// import { MyButton } from '@zxhj/component-library';

// const fetchData1 = () => {
//   interceptors.request.use(config => {
//     config.method = 'POST';
//     config.body = JSON.stringify({ date: '2.3' });
//     return config;
//   })
//   Cfetch({
//     url: 'http://localhost:8030/',
//     search: {
//       name: 'renzejun1',
//       age: 18
//     }
//     // credentials: 'same-origin
//   }).then(data => {
//     console.log(data, 'data');
//   });
// }

// const fetchData2 = () => {
//   interceptors.request.use(config => {
//     config.method = 'POST';
//     config.body = JSON.stringify({ date: '2.4' });
//     return config;
//   })
//   Cfetch({
//     url: 'http://localhost:8030/',
//     search: {
//       name: 'renzejun2',
//       age: 18
//     }
//     // credentials: 'same-origin
//   }).then(data => {
//     console.log(data, 'data');
//   });
// }

// 防抖（连续多个事件只执行最后一次）：每次事件触发就清除计时器，再过段时间执行；
function debounce(fn) {
  let timeout = null;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...arguments);
      clearTimeout(timeout);
    }, 1000);
  };
}

// 节流（连续执行事件，每隔一段时间执行一次）：核心是依赖于定时器
// 无定时器则创建定时器（并且定时执行回调，关闭），有定时器则不做任何处理
function throttle(fn) {
  let flag = null;
  return function () {
    if (!flag) {
      flag = setTimeout(() => {
        fn(...arguments);
        flag = null;
      }, 500)
    }
  };
}

function throttle1(func, delay) {
  var prev = Date.now();
  return function () {
    var now = Date.now();
    if (now - prev >= delay) {
      func(...arguments);
      prev = Date.now();
    }
  }
}

class Count extends Component {

  state = {
    count: 0
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   console.log(prevState, this.state, 'prevState,this.state');
  // }
  btnClick = () => {
    this.setState((preState) => {
      return ({
        count: preState.count + 1
      })
    }, () => {
      console.log(this.state, 'this.state更新完了');
    })
  }

  render() {

    return <div>
      <button onClick={this.btnClick}>+1</button>
      <h1>{this.state.count}</h1>
    </div>
  }
}

function Child(props) {
  const { state } = props;
  const { count } = state;

  return <h1>{count}</h1>
}

function Test(params) {

  // useEffect(() => {
  //   // fetchData1()
  //   // fetchData2()
  // }, []);
  const onChange = (e => {
    setValobj({ value: e.target.value });
  });

  const [valObj, setValobj] = useState({ value: '' });
  const [state, setState] = useState({ count: 0 });
  const countRef = useRef(state.count);
  useEffect(() => {
    console.log('state的引用是否发生变化了~')
  }, [state]);

  return <div>
    <h1>{valObj.value}</h1>
    <input onChange={onChange} />
    {/* <MyButton /> */}
    <button onClick={() => {
      state.count = state.count + 1;
      setState(state);
    }}>
      +1</button>
    {/* <h1>前一次的值: {countRef.current}</h1>
    <Child state={state} /> */}
    <h1>{state.count}</h1>
  </div >
}
// import type { FormInstance } from 'antd/es/form';

export default Crud;