import User from "./User.js";
import Wallet from "./Wallet.js";
export default class Client extends User{



    #suspicious; //int
    #suspended; //bool
    #ownedCosmetics = []; //string array of cosmetics
    #purchaseHistory = []; //item array for items won in auctions
    #wishlist = []; //auction array
    #points; //int
    #level; //int
    #walletID; //string

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
        [rows] = database.searchClient(inputUsername);
        return rows;
    }

    static async insertClient(inputUsername, inputPassword, inputEmail){
        [rows] = await Client.searchClient(inputUsername);
        if(rows.length === 0){
            sessionWallet = new Wallet();
            let walletID = wallet.getWalletID();
            sessionClient = new Client(inputUsername, inputPassword, inputEmail, walletID);
            let suspicious = 0;
            let suspended = false;
            let points = 0;
            let level = 0;
            inputPassword = inputPassword.hashCode(); //hashcode function needs implementation
            database.insertClient(inputUsername, inputPassword, inputEmail, suspended, suspicious, points, level, walletID);
            return sessionClient; 
        }
        else{
            return null; // username already exists
        }
       
    }



    static async verifyLogin(inputUsername, inputPassword, client){
        [rows] = await Client.searchClient(inputUsername);
        if(rows.length === 0){
            return null;
        }
        if(rows[0].password === inputPassword){
            sessionclient = new Client();
            sessionclient.setUsername(rows[0].username);
            sessionclient.setPassword(rows[0].password);
            sessionclient.setEmail(rows[0].email);
            sessionclient.setSuspicious(rows[0].suspicious);
            sessionclient.setSuspended(rows[0].suspended);
            sessionclient.setPoints(rows[0].points);
            sessionclient.setLevel(rows[0].level);
            sessionclient.setWalletID(rows[0].walletID);
            return sessionclient;
        }
        else{
            return false;
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