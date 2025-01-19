let handler = async (m, { conn, usedPrefix, args, command, text }) => {
if (!text) throw `Berikan Link Youtube Nya`
//m.reply("*YTMP3 DOWNLOAD IN PROGRESS*\n\n\nTunggu yak")
try {
let linknyah = `https://ochinpo-helper.hf.space/yt/dl?url=${text}&type=audio`
await conn.sendMessage(m.chat, {
      audio: { url: linknyah },
      mimetype: 'audio/mpeg'
    }, { quoted: m });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

handler.help = ['yta']
handler.tags = ['downloader']
handler.command = /^(yta|ytmp3|ytaudio)$/i
handler.limit = false
handler.register = false

export default handler