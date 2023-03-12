import { queryReplies, queryContent, queryTitle } from './spide.js';
import { getStickiness, merge } from './stickiness.js';
import { chatGptModel } from './chatgpt.js';
import fetch from "cross-fetch";
import dotenv from 'dotenv';

dotenv.config()

// B站视频链接
const url =
  "https://www.bilibili.com/video/BV1ho4y1B76p/?spm_id_from=333.1007.tianma.1-1-1.click&vd_source=92e9146e5777f4f896dcb9912a9094cf";
const apiKey = process.env.apiKey

global.fetch = fetch

  queryReplies(url)
  .then(data => {
    const result = queryContent(data)
    const title = queryTitle(data)
    const stickinessData = getStickiness(result)
    const mergeData = merge(result, stickinessData)

    chatGptModel(title, mergeData, apiKey)
    .then(re => {
        console.log(re);
    })
  })