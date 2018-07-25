const TeleBot = require('telebot');
const bot = new TeleBot('339371115:AAEOSgOwRGXgndDMs1LF4VtjZF86vuNU0s8');
const func = require('./funcs');

bot.on('text', (msg) => {
    if(msg.text === "/start")
        func.onStart(msg);
    if(func.normalize(msg.text) === "CHECKTRAILER")
        func.changeLoc(msg.from.id,"checktrailer");    
});
 
bot.start();