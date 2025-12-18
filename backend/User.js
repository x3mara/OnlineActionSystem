import {searchUser,searchClientbyusername} from "../Database/database.js";
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
    // fromSQL(rows){
    //     #id:this.rows[0],
    //     #username:this.rows[1],
    //     #roles:rows[2],
    //     #password:this.rows[3],
    //     #email:this.rows[4];
    // }

    constructor(username, password, email){
        this.#userID = 'u' + Math.trunc((Math.random() + Date.now()));
        this.#username = username;
        this.#password = password;
        this.#email = email;
        
    }

    static async searchClient(inputUsername){ // i dont really like this logic
        let rows = await searchClientbyusername(inputUsername);
        return rows; 
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


    static async searchUserEntity(inputUsername){
        let rows = await searchUser(inputUsername);
        return rows;
    }
    
   static async verifyLogin(inputUsername, inputPassword){
        let rows = await User.searchUserEntity(inputUsername);
        let user = rows[0];
        if(rows.length === 0){
            return null;
        }
        else if (user.id[0] === 'a'){
            if(user.password === inputPassword){
            return rows[0].username;
            }
            else{
                return false;
            }
        }
        else{
            if(user.password === inputPassword){
                let rows2 = await User.searchClient(inputUsername);
                return rows2[0].username;
            }
            else{
                return false;
            }
        }
       
    }

    async showCredentials(){
        
    }
}

