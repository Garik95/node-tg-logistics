const TeleBot = require('telebot');
const axios = require('axios');
const bot = new TeleBot('339371115:AAEOSgOwRGXgndDMs1LF4VtjZF86vuNU0s8');

var normalize = function (txt)
{
    txt = txt.replace(/\s/g, '');
    return txt.toUpperCase()
}

var onStart = function (msg){
    axios.post(`http://logistics-api.eu-4.evennode.com/graphql`,
        {
            query: `{member(id:`+ msg.from.id +`){id}}`
        }).then(response => {
            if(response.data.data.member.length == 1)
            {
                let replyMarkup = bot.keyboard([
                    ['Check Trailer']
                ], {resize: true});
                return bot.sendMessage(msg.from.id, "Welcome! " + msg.from.first_name + " " + msg.from.last_name, {replyMarkup});
            }
            else
                return msg.reply.text("Cannot recognize your command!!!!!");
        }).catch(e => {
            console.log(e);
        })
}

var changeLoc = function (msg, loc){
    axios.post(`http://logistics-api.eu-4.evennode.com/graphql`,
    {
        query: `mutation{ changeLoc(id:` + msg.from.id + `,location: "` + loc + `"){ user { id } location } }`
    }).then(response => {
        console.log(response.data.data);
        if(response.data.data.changeLoc.user.id == msg.from.id)
        {
            return msg.reply.text("Location changed to " + loc);
        }
        else return msg.reply.text("Cannot recognize your command!!!!!");
    })
    .catch(e => {console.log(e)})
}

module.exports.onStart = onStart;
module.exports.normalize = normalize;
module.exports.changeLoc = changeLoc;