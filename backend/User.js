class User{
    
    #userID;
    #username;
    #password;   
    #email;
    constructor(userID, username, password){
        this.#userID = userID;
        this.#username = username;
        this.#password = password;
    }

    //setters and getters
    getUserID(){return this.#userID;}
    getUsername(){return this.#username;}
    getPassword(){return this.#password;}
    setUsername(username){this.#username = username;}
    setPassword(password){this.#password = password;}
    setEmail(email){this.#email = email;}
    getEmail(){return this.#email;}

    login(inputUsername, inputPassword){
        //DATABASE TO VERIFY ????
    }
}