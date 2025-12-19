import {insert, searchwalletbyUserUsername, updatewalletbalance, insertBankDetails, searchWalletbyWalletID} from "../Database/database.js";
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

    static async fromSQL(data){
        console.log(data);2
        const wallet = new Wallet(data.user_id);
        wallet.#walletID = data.wallet_id;
        wallet.#balance = data.balance;
        return wallet;
    }
    
    constructor(userID){
        this.#walletID =  Math.trunc((Math.random() + Date.now()));
        this.#balance = 0;
        this.#userID = userID;
    }


    //setters and getters
    getWalletID(){return this.#walletID;}
    getBalance(){return this.#balance;}
    setBalance(balance){this.#balance = balance;}
    setwalletID(walletID){this.#walletID = walletID;}
    getUserID(){return this.#userID;}
    setUserID(userID){this.#userID = userID;}

    static async searchWallet(username){
        let rows = await searchwalletbyUserUsername(username);
        return Wallet.fromSQL(rows);
    }
    static async searchWalletID(walletID){
        console.log("WOW: " + walletID);
        let rows = await searchWalletbyWalletID(walletID);
        console.log(rows);
        return Wallet.fromSQL(rows[0]);
    }

    static async insertWallet(sessionWallet){
        //let sqlObject= sessionWallet.toSQL();
        await insert("wallet", sessionWallet); 
    }

    static async fetchWallet(username){
        let rows = await Wallet.searchWallet(username);
        return rows;
    }

    static async updateWalletBalance(sessionWallet, balance){
        sessionWallet.setBalance(balance);
        this.updateWallet(sessionWallet);
    }
    static async updateWallet(sessionWallet){
        await updatewalletbalance(sessionWallet.getWalletID(), sessionWallet.getBalance());
    }


    
}