export default class Auction {
    auctionId;
    suspicious;
    bids = [];
    AuctionedItem;
    highestBidder;
    duetime;
    seller;


    constructor(auctionId, suspicious, AuctionedItem, duetime, seller) {
        this.auctionId = auctionId;
        this.suspicious = suspicious;
        this.AuctionedItem = AuctionedItem;
        this.duetime = duetime;
        this.seller = seller;
    }


    validateBid(ClientID,Amount) {
    if(Amount < bids[0].getBidAmount() && Amount > AuctionedItem.getBuyoutPrice && Amount > ClientID.wallet.balance) {
        return;
    } else { newbid = new Bid(ClientID, Amount);
        bids.push(newbid);
        this.highestBidder = ClientID;
        }
    }

    suspendAuction() {
        //implementation to suspend auction
    }

    buyOut(ClientID) {
        validateBid(ClientID, AuctionedItem.getBuyoutPrice);
    }

    showCurrentBidders() { 
        //implementation to show current bidders
    }

    showCurrentBids(){
        //implementation to show current bids
    }

    getAuctionId() {   
        return this.auctionId;
    }
    isSuspicious() {
        return this.suspicious;
    }
    getAuctionedItem() {
        return this.AuctionedItem;
    }
    getDueTime() {
        return this.duetime;
    }
    getSeller() {
        return this.seller;
    }
    getBids() {
        return this.bids;
    }
    getHighestBidder() {
        return this.highestBidder;
    }   

}