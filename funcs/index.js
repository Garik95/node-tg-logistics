const TeleBot = require('telebot');

const models = require('../models/model');
const bot = new TeleBot('339371115:AAEOSgOwRGXgndDMs1LF4VtjZF86vuNU0s8');

var onStart = function (msg){
    models.Member.find({"id":msg.from.id}).exec(function(err,res){
        if(res.length == 1)
        {
            let replyMarkup = bot.keyboard([
                ['Trailer']
            ], {resize: true});
            return bot.sendMessage(msg.from.id, "Welcome! " + msg.from.first_name + " " + msg.from.last_name, {replyMarkup});
        }
        else
            return msg.reply.text("Cannot recognize your command!!!!!");
        });
}

module.exports.onStart = onStart;