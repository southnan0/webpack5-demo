const validate: any = {
  phone: () => ({
    validator: (val: string) => {
      if (!val) return true;
      return /1\d{10}/.test(val);
    },
    message: "请输入正确的手机号码",
  }),
  amount: () => ({
    validator: (val: string) => {
      if (!val) return true;
      return /^(([1-9]\d*)(\.\d{1,2})?)$|(0\.0?([1-9]\d?))$/.test(val);
    },
    message: "金额，保留小数点后两位",
  }),
  init: () => ({
    validator: (val: string) => {
      if (!val) return true;
      return /^-?\d+$/.test(val);
    },
    message: "整数",
  }),
  idcard: () => ({
    validator: (idcode: string) => {
      if (!idcode) return true;
      if (typeof idcode !== "string") {
        // {
        //     code: -1,
        //     msg: "为了避免javascript数值范围误差，idcode 必须是字符串"
        //   }
        return false;
      }
      const idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
      // 判断格式是否正确
      const format = idcard_patter.test(idcode);
      if (!format) {
        return false;
        //   return {
        //     code: -1,
        //     msg: "身份证号码格式错误"
        //   }
      }
      // 加权因子
      const weight_factor = [
        7,
        9,
        10,
        5,
        8,
        4,
        2,
        1,
        6,
        3,
        7,
        9,
        10,
        5,
        8,
        4,
        2,
      ];
      // 校验码
      const check_code = [
        "1",
        "0",
        "X",
        "9",
        "8",
        "7",
        "6",
        "5",
        "4",
        "3",
        "2",
      ];
      const last = idcode[17]; //最后一位
      const seventeen = idcode.substring(0, 17);
      // ISO 7064:1983.MOD 11-2
      // 判断最后一位校验码是否正确
      const arr: any[] = seventeen.split("");
      const len = arr.length;
      let num = 0;
      for (let i = 0; i < len; i++) {
        num += arr[i] * weight_factor[i];
      }
      // 获取余数
      const resisue = num % 11;
      const last_no = check_code[resisue];
      // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
      const result = last === last_no ? true : false;
      return result;
      // return {
      //   code: result ? 1 : -1,
      //   msg: !result ? "身份证号码格式错误" : ""
      // }
    },
    message: "身份证号码格式错误",
  }),
  license: () => ({
    validator: (val: string) => {
      if (!val) return true;
      return /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/.test(
        val
      );
    },
    message: "营业执照号码格式错误",
  }),
};

export default validate;
