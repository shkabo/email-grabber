'use strict'
const express = require('express');
const app = express();
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const port = process.env.PORT || 3000;

app.get('/scrape/:url(*)', (req, res) => {
    const url = req.params.url;
    
    request(url, (err, response, html) => {
       if (!err)  {
            const $ = cheerio.load(html);
            let emails = '';
            //const email_pattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            
            let matched = $('a[href^="mailto:"]');

            for (let i = 0; i < matched.length; i++) {
                let x = matched[i].children;
                x.forEach( (email) => {
                    emails += email.data + '<br />';

                });
            }

           res.send(emails);
       }
    });
    
});


const server = app.listen(port, () => {
    console.log("App is up on port " + port);
});
module.exports = server;