import Bid from "./Bid.js";
import Client from "./Client.js";
import clientController from "../controllers/clientController.js";
import walletController from "../controllers/walletController.js";

export default class Auction {
    auctionID;//int
    suspicious;//int
    AuctionedItem;//string (itemID)
    duetime;//datetime
    suspended;//bool
    highestBidder;//string (clientID)
    startingPrice;//float
    seller;//string (clientID)



    constructor(auctionId,AuctionedItem, duetime, seller, startingPrice) {
        this.auctionID = auctionId;
        this.suspicious = 0;
        this.AuctionedItem = AuctionedItem;
        this.duetime = duetime;
        this.seller = seller;
        this.suspended = false;
        this.startingPrice = startingPrice;
        this.highestBidder = null;
    }


    async validateBid(AuctionID, Amount) {
    let datediff = searchAuctions(AuctionID).duetime - new Date(); 
    if (datediff <= 0) {
        return -2; //auction ended
    }
    if (searchItem(searchAuctions(AuctionID).item_id).BuyoutPrice<= Amount) {
        Buyout(clientController.sessionClient, AuctionID);
        return 1; //buyout successful
    }
    if(Amount < searchBids(AuctionID)/*get the highest bid amount currently*/ || Amount > clientController.sessionClient.wallet.balance) {
        return -1;
    }
    updateWallets(searchClients(searchAuctions(AuctionID).highestBidder).wallet) += searchBids(AuctionID);//refund previous highest bidder money with the highest bid amount currently
    newbid = new Bid(AuctionID, clientController.sessionClient, Amount);
    walletController.sessionWallet.setBalance(walletController.sessionWallet.getBalance() - Amount);
    /*update sessionwallet -= Amount in database*/
    if(datediff < (2 * 60 * 1000)) {
        searchAuctions(AuctionID).duetime.setTime(searchAuctions(AuctionID).duetime.getTime() + 2 * 60 * 1000);
        /*update duetime in database*/   
        }
        bids.insertBids(AuctionID, clientController.sessionClient, Amount, new Date());
        searchAuctions(AuctionID).highestBidder = clientController.sessionClient;    
    }

    async suspendAuction(AuctionID) {
        updateWallets(searchClients(searchAuctions(AuctionID).highestBidder).wallet) += searchBids(AuctionID);//refund previous highest bidder money with the highest bid amount currently
        updateAuctions(AuctionID).suspended = true;
        updateAuctions(AuctionID).duetime = new Date(); //set duetime to current time to end auction

    }

    async buyOut(AuctionID) {
        let datediff = searchAuctions(AuctionID).duetime - new Date(); 
        if (datediff <= 0) {
        return -2; //auction ended
        }
        if(searchWallets(clientController.sessionClient.walletID).balance < searchBids(AuctionID).BuyoutPrice) {//get wallet balance and compare it with buyout price
        return -1;
        }
        updateWallets(searchClients(searchAuctions(AuctionID).highestBidder).wallet) += searchBids(AuctionID);//refund previous highest bidder money with the highest bid amount currently
         walletController.sessionWallet.setBalance(walletController.sessionWallet.getBalance() - searchBids(AuctionID).BuyoutPrice);
        /*update sessionwallet -= BuyoutPrice in database*/
        
        searchAuctions(AuctionID).highestBidder = clientController.sessionClient; 
        
        //make sessionClient win auction
        //update sessionCLient 


        searchAuctions(AuctionID).duetime = new Date(); //set duetime to current time to end auction
        /*update duetime in database*/
        
    }

    async showCurrentBidders(AuctionID) { 
        return searchClients(searchBids(AuctionID).BidderID); //return list of bidders for the specified auction
    }

    async showCurrentBids(){
        searchBids(AuctionID); //return list of bids for the specified auction
    }

    async getAuctionId() {   
        return this.auctionId;
    }
    async isSuspicious() {
        return this.suspicious;
    }
    async getAuctionedItem() {
        return this.AuctionedItem;
    }
    async getDueTime() {
        return this.duetime;
    }
    async getSeller() {
        return this.seller;
    }
    async getBids() {
        return this.bids;
    }
    async getHighestBidder() {
        return this.highestBidder;
    }   

}