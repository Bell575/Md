import axios from "axios";
import * as cheerio from "cheerio";

export async function jktNews(lang) {
   let { data } = await axios.get(`https://jkt48.com/news/list?lang=${lang}`);
   let $ = cheerio.load(data);

   const news = [];
   
   $(".entry-news__list").each((index, element) => {
      const title = $(element).find("h3 a").text();
      const link = $(element).find("h3 a").attr("href");
      const date = $(element).find("time").text();

      news.push({ title, link: "https://jkt48.com" + link, date });
   });

   return news;
}


const handler = async (m, { conn, args }) => {
   const lang = args[0] || 'id'; // Default language is Indonesian
   const news = await jktNews(lang);

   if (news.length === 0) {
      return m.reply("Tidak ada berita terbaru.");
   }

   let message = "Berita JKT48 Terbaru:\n\n";
   news.forEach(item => {
      message += `*${item.title}*\n${item.link}\n_Tanggal: ${item.date}_\n\n`;
   });

   conn.sendMessage(m.chat, { text: message }, { quoted: m });
}


handler.help = ['jktnews <lang>'].map(v => v + ' <query>');
handler.command = /^(jktnews)$/i;
handler.limit = false;

export default handler;