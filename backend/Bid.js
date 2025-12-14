export default class Bid { 
    bidderId;
    bidAmount;

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