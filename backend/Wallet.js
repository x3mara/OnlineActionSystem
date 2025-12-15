export default class Wallet{

    #balance;
    #points;
    #walletID;
    
    constructor(){
        this.#walletID= 'w' + Math.trunc((Math.random() + Date.now()));
        this.#balance = 0;
        this.#points = 0;
    }
    constructor(balance, points){
        this.#balance = balance;
        this.#points = points;
    }

    //setters and getters
    getWalletID(){return this.#walletID;}

    


}