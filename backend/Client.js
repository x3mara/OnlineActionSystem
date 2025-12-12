class Client extends User{
  
    // HISTORY HASHMAP ????????? for overall history
    // ?????????????????????????????????????????????????????????




    suspicious; //int
    suspended; //bool
    ownedCosmetics = []; //string array of cosmetics
    purchaseHistory = []; //item array for items won in auctions
    wallet; //type wallet
    points; //int
    level; //int

    constructor(userID, username, password){
        super(userID, username, password);
        this.suspicious = 0;
        this.suspended = false;
        this.wallet = Wallet();
        this.points = 0;
        this.level = 0;
    }

    reportSuspiciousAuction(){

    }

    reportSuspicousUser(){
        
    }

    showWallet(){
        return (this.wallet).balance;
    }

    suspendUsers(){}

    showCredentials(){
        let s = "UserID: " + this.userID + "\nUsername: " + this.username + "\nPassword: " + this.password;
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