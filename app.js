const TeleBot = require('telebot');
const bot = new TeleBot('339371115:AAEOSgOwRGXgndDMs1LF4VtjZF86vuNU0s8');
const func = require('./funcs');

bot.on('text', (msg) => {
    if(msg.text === "/start")
        func.onStart(msg);
    else if(func.normalize(msg.text) === "CHECKTRAILER" || func.normalize(msg.text) === "TRYANOTHERTRAILER")
        func.changeLoc(msg,"checktrailer");
    else {
        func.getUserState(msg, function(res){
            switch(res){
                case "checktrailer": { func.getTrailerState(msg) } break;
                default: { msg.reply.text("Cannot recognize your command!!!!!") } break;
            }
        });
    }
    
});
 
bot.start();