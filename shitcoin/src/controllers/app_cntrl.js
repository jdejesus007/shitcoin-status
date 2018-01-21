goog.module("controllers.app");

const Coin = goog.require("models.coin");
// shitcoin
// AppCntrl is the root controller of shitcoin
//
class AppCntrl extends Silica.Controllers.Base {
  // Constructor receives the element which specified this controller
  constructor(element) {
    super(element)
    this.name = "ShitCoin Selector";
    this.version = "0.0.1";
    this.myName = "JDJ";
    this.url = "https://api.coinmarketcap.com/v1/ticker/?limit=5000";

    this.headers = [];
    let temp = {name: "Name", cap: "CoinMarketCap:", price: "Price (USD):"};
    this.headers.push(temp);

    /*setInterval(() => {
      this.updateCoinData();
    }, 5000);*/
  }

  getAllCoins() {
    return new Promise ((resolve, reject) => {
      let xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
      xobj.open('GET', this.url, true);
      xobj.onreadystatechange = () => {
        if (xobj.readyState === 4 && xobj.status === 200) {
          // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
          if(typeof xobj === "object") {
            Silica.apply(() => {
              let response = JSON.parse(xobj.response || {});
              if (response) {
                resolve(response);
              } else {
                reject(response);
              }
            });
          }
        }
      };
      xobj.send(null);
    });
  }

  onLoad() {
    this.getAllCoins().then((response) => {
      Silica.apply(() =>{
        this.coinsList = [];
        for (let coin of response) {
          this.coinsList.push(new Coin(coin));
        }

        // By the default - sort by market cap
        this.sorter(null, "market_cap_usd", false);
      });
    }).catch((error) => {
      Silica.apply(() =>{
        console.error("Failed to get data", error);
      });
    });
  }

  // Sort type reflects coin objects
  sorter(el, sortType, asc) {
    let varName = "sortAsc" + sortType;
    this[varName] = !this[varName];

    // Overwrite sorting order
    if (typeof asc !== "undefined" && !asc) {
      console.warn("Overwriting", varName, "Asc: ",  asc, "Final: ", this[varName]);
      this[varName] = asc;
    }

    this.lastSort = {type: varName, asc: this[varName]};
    this.coinsList.sort((a, b) => {
      let genericA = a[sortType] ? a[sortType].toLowerCase() : null;
      let genericB = b[sortType] ? b[sortType].toLowerCase() : null

      if (varName.toLowerCase().includes("name")) {
        if (this[varName]) { //ascending
          return genericA < genericB ? -1 : 1;
        } else { //descending
          return genericA < genericB ? 1 : -1;
        }
      } else { //numeric
        if (this[varName]) {
          return genericA - genericB;
        } else {
          return genericB - genericA;
        }
      }
    });
  }

  /*updateCoinData() {
    this.getAllCoins().then((response) => {
      Silica.apply(() =>{
        this.coinsList = [];
        for (let coin of response) {
          this.coinsList.unshift(new Coin(coin));
        }

        // Assign the last truthy if the customer descended or ascended
        // Update list and reorder same way
        // TODO - update without changing order
        if (this.lastSort) {
          let varName = "sortAsc" + this.lastSort.type;
          this[varName] = this.lastSort.asc;
          this.sorter(null, this.lastSort.type);
        }
      });
    }).catch((error) => {
      Silica.apply(() =>{
        console.error("Failed to get data", error);
      });
    });

  }*/
}

exports = AppCntrl;
