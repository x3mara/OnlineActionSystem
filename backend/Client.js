import User from "./User.js";
import Wallet from "./Wallet.js";
import {searchClientbyusername,insert, viewAllAuctions} from "../Database/database.js";
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
        super(username, password, email);
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

    


    static async insertClient(inputUsername, inputPassword, inputEmail, walletID){
        const rows = await User.searchClient(inputUsername);
        if(rows.length === 0){
            const sessionClient = new Client(inputUsername, inputPassword, inputEmail, walletID);
            const sqlObject= sessionClient.toSQL();
            const sqlObjectUser={
                id: sessionClient.getUserID(),
                username: sessionClient.getUsername(),
                password: sessionClient.getPassword(),
                email: sessionClient.getEmail(),
                roles: 'Client'

            }
            //inputPassword = inputPassword.hashCode(); //hashcode function needs implementation
            await insert("users",sqlObjectUser);
            await insert("clients", sqlObject);
            return sessionClient; 
        }
        else{
            return null; // username already exists
        }
      
    }
    async reportSuspiciousAuction(auctionID){

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

    static async viewAllAuctions(){
        const rows = await viewAllAuctions();
        return rows;
    }

}