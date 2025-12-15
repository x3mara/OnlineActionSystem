export default class Wallet{

    #balance;
    #walletID;
    
    constructor(){
        this.#walletID= 'w' + Math.trunc((Math.random() + Date.now()));
        this.#balance = 0;
    }
    constructor(balance){
        this.#balance = balance;
    }

    //setters and getters
    getWalletID(){return this.#walletID;}
    getBalance(){return this.#balance;}
    setBalance(balance){this.#balance = balance;}
    setwalletID(walletID){this.#walletID = walletID;}

    
    static async searchWallet(walletID){
        [rows] = database.searchWallet(walletID);
        return rows;
    }

    static async insertWallet(){
        sessionWallet = new Wallet();
        let walletID = sessionWallet.getWalletID();
        let balance = 0;
        database.insertWallet(walletID, balance);
        return sessionWallet; 
    }

}