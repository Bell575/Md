/*/ CODE BUTON LAGI JIR 😹

• CODE BUTON TYPE PLUGIN ESM DAN CJS
• FITUR TIKTOK
• MIRIP KEK FITUR PLAY TAPI PAKE LINK😹

[ AGUNG SIGMA LE 😹 ]

CH : https://whatsapp.com/channel/0029Vb2btznInlqQKeQDQb1z

HAPUS WM GA DAPAT DUIT JAJAN SELAMA 50 HARI /*/


import axios from "axios";
/*/ UNTUK CJS ⬇️
const axios = require("axios");
const fs = require("fs")
/*/


let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `Harap masukkan URL TikTok!\n\nContoh: ${usedPrefix + command} <URL>`, m);
  }

  const apiUrl = `https://api.alvianuxio.my.id/api/tiktok/v2?url=${text}&apikey=aluxi`;

  try {
    let res = await axios({
                    method: "get",
                    url: apiUrl
                    });
    let data = res.data.data.response;

    if (!data) {
      return conn.reply(m.chat, "Tidak dapat mengambil data TikTok. Pastikan URL valid.", m);
    }

    let {
      uniqueId,
      nickname,
      username,
      description,
      stats: { plays, comments, shares },
      dlink: { nowm },
    } = data;

    let uniqueIdNumber = uniqueId.match(/\d+/g)?.join("") || "Tidak ada nomor";

    let botNumber = conn.user.jid.split("@")[0]; 
    let result = `Silahkan Pilih Type Audio/Video`.trim();

await conn.sendMessage(m.chat, {
 image: { url: "https://www.pic.surf/ym9" },
 caption: result, 
 footer: "Moon",
 buttons: [
   {
     buttonId: `.ttm4 ${text}`,
     buttonText: {
       displayText: 'Video'
     },
     type: 1
   },
   {
     buttonId: `.ttm3 ${text}`,
     buttonText: {
       displayText: 'Audio'
     },
     type: 1
   },
 ],
 headerType: 1,
 viewOnce: true
}, { quoted: m });


  } catch (err) {
    console.error(err);
    conn.reply(m.chat, "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.", m);
  }
};

handler.help = ["tt <url>"];
handler.tags = ["download"];
handler.command = ["tt"];
export default handler