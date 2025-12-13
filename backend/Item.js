export default class Item {
    itemID;
    itemName;
    itemDesc;
    itemTags;
    itemImg;
    buyOutPrice;
    startingPrice;

    constructor(itemName, itemDesc, itemTags, buyOutPrice, startingPrice) {
        this.itemName = itemName;
        this.itemDesc = itemDesc;
        this.itemTags = itemTags;
        this.buyOutPrice = buyOutPrice;
        this.startingPrice = startingPrice;
    }

    showItem(itemID) {
        //implementation to show item details
    }

}