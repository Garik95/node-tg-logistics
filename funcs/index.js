const TeleBot = require('telebot');
const axios = require('axios');
const token = "YXppekBkbXd0cmFucy5jb206cGFzc3dvcmQ="
const bot = new TeleBot('339371115:AAEOSgOwRGXgndDMs1LF4VtjZF86vuNU0s8');
const url = `http://localhost:3000/graphql`;
var normalize = function (txt)
{
    txt = txt.replace(/\s/g, '');
    return txt.toUpperCase()
}

var onStart = function (msg){
    axios.post(url,
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
    axios.post(url,
    {
        query: `mutation{ changeLoc(id:` + msg.from.id + `,location: "` + loc + `"){ user { id } location } }`
    }).then(response => {
        if(response.data.data.changeLoc.user[0].id == msg.from.id)
        {
            return msg.reply.text("Please provide trailer number");
        }
        else return msg.reply.text("Cannot recognize your command!!!!!");
    })
    .catch(e => {console.log(e)})
}

var getUserState = function (msg,callback){
    axios.post(url,
        {
            query: `{ user(id:`+ msg.from.id +`){ location } }`
        }).then(response => {
            return callback(response.data.data.user[0].location)
        }).catch(e => {console.log(e)})
}

var getTrailerState = function (msg){
    var text = normalize(msg.text);
    axios.post(url,{
        query: `{ trailermap(name:"` + text + `") { id } }`
    }).then(response => {
        var id = response.data.data.trailermap[0].id;
        axios.get("https://api.us.spireon.com/api/assetStatus/" + id,{
            headers: {"Authorization":`Basic ${token}`}
        }).then(response => {
            // console.log(JSON.stringify(response.data));
            if(response.data.success == true) {
                var txt = "Address: " + response.data.data[0].address +
                "\nCity: " + response.data.data[0].city +
                "\nState: " + response.data.data[0].state +
                "\nLong: " + response.data.data[0].lng +
                "\nLat: " + response.data.data[0].lat
                ;
                return msg.reply.text(txt);
            }else 
            return msg.reply.text("Something wrong, try again");            
        }).catch(e => {console.log(e)})
    })
    // axios.post(url,{
    //     query: `{trailer(id:"` + text + `"){state}}`
    // }).then(response => {
    //     if(response.data.data.trailer.length == 1) {
    //         var txt = "";
    //         var replyMarkup;
    //         switch(response.data.data.trailer[0].state){
    //             case 'r': {
    //                 txt = "Sorry trailer " + msg.text + " is reserved!";
    //                 replyMarkup = bot.keyboard([
    //                     ['Try Another Trailer']
    //                 ], {resize: true});
    //             } break;
    //             case 'b':{
    //                 txt = "Sorry trailer " + msg.text + " is blocked!";
    //                 replyMarkup = bot.keyboard([
    //                     ['Try Another Trailer']
    //                 ], {resize: true});
    //             } break;
    //             case 'a':{
    //                 txt = "Trailer " + msg.text + " is available!";
    //                 replyMarkup = bot.keyboard([
    //                     ['Reserve Trailer']
    //                 ], {resize: true});
    //             } break;
    //             default: {
    //                 txt = "There is something wrong!!!!!!"
    //             }               
    //         }
    //         return bot.sendMessage(msg.from.id, txt , {replyMarkup});
    //     }
    //     else return msg.reply.text("Cannot recognize your command!!!!! or provided trailer number does not exists((((")
    // }).catch(e => {console.log(e)})
}

module.exports.onStart = onStart;
module.exports.normalize = normalize;
module.exports.changeLoc = changeLoc;
module.exports.getUserState = getUserState;
module.exports.getTrailerState = getTrailerState;