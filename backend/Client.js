import User from "./User.js";
import Wallet from "./Wallet.js";
import {searchClientbyusername,insert, viewAllAuctions, getMyAuctions, updatesuscounteruser, updateUserSuspendedStatus} from "../Database/database.js";
import session from "express-session";
export default class Client extends User{

    #suspicious; //int
    #suspended; //bool
    #points; //int
    #level; //int
    #currentCosmetic; //string

    toSQL(){
        return{
        user_id: super.getUserID(), 
        suscounter: this.#suspicious,
        suspended: this.#suspended,
        current_cosmetic: this.#currentCosmetic,
        points: this.#points,
        levels: this.#level};
        
    }
    
    static async fromSQL(data){
        console.log(data);
        const client = new Client(data.username,data.password,data.email);
        client.setUserID(data.id);
        client.setAvatar(data.userimg);
        // client.#suspicious = ;
        // client.#suspended = false;
        // client.#points = 0;
        // client.#level = 0;
        return client;
    }

    static async searchClient(inputUsername){
        let rows = await searchClientbyusername(inputUsername);
        if(rows.length == 0){
            console.log("User Not Found");
            return null;
        }
        return Client.fromSQL(rows[0]);
    }

    constructor(username, password, email){
        super(username, password, email);
        this.#suspicious = 0;
        this.#suspended = false;
        this.#points = 0;
        this.#level = 0;
    }

    //setters and getters
    getSuspicious(){return this.#suspicious;}
    getSuspended(){return this.#suspended;}
    getpoints(){return this.#points;}
    getLevel(){return this.#level;}

    incrementSuspicious(){this.#suspicious++ ;}
    setSuspended(suspended){this.#suspended = suspended;}
    setPoints(points){this.#points = points;}
    setLevel(level){this.#level = level;}

    static async insertClient(inputUsername, inputPassword, inputEmail){
        const rows = await User.searchClient(inputUsername);
        if(rows.length === 0){
            const sessionClient = new Client(inputUsername, inputPassword, inputEmail);
            const sqlObject= sessionClient.toSQL();
            const sqlObjectUser={
                id: sessionClient.getUserID(),
                username: sessionClient.getUsername(),
                password: sessionClient.getPassword(),
                email: sessionClient.getEmail(),
                roles: 'Client'

            }
            //inputPassword = inputPassword.hashCode(); //hashcode function needs implementation
            await insert("users", sqlObjectUser);
            await insert("clients", sqlObject);
            return sessionClient; 
        }
        else{
            return null; // username already exists
        }
      
    }


    
    static async viewAllAuctions(){
        const rows = await viewAllAuctions();
        return rows;
    }
    async getMyAuctions(){
        const rows = await getMyAuctions(this.getUserID());
        return rows;
    }

    static async incrementSuspicious(id){
        await updatesuscounteruser(id);
    }

    static async suspendedUser(id){
        await updateUserSuspendedStatus(id, true);
    }
}