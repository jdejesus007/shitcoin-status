
goog.module("controllers.app");
// shitcoin
// AppCntrl is the root controller of shitcoin
//
class AppCntrl extends Silica.Controllers.Base {
  // Constructor receives the element which specified this controller
  constructor(element) {
    super(element)
    this.name = "shitcoin";
    this.version = "1.0.0";
  }
}

exports = AppCntrl;
