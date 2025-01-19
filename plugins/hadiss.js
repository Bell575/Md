import axios from 'axios';
import * as cheerio from 'cheerio';

export async function hadist(hadist) {
    const { data: leet } = await axios.get(`https://www.hadits.id/tentang/${hadist}`);
    const $ = cheerio.load(leet);

    let hasil = [];
    $('section').each((i, el) => {
        let judul = $(el).find('a').text().trim();
        let link = `https://www.hadits.id${$(el).find('a').attr('href')}`;
        let perawi = $(el).find('.perawi').text().trim();
        let kitab = $(el).find('cite').text().replace(perawi, '').trim();
        let teks = $(el).find('p').text().trim();

        hasil.push({ judul, link, perawi, kitab, teks });
    });

    return hasil;
}

export async function detail(url) {
    let { data } = await axios.get(url);
    let $ = cheerio.load(data);

    const title = $('article h1').text().trim(); 
    const breadcrumb = [];
    $('div.breadcrumb-menu ol.breadcrumbs li').each((index, element) => {
        breadcrumb.push($(element).text().trim());
    });

    const hadithContent = $('article p.rtl').text().trim();
    const hadithNumber = $('header .hadits-about h2').text().match(/No. (\d+)/)[1];

    return {
        title,
        breadcrumb,
        haditsArab: hadithContent,
        hadithNumber
    };
}

// Handler untuk command
let handler = async (m, { command, args }) => {
    if (!args[0]) return m.reply('Silakan masukkan nama hadist yang ingin dicari.');

    const hadistData = await hadist(args[0]);
    if (hadistData.length === 0) return m.reply('Hadist tidak ditemukan.');

    let response = 'Hasil pencarian:\n';
    hadistData.forEach((item, index) => {
        response += `${index + 1}. ${item.judul}\nLink: ${item.link}\nPerawi: ${item.perawi}\nKitab: ${item.kitab}\nTeks: ${item.teks}\n\n`;
    });

    m.reply(response);
};

handler.help = ['hadist'];
handler.command = /^(hadist)$/i;

export default handler;