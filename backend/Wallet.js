import {insert, searchwalletbyUserUsername, updatewalletbalance} from "../Database/database.js";
export default class Wallet{

    #balance;
    #walletID;
    #userID;

    toSQL(){
        return{
        wallet_id:this.#walletID,
        balance:this.#balance,
        user_id:this.#userID};
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
    getUserID(){return this.#userID;}
    setUserID(userID){this.#userID = userID;}

    
    static async searchWallet(username){
        rows = await searchwalletbyUserUsername(username);
        return rows;
    }

    static async insertWallet(sessionWallet){
        //let sqlObject= sessionWallet.toSQL();
        await insert("wallet", sessionWallet); 
    }

    static async fetchWallet(username){
        rows = await Wallet.searchWallet(username);
        sessionWallet = new Wallet();
        sessionWallet.setwalletID(rows[0].walletID);
        sessionWallet.setBalance(rows[0].balance);
        return sessionWallet;
    }

    static async updateWallet(sessionWallet){
        await updatewalletbalance(sessionWallet.getWalletID(), sessionWallet.getBalance());
    }

}