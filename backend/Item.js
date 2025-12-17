export default class Item {
    itemID;
    itemName;
    itemDesc;
    itemTags;
    itemImg;
    buyOutPrice;
    startingPrice;

    toSQL(){
        return{
        id: this.itemID,    
        item_name: this.itemName,
        item_desc: this.itemDesc,
        item_tag: this.itemTags,
        buy_out_price: this.buyOutPrice,
        starting_price: this.startingPrice};
    }

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