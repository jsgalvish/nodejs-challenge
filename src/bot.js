const axios = require('axios');

let bot = function (socket, msg) {
  this.socket = socket;
  this.message = msg;
  this.pattern = /(^\/stock=)(.\S*$)/g;

  this.sent = function(){

    let res = this.pattern.exec(this.message.msg);

    if (res) {
      axios.get(`https://stooq.com/q/l/?s=${res[2]}&f=sd2t2ohlcv&h&e=csv`).then(resp => {
        socket.emit("bot-message", {
            msg: `${res[2]} quote is ${this.csvJSON(resp.data)['Close']} per share`,
            username: 'bot'
          })

      }).catch((err) => {
        console.log(err);
      });
    }
  };

  this.csvJSON = function(csv){
    var lines=csv.replace('\r','')
      .replace('\r','').split('\n');
    var result = [];
    var headers=lines[0].split(",");

    for(var i=1;i<lines.length;i++){
      var obj = {};
      var currentline=lines[i].split(",");
      for(var j=0;j<headers.length;j++){
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }

    return result[0];
  }

};

 module.exports = bot;
