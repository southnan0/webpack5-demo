import { reportError } from '@/utils/request'
declare const window: any;

export const getTimeStamp = () => {
  var timestamp = new Date().getTime()

  return String(timestamp).substr(0, 10)
}

const HISTORY_ADDRESS_KEY = 'taxiHistory'
export const initHistoryAddressList = (cityName: any) => {
  let taxiHistory:any = {}

  try {
    taxiHistory =
      JSON.parse(window.localStorage.getItem(HISTORY_ADDRESS_KEY)) || {}
  } catch (e) {
    console.info(e)
  }
  if (!taxiHistory.data) {
    taxiHistory.data = []
  }

  const arr = taxiHistory.data?.filter((item:any) => {
    if (cityName) {
      return item.cityName === cityName
    }
    return true
  })

  return arr
}

export const setHistoryAddressList = (historyAddressList: any) => {
  window.localStorage.setItem(
    HISTORY_ADDRESS_KEY,
    JSON.stringify({ data: historyAddressList })
  )
}

export const iosInputHandle = () => {
  // 判断是否是ios
  var ua = navigator.userAgent
  if (ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    // let flag = false;
    let pageBackNormFunc: number | undefined
    // document.body.addEventListener("focusin", () => {
    //   // 软键盘弹起事件
    //   flag = true;
    //   pageBackNormFunc && clearTimeout(pageBackNormFunc);
    // });
    document.body.addEventListener('focusin', () => {
      // 软键盘关闭事件
      // if (flag) {
      pageBackNormFunc && clearTimeout(pageBackNormFunc)
      pageBackNormFunc = setTimeout(function() {
        // 当键盘收起的时候让页面回到原始位置
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      }, 200)
      // }
      // flag = false;
    })
  }
}

export const getAddress = (locations: any) => {
  const geocoder = new window.AMap.Geocoder({
    radius: 500 // 范围，默认：500
  })

  return new Promise(resolve => {
    geocoder.getAddress(locations, (status: string, result: { regeocode: { addressComponent: any; }; }) => {
      if (status === 'complete' && result.regeocode) {
        console.info('getAddress', result)
        const address = result.regeocode.addressComponent
        resolve(address)
      } else {
        reportError('geocoder.getAddress', status)
        console.info('根据经纬度查询地址失败', locations)
        resolve({})
      }
    })
  })
}
