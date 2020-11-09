import request, { reportError } from "@/utils/request";
import { Toast, Dialog } from "vant";

declare const window: any;

// 应用code
export const GROUP_APP_CODE = "109";
const codeMap: any = {
  105: 1000015,
  106: 1000016,
  103: 1000008,
  104: 1000007,
  109: 1000022,
};

export const isWechat = () => {
  return ~navigator.userAgent.indexOf("MicroMessenger");
};

export const getExpireTime = (hour: any) => {
  const expireTime = new Date().getTime() + hour * 1000 * 60 * 60;
  return expireTime;
};

const USER_INFO_KEY = "car-l-i";

export const setToken = (data: any) => {
  sessionStorage.setItem(USER_INFO_KEY, JSON.stringify(data));
};

export const getToken = () => {
  const userInfo: any = sessionStorage.getItem(USER_INFO_KEY);

  try {
    return JSON.parse(userInfo);
  } catch (e) {
    // reportError("getToken", e);
    return;
  }
};

export const removeToken = (code: any) => {
  sessionStorage.removeItem(USER_INFO_KEY);
  Utils.redirectToAuth(Utils.delUrlParam(location.href, "code"), code);
};

const Utils = {
  getQueryString: function(name: string) {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    const r = decodeURI(window.location.search)
      .substr(1)
      .match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },
  /**
   *
   * @param {string} _authCode  企业授权码
   * @returns {Object} {_perToken:"令牌", name:"用户名", code:"用户ID"}
   */
  async auth(_authCode: any, syscode: any) {
    let rs = getToken();
    if (rs) {
      return rs;
    }

    try {
      const resp = await request(
        "/car/agentApi/member/wxLogin",
        { syscode: syscode || GROUP_APP_CODE, code: _authCode, bizid: 15 },
        { method: "get" }
      );

      if (resp) {
        const data = resp.data;
        rs = data;
        setToken(data);
      }
    } catch (e) {
      // reportError("auth", e);
    }

    return rs;
  },
  async convertArr2Obj(data: any) {
    var columns = data.columns;
    var values = data.data;
    var target: any[] = [];

    values.forEach(function(_vals: any) {
      var obj: any = {};
      columns.forEach(function(_fields: any, idx: number) {
        obj[_fields.name] = _vals[idx];
      });
      target.push(obj);
    });
    return target;
  },
  async registerJSApi(_token: string, _apis: any, code: any) {
    try {
      console.info("registerJSApi", location.href);
      const resp = await request(
        "/car/bizApi/base/appUrlConfig",
        {
          syscode: code || GROUP_APP_CODE,
          appUrl: location.href,
        },
        { method: "get" }
      );

      if (resp) {
        const data = resp?.data;
        Utils.wxConfig(data, _apis);
      } else {
        Utils.dialog.show("应用初始化失败，请重试!");
      }
    } catch (e) {
      // reportError("registerJSApi-2", e);
      Utils.dialog.show("应用初始化失败，请重试!");
    }

    // 注册失败
    window.wx.error(function(e: any) {
      Utils.loading.hide();
      if (
        e?.errMsg?.match("40093") &&
        !sessionStorage.getItem(`_auth_times_wx`)
      ) {
        sessionStorage.setItem(`_auth_times_wx`, "1"); // 只请允许重新授权一次
        removeToken(GROUP_APP_CODE);
      } else {
        Utils.dialog.show("应用授权失败，请尝试重新进入!");
      }

      reportError("wx.error", {
        error: e,
        _token,
        _apis,
        code,
        url: location.href,
      });
    });
  },
  delUrlParam: function(url: string, name: string) {
    const urlArr = url.split("?");
    if (urlArr.length > 1 && urlArr[1].indexOf(name) > -1) {
      const query = urlArr[1];
      const obj: any = {};
      const arr: any[] = query.split("&");
      for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].split("=");
        obj[arr[i][0]] = arr[i][1];
      }
      delete obj[name];
      const params = JSON.stringify(obj)
        .replace(/["{}]/g, "")
        .replace(/:/g, "=")
        .replace(/,/g, "&");
      let urlte = urlArr[0] + "?" + params;
      if (!params) {
        urlte = urlArr[0];
      }
      return urlte;
    } else {
      return url;
    }
  },
  isAuthed: function(groupAppCode: any) {
    const isAuthed = !!getToken();

    if (!isAuthed && !Utils.getQueryString("code")) {
      // 没有用户信息 且没有code - 进入授权中转页
      Utils.redirectToAuth(location.href, groupAppCode);
    }
  },
  redirectToAuth: function(_url: string, code: any) {
    if (!isWechat()) {
      location.replace(
        `https://open.work.weixin.qq.com/wwopen/sso/qrConnect?appid=${process.env.VUE_APP_API_ID}&agentid=` +
          codeMap[code || GROUP_APP_CODE] +
          "&redirect_uri=" +
          encodeURIComponent(_url) +
          "&state=STATE"
      );
    } else {
      location.replace(
        `${process.env.VUE_APP_AUTH_DOMAIN}/srv/outer/app/oauth?appId=` +
          (code || GROUP_APP_CODE) +
          "&redirect_uri=" +
          encodeURIComponent(_url) +
          "&type=im"
      );
    }
  },
  wxConfig: function(data: any, _apis: any) {
    console.info("wxConfig", location.href);
    window.wx.config({
      beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: data.corpId, // 必填，企业微信的corpID
      timestamp: data.timeStamp, // 必填，生成签名的时间戳
      nonceStr: data.nonceStr, // 必填，生成签名的随机串
      signature: data.signature, // 必填，签名，见 附录-JS-SDK使用权限签名算法
      jsApiList: _apis || ["closeWindow"], // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
    });
  },
  loading: (function() {
    let _loading_time_out = 0; // 自动隐藏句柄
    let loading: any = null;
    return {
      /**
       *
       * @param {*} content  提示内容
       * @param {*} opt
       * @param {*} opt.className
       * @param {*} opt.timeout
       */
      show: function(content: string, opt: any) {
        clearTimeout(_loading_time_out);

        content = content || "加载中...";

        opt = Object.assign(
          {
            className: "",
            timeout: 0,
          },
          opt || {}
        );

        loading = Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
        });

        if (opt.timeout) {
          _loading_time_out = setTimeout(function() {
            loading.clear();
          }, opt.timeout);
        }
      },
      hide: function(cb?: Function) {
        loading && loading.hide(cb);
      },
    };
  })(),
  dialog: {
    show: function(msg: string) {
      Dialog({
        message: msg,
      });
    },
  },
};

export default Utils;
