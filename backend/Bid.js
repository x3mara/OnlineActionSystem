export default class Bid { 

    bidderId;
    bidAmount;
    bidTime;
    auctionID;

    toSQL(){
        return{
        bidamount: this.bidAmount,
        bidtime: this.bidTime,
        auction_id: this.auctionID,
        users_id: this.bidderId};
    }

    constructor(auctionID, bidderId, bidAmount, bidtime) {
        this.bidderId = bidderId;
        this.auctionID = auctionID;
        this.bidAmount = bidAmount;
        this.bidTime = bidtime;
    }

    getBidderId() {
        return this.bidderId;
    }
    getBidAmount() {    
        return this.bidAmount;
    }
    getBidTime() {
        return this.bidTime;
    }
}