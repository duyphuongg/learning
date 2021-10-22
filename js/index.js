const axios = require('axios')
const cheerio = require('cheerio')

/**
 * test crawl data
 */
const getInfo = async () => {
	try {
		const { data } = await axios.get(
			'https://www.yellowpages.vnn.vn/cls/268180/may-dong-phuc.html'
		);
		const $ = cheerio.load(data);
		const postTitles = [];

		// postTitles = $('div > h2.company_name > a').text()

		return $;
	} catch (error) {
		throw error;
	}
};

getInfo().then((res) => {
    console.log(res);
})