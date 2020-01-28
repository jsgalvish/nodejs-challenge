const axios = require('axios');

let bot = function (socket, msg, room) {
  this.socket = socket;
  this.message = msg;
  this.room = room;
  this.pattern = /(^\/stock=)(.\S*$)/g;

  this.sent = function(){

    let res = this.pattern.exec(this.message);

    if (res) {

      axios.get(`https://stooq.com/q/l/?s=${res[2]}&f=sd2t2ohlcv&h&e=csv`).then(resp => {
        let close = `${this.csvJSON(resp.data)['Close']}`;
        if ( close === 'N/D' ){
          socket.to(this.room).emit("bot-message", { msg: `${res[2]} is not in stooq.com`, username: 'bot' })
          socket.broadcast.to(this.room).emit("bot-message", { msg: `${res[2]} is not in stooq.com`, username: 'bot' })
        } else{
          socket.to(this.room).emit("bot-message", { msg: `${res[2]} quote is ${close} per share`, username: 'bot' })
          socket.broadcast.to(this.room).emit("bot-message", { msg: `${res[2]} quote is ${close} per share`, username: 'bot' })
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  };

  this.csvJSON = function(csv){
    let lines=csv.replace('\r','')
      .replace('\r','').split('\n');
    let result = [];
    let headers=lines[0].split(",");

    for(let i=1;i<lines.length;i++){
      let obj = {};
      let currentline =lines[i].split(",");
      for(let j=0;j<headers.length;j++){
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    return result[0];
  }
};

 module.exports = bot;
