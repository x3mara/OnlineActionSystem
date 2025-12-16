import User from "./User.js";
import Wallet from "./Wallet.js";
import {searchClientbyusername} from "../Database/database.js";
import session from "express-session";
export default class Client extends User{



    #suspicious; //int
    #suspended; //bool
    #points; //int
    #level; //int
    #walletID; //string
    #currentCosmetic; //string

    toSQL(){
        return{
        user_id: super.getUserID(), 
        suscounter: this.#suspicious,
        suspended: this.#suspended,
        current_cosmetic: this.#currentCosmetic,
        points: this.#points,
        levels: this.#level};
        
    }

    constructor(username, password, email, walletID){
        super(username, password);
        this.#suspicious = 0;
        this.#suspended = false;
        this.#points = 0;
        this.#level = 0;
        this.#walletID = walletID;
    }

    //setters and getters
    getSuspicious(){return this.#suspicious;}
    getSuspended(){return this.#suspended;}
    getpoints(){return this.#points;}
    getLevel(){return this.#level;}
    getWalletID(){return this.#walletID;}

    incrementSuspicious(){this.#suspicious++ ;}
    setSuspended(suspended){this.#suspended = suspended;}
    setPoints(points){this.#points = points;}
    setLevel(level){this.#level = level;}

    

    static async searchClient(inputUsername){
        [rows] = await searchClientbyusername(inputUsername);
        return rows;
    }

    static async insertClient(inputUsername, inputPassword, inputEmail, walletID){
        [rows] = await Client.searchClient(inputUsername);
        if(rows.length === 0){
            sessionClient = new Client(inputUsername, inputPassword, inputEmail, walletID);
            sessionUser = new User(inputUsername, inputPassword, inputEmail);
            let suspicious = 0;
            let id = sessionClient.getUserID();
            let suspended = false;
            let points = 0;
            let level = 0;
            sqlObject= sessionClient.toSQL();
            sqlObjectUser= sessionUser.toSQL();
            //inputPassword = inputPassword.hashCode(); //hashcode function needs implementation
            await insert("clients", sqlObject);
            await insert("users",sqlObjectUser);
            return sessionClient; 
        }
        else{
            return null; // username already exists
        }
       
    }






    async reportSuspiciousAuction(auctionID){
        const [rows] = await pool.query(
        'SELECT * FROM auctions WHERE auctionID = ?',
        [auctionID]);
        return rows;
    }

    reportSuspicousUser(){
        
    }



    suspendUsers(){}

    showCredentials(){
        let s = "UserID: " + this.getUserID() + "\nUsername: " + this.getUsername() + "\nPassword: " + this.getPassword();
        return s;
    }

    showPurchaseHistory(){ 
        
    }

    

    editProile(){

    }

    viewUserInfo(clientID){
        //DATABASE TO VIEW INFO ????
    }

}