import fetch from "node-fetch";

export const getAid = async (url) => {
    const bv = url.match(/[BV]\w+/g);
    const queryOidUrl = `https://api.bilibili.com/x/web-interface/view?bvid=${bv}`;

    const res = await fetch(queryOidUrl)
    const response = await res.json()

    return {
        aid: response.data.aid,
        title: response.data.title,
    }
}

