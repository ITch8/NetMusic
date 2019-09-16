/*排行榜详情*/

import axios from 'axios'
import jsonp from 'common/js/jsonp.js'
import {
  commonParams
} from './config'

//排行榜详情歌曲列表
export function getTopDetail(topId) {
  let url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?'
  let pdata = {
    '-': 'getUCGI31424633707750504',
    g_tk:5381,
    inCharset:'utf-8',
    outCharset:'utf-8',
    notice:0,
    needNewCode: 0,
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq.json',
    format:'json',
    data: {
      "detail": {
        "module": "musicToplist.ToplistInfoServer",
        "method": "GetDetail",
        "param": {
          "topId": topId,
          "offset": 0,
          "num": 20,
          "period": "2019-09-16"
        }
      },
      "comm": {
        "ct": 24,
        "cv": 0
      }
    }
  }

  let _data = JSON.stringify(pdata.data)
  pdata.data = _data

  if (process.env.NODE_ENV === 'production') {
    return jsonp(url, pdata, {});
  } else {
    url = '/api/getTopDetail'
    return axios.get(url, {
      params: pdata
    }).then((res) => {
      return Promise.resolve(res.data)
    }).catch((err) => {
      console.log(err);
    })

  }

}
