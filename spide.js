import fetch from "node-fetch";
import { stringify } from "qs";
import { getAid } from "./getAid.js";

export const queryReplies = async (url) => {
  const { aid, title } = await getAid(url);

  // 请求评论API的参数
  const params = {
    oid: aid,
    type: 1,
    mode: 3,
    next: 0,
  };

  const cookies = "__SESSDATA=xxxxxxxxx; bili_jct=xxxxxxxxx";

  // 构造请求头
  const headers = {
    Referer: `https://www.bilibili.com/video/${aid}`,
    Origin: "https://www.bilibili.com",
    Cookie: cookies,
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  };

  // 发送请求获取评论
  const res = await fetch(
    `https://api.bilibili.com/x/v2/reply/main?${stringify(params)}`,
    { headers }
  );

  const replies = await res.json()

  return {
    title,
    replies,
  };
};

export const queryTitle = (obj) => {
    return obj.title
}

export const queryContent = (obj) => {
    return obj.replies.data.replies.map(ci => ({
        msg: ci.content.message,
        like: ci.like,
        time: ci.ctime,
        disT: ci.reply_control.time_desc,
        location: ci.reply_control.location,
        member: ci.member.mid,
        uname: ci.member.uname
    }))
}
