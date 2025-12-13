import User from "./User.js";
import Wallet from "./Wallet.js";
export default class Client extends User{
  
    // HISTORY HASHMAP ????????? for overall history
    // ?????????????????????????????????????????????????????????




    #suspicious; //int
    #suspended; //bool
    #ownedCosmetics = []; //string array of cosmetics
    #purchaseHistory = []; //item array for items won in auctions
    #wishlist = []; //auction array
    #wallet; //type wallet
    #points; //int
    #level; //int

    constructor(userID, username, password){
        super(userID, username, password);
        this.#suspicious = 0;
        this.#suspended = false;
        this.#wallet = Wallet();
        this.#points = 0;
        this.#level = 0;
    }

    //setters and getters
    getOwnedCosmetics(){return this.#ownedCosmetics;}
    setOwnedCosmetics(cosmetics){this.#ownedCosmetics = cosmetics;}
    getPurchaseHistory(){return this.#purchaseHistory;}
    setPurchaseHistory(history){this.#purchaseHistory = history;}
    getWallet(){return this.#wallet;}
    setWallet(wallet){this.#wallet = wallet;}
    getPoints(){return this.#points;}
    setPoints(points){this.#points = points;}
    getLevel(){return this.#level;}
    setLevel(level){this.#level = level;}
    getSuspicious(){return this.#suspicious;}
    setSuspicious(suspicious){this.#suspicious = suspicious;}
    isSuspended(){return this.#suspended;}
    setSuspended(suspended){this.#suspended = suspended;}
    getWishlist(){return this.#wishlist;}
    setWishlist(wishlist){this.#wishlist = wishlist;}



    reportSuspiciousAuction(){

    }

    reportSuspicousUser(){
        
    }

    showWallet(){
        return (this.#wallet).balance;
    }

    suspendUsers(){}

    showCredentials(){
        let s = "UserID: " + this.getUserID() + "\nUsername: " + this.getUsername() + "\nPassword: " + this.getPassword();
        return s;
    }

    showPurchaseHistory(){ 
        
    }

    register(inputUsername, inputPassword){
        //DATABASE TO REGISTER ????
    }


    editProile(){

    }

    viewUserInfo(clientID){
        //DATABASE TO VIEW INFO ????
    }

}