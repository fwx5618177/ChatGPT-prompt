import { ChatGPTAPI } from 'chatgpt'
import proxy from "https-proxy-agent";
import nodeFetch from "node-fetch";

const template = (title, username, id, replies, stickiness) => {
    return `
    标题: ${title},
    用户: ${username}, ${id},
    消息: ${replies}
    用户粘度: ${stickiness},
    针对这个用户的消息,请帮我想一个比较得体的回复,回复结果用<h1>包裹
    `
}

const templatePrompt = (title, username, id, replies, stickiness) => {
    return `
    title: ${title},
    user: ${username}, ${id},
    msg: ${replies}
    stickness: ${stickiness},
    Please help me to give a reply for this user's msg based on stickness. Hope reply by Chinese, and wrapped by <h1>.
    `
}

export const chatGptModel = async (title, result, apiKey) => {
    const api = new ChatGPTAPI({
        apiKey,
        completionParams: {
            temperature: 0.5,
            top_p: 0.8
        },
        fetch: (url, options = {}) => {
            const defaultOptions = {
                //  here is a proxy for using chatgpt.
                agent: proxy('http://localhost:7890')
            };

            const mergedOptions = {
                ...defaultOptions,
                ...options
            };
    
            return nodeFetch(url, mergedOptions);
        }
    })

    const context = templatePrompt(title, result[0].uname, result[0].memeber, result[0].msg, result[0].stickiness)
    const res  = await api.sendMessage(context)

    console.log('context:', context);

    return res.text
}

