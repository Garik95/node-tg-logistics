const TeleBot = require('telebot');
// const mongoose = require('mongoose');
const bot = new TeleBot('339371115:AAEOSgOwRGXgndDMs1LF4VtjZF86vuNU0s8');

// const { dbURL, dbName } = require('./config');
const func = require('./funcs');

// mongoose.connect(dbURL + '/' + dbName);

bot.on('text', (msg) => {    
    if(msg.text === "/start")
        func.onStart(msg);
    if(msg.text === "Trailer")
        return msg.reply.text("Check");
});
 
bot.start();