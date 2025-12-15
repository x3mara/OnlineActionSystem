export default class Cosmetic{

    #cosmeticID;
    #cosmeticName;
    #cosmeticDesc;
    #cosmeticPrice;

    toSQL(){
        return{
        id:this.#cosmeticID,
        cosmetic_name: this.#cosmeticName,
        cosmetic_desc: this.#cosmeticDesc,
        cosmetic_price: this.#cosmeticPrice};
    }

    constructor(cosmeticID, cosmeticName, cosmeticDesc){
        this.#cosmeticID = cosmeticID;
        this.#cosmeticName = cosmeticName;
        this.#cosmeticDesc = cosmeticDesc;
    }

    //setters and getters
    getCosmeticID() {return this.#cosmeticID;}
    getCosmeticName() {return this.#cosmeticName;}
    setCosmeticName(cosmeticName) {this.#cosmeticName = cosmeticName;}
    getCosmeticDesc() {return this.#cosmeticDesc;}
    setCosmeticDesc(cosmeticDesc) {this.#cosmeticDesc = cosmeticDesc;}
}