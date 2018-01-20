
goog.module("shitcoin");

const AppCntrl = goog.require("controllers.app");

window["Shitcoin"] = {
  AppCntrl: AppCntrl
}

Silica.setContext("Shitcoin");
Silica.compile(document);
Silica.apply(() => {});
