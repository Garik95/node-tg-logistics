const TeleBot = require('telebot');
const axios = require('axios');
const bot = new TeleBot('339371115:AAEOSgOwRGXgndDMs1LF4VtjZF86vuNU0s8');

var onStart = function (msg){
    axios.post(`http://localhost:3000/graphql`,
        {
            query: `{member(id:`+ msg.from.id +`){id}}`
        }).then(response => {
            if(response.data.data.member.length == 1)
            {
                let replyMarkup = bot.keyboard([
                    ['Trailer']
                ], {resize: true});
                return bot.sendMessage(msg.from.id, "Welcome! " + msg.from.first_name + " " + msg.from.last_name, {replyMarkup});
            }
            else
                return msg.reply.text("Cannot recognize your command!!!!!");
        }).catch(e => {
            console.log(e);
        })
}

module.exports.onStart = onStart;