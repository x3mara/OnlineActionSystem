export default class Bid { 

    bidderId;
    bidAmount;
    bidTime;
    auctionID;

    toSQL(){
        return{
        bidamount: this.bidAmount,
        bidtime: new Date(),
        auction_id: this.auctionID,
        users_id: this.bidderId};
    }

    constructor(bidderId, bidAmount) {
        this.bidderId = bidderId;
        this.bidAmount = bidAmount;
    }

    getBidderId() {
        return this.bidderId;
    }
    getBidAmount() {    
        return this.bidAmount;
    }

}