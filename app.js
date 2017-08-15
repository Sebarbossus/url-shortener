//Requirements
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const shortUrl = require('./models/shortUrl');
app.use(bodyParser.json());
app.use(cors());
//Connect to the database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/shortUrls');

//Allows node to find static files
app.use(express.static(__dirname +'/public'));

//Creates the database entry
app.get('/new:urlToShorten(*)', (req, res, next)=>{
    var { urlToShorten } = req.params;
    //Regex for url
    var regex =/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

    if(regex.test(urlToShorten)===true){
        var short = Math.floor(Math.random()*100000).toString();
        var data = new shortUrl(
            {
                originalUrl: urlToShorten,
                shortenedUrl: short
            }
        );
        data.save(err=>{
            if(err){
                return res.send('Error saving to database');
            }
        });

        return res.json({data});
    }
    var data = new shortUrl({
        originalUrl: 'The URL you are trying to shorten does not exist',
        shortenedUrl: 'Invalid URL'
    });
});


app.listen(process.env.PORT || 3000, ()=>{
    console.log('Everything is working');
});