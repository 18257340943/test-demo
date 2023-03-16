/**
 * Cfetch
 * 基于原生fetch封装了拦截器功能，暴露出来的Cfetch跟原生fetch用法一致，只是增加了拦截器功能。拦截器用法参考axios的拦截器用法。
 * 拦截器: interceptors
 */

// 定义用来存储拦截请求和拦截响应结果的处理和错误结果处理的函数集合
let interceptorsReq = []
let interceptorsReqError = []
let interceptorsRes = []
let interceptorsResError = []

function objToSearch(obj) {
  let str = "?";
  let count = 0;
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (count === 1) {
        str += `&${key}=${value}`
      } else {
        str += `${key}=${value}`;
      }

      count++;
    }
  }
  return str;
}

function Cfetch(init = {}) {
  const defaultInit = {
    ...init,
    body: JSON.stringify(init.body),
    url: init.url.concat(init.hasOwnProperty('search') ? objToSearch(init.search) : ''),
  };

  let finalInit = {};
  if (interceptorsReq.length > 0) {
    const item = interceptorsReq.shift();
    finalInit = item(defaultInit);
  }
  Object.assign(defaultInit, finalInit);
  return new Promise((resolve, reject) => {
    // 发起fetch请求，fetch请求的形参是接收上层函数的形参
    fetch(defaultInit.url, defaultInit)
      .then(res => res.json)
      .then(res => {
        // interceptorsRes是拦截响应结果的拦截处理函数集合
        interceptorsRes.forEach(item => {
          // 拦截器对响应结果做处理，把处理后的结果返回给响应结果。
          res = item(res)
        })
        // 将拦截器处理后的响应结果resolve出去
        resolve(res)
      })
      .catch(err => {
        // interceptorsResError是拦截响应错误结果的拦截处理函数集合
        interceptorsResError.forEach(item => {
          // 拦截器对响应错误结果做处理，把处理后的结果返回给响应结果。
          err = item(err)
        })
        reject(err)
      })
  })
}

// interceptors拦截器提供request和response两种拦截器功能。
// 可以通过request和response的use方法来绑定两种拦截器的处理函数。
// use方法接收两个参数，参数为一个callback函数，callback函数用来作为拦截器的成功处理函数，errorCallback作为错误处理函数
// request.use方法会把callback放在interceptorsReq中，等待执行。
// response.use方法会把callback放在interceptorsRes中，等待执行。
// 拦截器的处理函数callback接收一个参数。
// request拦截器的callback接收的是请求发起前的config；
// response拦截器的callback接收的是网络请求的response结果。
const interceptors = {
  request: {
    use(callback, errorCallback) {
      interceptorsReq.push(callback)
      errorCallback && interceptorsReqError.push(errorCallback)
    }
  },
  response: {
    use(callback, errorCallback) {
      interceptorsRes.push(callback)
      errorCallback && interceptorsResError.push(errorCallback)
    }
  }
}

// 暴露导出这个函数
export { Cfetch, interceptors };