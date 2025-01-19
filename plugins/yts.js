import yts from 'yt-search';
let handler = async (m, { conn, text, usedPrefix, command }) => {
  let data = (await yts(text)).all
  let hasil = data[~~(Math.random() * data.length)]
  let url = `${hasil.image}`
   let caption = '';
      caption += `∘ Judul : ${hasil.title}\n`;
      caption += `∘ Ext : Search\n`;
      caption += `∘ ID : ${hasil.videoId}\n`;
      caption += `∘ Durasi : ${hasil.timestamp}\n`;
      caption += `∘ Penonton : ${hasil.views}\n`;
      caption += `∘ Diunggah : ${hasil.ago}\n`;
      caption += `∘ Channel : ${hasil.author.url}\n`;
      caption += `∘ Url : ${hasil.url}\n`;
      caption += `∘ Thumbnail : ${hasil.image}`;
  conn.sendMessage(m.key.remoteJid, {
  image: { url: url },
  caption: caption, 
  footer: 'By Moon',
  buttons: [
    { buttonId: `.ytv ${hasil.url}`, buttonText: { displayText: `Download Video` }, type: 1 },
    { buttonId: `.yta ${hasil.url}`, buttonText: { displayText: `Download Audio` }, type: 1 },
    { buttonId: `.yts ${text}`, buttonText: { displayText: 'Next Search' }, type: 1 }
  ],
  headerType: 1,
  viewOnce: true
}, { quoted: m })
}
handler.help = ['yts']
handler.tags = ['search']
handler.command = /^(yts|ytsearch|youtubesearch)$/i
handler.limit = false
handler.register = false

export default handler