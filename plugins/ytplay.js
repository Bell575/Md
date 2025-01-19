const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = (await import('@adiwajshing/baileys')).default;
import yts from 'yt-search'
import axios from 'axios'

let handler = async (m, { conn, usedPrefix, command, text }) => {
   if (!text) return m.reply(`${usedPrefix + command} stereo love`)
   
   try {
      //m.reply('Execute')
      let search = await yts(text)
      let video = search.all[0]
      let linkyt = video.url
      let teksnya = `Silahlan Pilih Type Audio/Video`

      const { imageMessage } = await prepareWAMessageMedia(
            {
                image: { url: video.thumbnail }
            },
            { upload: conn.waUploadToServer }
        );

        const messageContent = {
            buttonsMessage: {
                contentText: teksnya,
                footerText: global.namabotbot,
                buttons: [
                    {
                        buttonId: `.ytv ${linkyt}`,
                        buttonText: { displayText: 'Video' },
                        type: 1
                    },
                    {
                        buttonId: `.yta ${linkyt}`,
                        buttonText: { displayText: 'Audio' },
                        type: 1
                    }
                ],
                headerType: 4,
                imageMessage: imageMessage,
            }
        };

        const message = generateWAMessageFromContent(
            m.chat,
            {
                ephemeralMessage: {
                    message: messageContent
                }
            },
            { userJid: conn.user.id }
        );

        await conn.relayMessage(m.chat, message.message, { messageId: message.key.id });
    } catch (error) {
        console.error("Gagal mengirim pesan button dengan gambar:", error);
        await conn.sendMessage(m.chat, { text: "Maaf, terjadi kesalahan saat mengirim pesan." });
    }
}

handler.help = ['play'].map(v => v + ' <query>');
handler.tags = ['downloader'];
handler.command = /^(play|ytplay)$/i;
handler.limit = false

export default handler