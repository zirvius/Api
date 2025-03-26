const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

const config = {
    web: 'https://37vxhylsosxof.ahost.marscode.site/source/1file/2file/zirviuswebcode.txt',
    ids: {
        arceusandroid: 'Arceus-X',
        CodexAndroid: 'Codex',
        fluxus: 'Fluxus',
        hydrogen: 'Hydrogen',
        deltaandroid: 'Delta',
        trigon: 'Trigon',
        vegax: 'Vega-x',
        evon: 'Evon',
        valyse: 'Valyse',
        cubixandroid: 'Cubix',
        cryptic: 'Cryptic',
        krnl: 'Krnl'
    }
};

app.get('/api', async (req, res) => {
    const { os } = req.query;

    if (!os || os !== 'android') {
        return res.status(400).json({ error: "pukimak ngapain disini" });
    }

    try {
        const response = await axios.get(config.web);
        const $ = cheerio.load(response.data);

        let results = {};

        const findLinksById = (id) => {
            let links = [];
            $(`a#${id}`).each((index, element) => {
                let href = $(element).attr('href');
                if (href) {
                    href = href.trim();
                    links.push(href);
                }
            });
            return links.length > 0 ? links[0] : null;
        };

        Object.entries(config.ids).forEach(([id, name]) => {
            const link = findLinksById(id);
            if (link) {
                results[name] = link;
            }
        });

        console.log('Scraping:', config.web);
        console.log('Results:', results);

        if (Object.keys(results).length > 0) {
            return res.json(results);
        } else {
            return res.status(404).json({ error: 'idnya g ada kalo g linknya gada :v yahahahahaha' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = app;
