import { getImgs, insert, searchItem } from "../Database/database.js";

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
        this.itemID = Date.now();
        this.itemName = itemName;
        this.itemDesc = itemDesc;
        this.itemTags = itemTags;
        this.buyOutPrice = buyOutPrice;
        this.startingPrice = startingPrice;
    }

    static async insertItem(sessionItem){
        await insert("item", sessionItem.toSQL()); 
    }
    async insertItemImg(imgpath){
        await insert("itemimg", {item_id: this.itemID, itemimg: imgpath}); 
    }

    showItem(itemID) {
        //implementation to show item details
    }

    static async getItemthroughID(itemID) {    
        const obj = await searchItem(itemID);
        // If obj is an array, get first element
        if (Array.isArray(obj)) {
            return obj[0] || {};
        }
        return obj || {};
    }

    static async getItemImgId(itemID) {
        const obj = await getImgs(itemID); //change ths later
        return obj;
    }

}