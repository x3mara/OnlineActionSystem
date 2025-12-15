import Bid from "./Bid.js";
import Client from "./Client.js";
import clientController from "../controllers/clientController.js";

export default class Auction {
    auctionId;
    suspicious;
    AuctionedItem;
    highestBidder;
    duetime;
    seller;

    toSQL(){
        return{
        id: this.auctionId,
        sus_counter: this.suspicious,
        suspended: false,
        item_id: this.AuctionedItem,
        highest_bidder: this.highestBidder,
        due_date: this.duetime,
        seller_id: this.seller};
    }


    constructor(auctionId, suspicious, AuctionedItem, duetime, seller) {
        this.auctionId = auctionId;
        this.suspicious = suspicious;
        this.AuctionedItem = AuctionedItem;
        this.duetime = duetime;
        this.seller = seller;
    }


    async validateBid(Amount) {
    clientController.sessionClient;   
    
    
    if(Amount < bids[0].getBidAmount() || Amount > AuctionedItem.getBuyoutPrice || Amount > ClientID.wallet.balance) {
        return;
    } else { newbid = new Bid(ClientID, Amount);
        bids.push(newbid);
        this.highestBidder = ClientID;
        }
    }

    async suspendAuction() {
        //implementation to suspend auction
    }

    async buyOut(ClientID) {
        validateBid(ClientID, AuctionedItem.getBuyoutPrice);
    }

    async showCurrentBidders() { 
        //implementation to show current bidders
    }

    async showCurrentBids(){
        //implementation to show current bids
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