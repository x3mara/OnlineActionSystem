import Client from "../Client.js";
import Auction from "../Auction.js";
import Item from "../Item.js";

export function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function getAllAuctions(){
    let auctions = await Client.viewAllAuctions();
    const itemPromises = auctions.map(auction => 
        Item.getItemthroughID(auction.item_id) 
    );
    const AuItems = await Promise.all(itemPromises);

    // Fetch images for each item
    const imagePromises = AuItems.map(item => 
        Item.getItemImgId(item ? item.id : null)
    );
    const ItemImages = await Promise.all(imagePromises);
    
    return auctions.map((auction, index) => {
        const item = AuItems[index] || {};
        const images = ItemImages[index] || [];
        
        return {
            auction: auction,      
            item: item,
            ItemImage: images.length > 0 ?
            images.map(img => img.itemimg):
            'static/public/images/SignUpHero.png' // Get hero image
        };
    });
}