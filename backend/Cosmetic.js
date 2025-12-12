class Cosmetic{

    #cosmeticID;
    #cosmeticName;
    #cosmeticDesc;

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