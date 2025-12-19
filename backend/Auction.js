import Bid from "./Bid.js";
import Client from "./Client.js";
import clientController from "./controllers/clientController.js";
import walletController from "./controllers/walletController.js";
import {searchAuction, updateduedate, searchWalletbyWalletID, searchWalletbyid, getSellerName,searchItem, insert, viewBidsforAuction, searchClientbyid, updatewalletbalance, updatehighestbid , getEverythingWithItem , getImgs,getAllbidsforAuction} from "../Database/database.js";

export default class Auction {
    auctionID;//int
    suspicious;//int
    AuctionedItem;//string (itemID)
    duetime;//datetime
    suspended;//bool
    highestBidder;//string (clientID)
    startingPrice;//float
    seller;//string (clientID)
    
    toSQL(){
        return{
        id: this.auctionID,
        sus_counter: this.suspicious, //sus counter
        suspended: false, //OA Reference
        item_id: this.AuctionedItem,
        highest_bidder: this.highestBidder,
        due_date: this.duetime,
        seller_id: this.seller};
    }


    constructor(AuctionedItem, duetime, seller, startingPrice) {
        this.auctionID = Date.now();
        this.suspicious = 0;
        this.AuctionedItem = AuctionedItem;
        this.duetime = duetime;
        this.seller = seller;
        this.suspended = false;
        this.startingPrice = startingPrice;
        this.highestBidder = null;
        this.highest_bid = startingPrice;
    }

    static async insertAuction(sessionAuction){
        await insert("auction", sessionAuction.toSQL()); 
    }

    async makeBid(AuctionID, Amount, sessionUser, sessionWallet) {
        
        let fealks = await searchAuction(AuctionID);
        let datediff = new Date(fealks.due_date) - new Date(); 
        let highestbiddah = fealks.highest_bidder;

        if (datediff <= 0) {
            return -2; //auction ended
        }

        if (await searchItem(fealks.item_id).buy_out_price <= Amount) {
            Buyout(sessionUser, AuctionID);
            return 1; //buyout successful
        }

        const bidrows = await viewBidsforAuction(AuctionID);

        if(Amount < bidrows[bidrows.length-1].bidamount/*get the highest bid amount currently*/ || Amount > await searchWalletbyid(sessionUser.userID).balance || Amount < fealks.starting_price) {
            return -1;
        }

        await updatewalletbalance(await searchWalletbyid(highestbiddah), (await searchWalletbyid(highestbiddah).balance + bidrows[bidrows.length-1].bidamount));//refund previous highest bidder money with the highest bid amount currently

        newbid = new Bid(AuctionID, sessionUser.userID, Amount);

        sessionWallet.setBalance(sessionWallet.getBalance() - Amount);

        await updatewalletbalance(await searchWalletbyWalletID(sessionWallet), sessionWallet.getBalance() - Amount)  //update sessionwallet -= Amount in database

        if(datediff < (2 * 60 * 1000)) {
            await updateduedate(AuctionID, new Date(searchAuction(AuctionID).due_date + 2 * 60 * 1000));/*update duetime in database*/
            }

        await updatehighestbid(AuctionID, sessionUser.userID, Amount);
        await insert("bid", newbid.toSQL());

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

    static async  getAuctiondetails(AuctionID){
        return getEverythingWithItem(AuctionID);
    }

    static async  getSellerName(AuctionID){
        return this.getSellerName(AuctionID);
    }

    static async getAllbidders(AuctionID){
        return getAllbidsforAuction(AuctionID);
    }

}