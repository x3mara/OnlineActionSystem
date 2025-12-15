export default class Wallet{

    #balance;
    #walletID;

    toSQL(){
        return{
        wallet_id:this.#walletID,
        balance:this.#balance};
    }
    
    constructor(){
        this.#walletID =  Math.trunc((Math.random() + Date.now()));
        this.#balance = 0;
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

    static async insertWallet(sessionWallet){
        let walletID = sessionWallet.getWalletID();
        let balance = 0;
        database.insert(walletID, balance); 
    }

    static async fetchWallet(walletID){
        [rows] = await Wallet.searchWallet(walletID);
        sessionWallet = new Wallet();
        sessionWallet.setwalletID(rows[0].walletID);
        sessionWallet.setBalance(rows[0].balance);
        return sessionWallet;
    }

    static async updateWallet(sessionWallet){
        let walletID = sessionWallet.getWalletID();
        let balance = sessionWallet.getBalance();
        database.updateWallet(walletID, balance);
    }

}