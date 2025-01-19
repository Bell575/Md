/* WM NYA LE 
DIKIT DOANG😹

https://whatsapp.com/channel/0029Vb2btznInlqQKeQDQb1z

#CODE BY AGUNG SIGMA
GAUSAH DI HAPUS ANJ🗿
*/
/// [ AGUNG SUKA CHISATO :3 ] ///

/* UNTUK TYPE CJS 
const axios = require('axios')
const fs = require('fs')
const { pipeline } = require('stream')
const { promisify } = require('util')
const os = require('os')
*/

import axios from 'axios'
import fs from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
import os from 'os'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  if (!text) {
    conn.sendPresenceUpdate("composing", m.chat)
    return conn.reply(m.chat, `• *Example :* . ttmp3 https://vm.tiktok.com/xxxxx`, m)
  }
  if (!text.match(/tiktok/gi)) {
    return conn.reply(m.chat, 'Make sure the link is from TikTok', m)
  }
  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });
  conn.sendMessage(m.chat, {
    react: {
      text: ' ✅',
      key: m.key,
    }
  });
  try {
    let old = new Date();
    let p = await tiktok2(`${text}`);
    
    conn.sendMessage(m.chat, {
    audio: {
    url: `${p.music}`
    },
    mimetype: 'audio/mp4', 
    fileName: `${p.title}.mp3`,
    contextInfo: {
    externalAdReply: {
    title: 'Moon',
    body: 'My Owner : Bell',
    thumbnailUrl: 'https://www.pic.surf/ym9',
    sourceUrl: `https://pianz.xyz`,
    mediaType: 1,
    renderLargerThumbnail: true
    }
    }
    },{ quoted: m})
    
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
   } catch (e) {
    console.log(e);
    conn.sendMessage(m.chat, {
      react: {
        text: '🍉',
        key: m.key,
      }
    });
  }

};

handler.help = ['ttmp3'].map((v) => v + ' <URL>');
handler.tags = ['f'];
handler.command = /^(ttm3)$/i;

handler.limit = false
handler.register = false
handler.disable = false

export default handler
// module.export = handler [ UNTUK TYPE CJS ]
async function tiktok2(query) {
  return new Promise(async (resolve, reject) => {
    try {
    const encodedParams = new URLSearchParams();
encodedParams.set('url', query);
encodedParams.set('hd', '1');

      const response = await axios({
        method: 'POST',
        url: 'https://tikwm.com/api/',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Cookie': 'current_language=en',
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
        },
        data: encodedParams
      });
      const videos = response.data.data;
        const result = {
          title: videos.title,
          cover: videos.cover,
          origin_cover: videos.origin_cover,
          no_watermark: videos.play,
          watermark: videos.wmplay,
          music: videos.music
        };
        resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}