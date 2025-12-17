import {searchClientbyusername} from "../Database/database.js";
export default class User{
    
    #userID;
    #username;
    #password;   
    #email;
    #role;      

    toSQL(){
        return{
        id:this.#userID,
        username:this.#username,
        roles:'Client',
        password:this.#password,
        email:this.#email};
    }

    constructor(username, password, email){
        this.#userID = 'u' + Math.trunc((Math.random() + Date.now()));
        this.#username = username;
        this.#password = password;
        this.#email = email;
        
    }

    
    //setters and getters
    getUserID(){return this.#userID;}
    getUsername(){return this.#username;}
    getPassword(){return this.#password;}
    setUsername(username){this.#username = username;}
    setPassword(password){this.#password = password;}
    setEmail(email){this.#email = email;}
    getEmail(){return this.#email;}
    setUserID(userID){this.#userID = userID;}


    static async searchUser(inputUsername){
        rows = await searchUser(inputUsername);
        return rows;
    }
    static async searchClient(inputUsername){
        rows = await searchClientbyusername(inputUsername);
        return rows;
    }

   static async verifyLogin(inputUsername, inputPassword){
        rows = await User.searchUser(inputUsername);
        if(rows.length === 0){
            return null;
        }
        else if (rows[0].userID[0] === 'a'){
            if(rows[0].password === inputPassword){
            sessionadmin = new Admin();
            sessionadmin.setUserID(rows[0].userID);
            sessionadmin.setUsername(rows[0].username);
            sessionadmin.setPassword(rows[0].password);
            sessionadmin.setEmail(rows[0].email);
            return sessionadmin;
            }
            else{
                return false;
            }
        }
        else{
            if(rows[0].password === inputPassword){
                rows2 = await searchClient(inputUsername);
                sessionclient = new Client();
                sessionclient.setUserID(rows2[0].userID);
                sessionclient.setUsername(rows2[0].username);
                sessionclient.setPassword(rows2[0].password);
                sessionclient.setEmail(rows2[0].email);
                sessionclient.setSuspicious(rows2[0].suspicious);
                sessionclient.setSuspended(rows2[0].suspended);
                sessionclient.setPoints(rows2[0].points);
                sessionclient.setLevel(rows2[0].level);
                sessionclient.setWalletID(rows2[0].walletID);
                return sessionclient;
            }

            else{
                return false;
            }


        }
       
    }








    async showCredentials(){
        
    }
}

