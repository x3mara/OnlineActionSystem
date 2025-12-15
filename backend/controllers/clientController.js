import User from '../User.js';
import Client from '../Client.js';
export default class clientController{


    async register(inputUsername, inputPassword, inputEmail){

        if (inputPassword.length<8){
            return "Password must be at least 8 characters long";
        }
        if (inputEmail.length<5 || !inputEmail.includes('@')){
            return "Invalid email address";
        }
        
        client = Client.insertClient(inputUsername, inputPassword, inputEmail);
        if (client == null){
            return "Username already exists";
        }
        
    }

}