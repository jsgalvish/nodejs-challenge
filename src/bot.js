
let bot = function (socket, msg) {
  this.socket = socket;
  this.message = msg;
  this.pattern = /(^\/stock=)(.\S*$)/g;

  this.sent = function() {
    let res = this.pattern.exec(this.message.msg);

    if (res) {
      socket.emit("bot-message", {msg: res[2], username: 'bot'});
    }
  }
}


 module.exports = bot;
