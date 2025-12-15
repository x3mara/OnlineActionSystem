export default class User{
    
    #userID;
    #username;
    #password;   
    #email;
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


    
    async login(inputUsername, inputPassword){
        const [rows] = await pool.query(
        'SELECT * FROM clients WHERE username = ? LIMIT 1',
        [inputUsername]);
        if(rows.length === 0){
            return false;
        }
        if(rows.password === inputPassword){
            return true;
        }
        else{
            return false;
        }
    }


    async showCredentials(){
        
    }
}

