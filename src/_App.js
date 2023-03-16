import "./App.css";
import { useState, useRef } from "react";
import {
  List,
  Input,
  Dialog,
  NumberKeyboard,
  Toast,
  Button,
  Modal
} from "antd-mobile";


const tipEnum = {
  '1000': '一千',
  '10000': "一万",
  "100000": '十万',
  "1000000": '百万'
}
function getdate() {
  const dt = new Date();
  const y = dt.getFullYear();
  const m = dt.getMonth() + 1;
  const d = dt.getDate();
  const hh = dt.getHours().toString().padStart(2, 0);
  const mm = dt.getMinutes().toString().padStart(2, 0);
  const ss = dt.getSeconds().toString().padStart(2, 0);
  const time = y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
  return time;
}

const FreeAmount = 1000;
const availableAmount = 3000;


export default function App() {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [avail, setAvail] = useState(true);
  const [visible, setVisible] = useState(true);
  const [value, setValue] = useState("");

  const tixianBtn = document.querySelector('div.adm-number-keyboard-key-ok')
  // console.log(tixianBtn, 'tixianBtn');

  const openKeyboard = (name) => {
    setVisible(name);
  };

  // 超过3000不可用；小于3000为可用
  const onInput = (vA) => {
    setValue((v) => v + vA);
  };

  const onDelete = () => {
    setValue((v) => v.slice(0, v.length - 1));
  };

  const serviceCost = () => {
    const numVal = Number(value);
    if (numVal <= 1000) {
      return `总免费额度为1000，超过部分提示收手续费0.1%`
    } else if (numVal > 1000) {
      const num = (numVal - 1000) / 1000;
      return `预计收取服务费￥${num.toFixed(2)
        } `
    }
  };

  const warnAmount = () => {
    return <div style={{ color: 'red' }}>超过可用余额（￥3000.00）</div>
  }

  const onConfirm = () => {
    if (isExceed) {

    } else {
      setVisible(false);
      setModal(true)
    }
  }

  const onClear = () => {
    setValue('');
  }

  const clearClick = () => {
    setModal(false);
    setValue('');
  }


  const submit = () => {
    setData([...data, { date: getdate(), value: value }]);
    setModal(false)
  }
  // 是否超出3000金额
  const isExceed = Number(value) > 3000;
  if (tixianBtn) {
    tixianBtn.style.backgroundColor = isExceed ? '#DCDCDC' : 'var(--adm-color-primary)';
  }

  return (
    <div className="App">
      <div className="title">提现金额</div>
      <div className="putCash">
        <div className="tip">{tipEnum[value]}</div>
        <List.Item
          prefix={<div className="yuan">￥</div>}
          extra={<div>
            <div>全部提现</div>
            <div>￥3000</div>
          </div>}
          arrow={false}
          onClick={() => openKeyboard(true)}
        >
          {/* 添加 readOnly 阻止原生键盘弹出 */}
          <Input
            clearable={true}
            onClear={onClear}
            placeholder="请输入内容" value={value}
            onBlur={(x) => { setVisible(false); }} />
        </List.Item>
        <div className="warnTip">{isExceed ? warnAmount() : serviceCost()}</div>
        <div>提现金额记录</div>
        <ul>
          {data.map((i, index) => (<li key={index}>提现时间{i.date}&nbsp;&nbsp;提现金额{i.value}</li>))}
        </ul>
        <NumberKeyboard
          visible={visible}
          onInput={onInput}
          onDelete={onDelete}
          customKey={'.'}
          confirmText='提现'
          onConfirm={onConfirm}
        />
        <Modal visible={modal}
          content={<div >
            <p>确认提现金额{value}</p>
            <a onClick={clearClick}>一键清除</a>
            <div style={{ textAlign: 'center' }}>
              <Button color="primary"
                onClick={submit}
              >确认</Button>
            </div>
          </div>}
        />
      </div>
    </div>
  );
}
