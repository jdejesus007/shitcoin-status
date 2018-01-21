
goog.module("shitcoin");

const AppCntrl = goog.require("controllers.app");

//Models
const Coin= goog.require("models.coin");

window["Shitcoin"] = {
  AppCntrl: AppCntrl
}

Silica.setContext("Shitcoin");
Silica.compile(document);
Silica.apply(() => {});
