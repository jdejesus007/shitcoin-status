goog.module("models.coin");

class Coin {

  constructor(properties) {
    for(let k in properties) {
      this[k] = properties[k];
    }
  }
}

exports = Coin;
