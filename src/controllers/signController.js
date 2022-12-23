import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import * as signRepository from "../repositories/signRepository.js";

async function signup(req, res){
    const user = req.body;

    try {
        
        const result = await signRepository.emailValidate(user.email);
        if(result > 0){
            return res.status(409).send("E-mail já utilizado!");
        }

        const { name, email, password } = user
        const passwordCrypt = bcrypt.hashSync(password, 10);

        signRepository.insertUser(name, email, passwordCrypt);

        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

}

async function signin(req, res){
    const { email, password } = req.body;

    try {
        const result = await signRepository.consultEmail(email);
        const passwordValid = bcrypt.compareSync(password, result.rows[0].password);

        if(result && passwordValid){
            const token = uuid();
            const userId = result.rows[0].id;
            await signRepository.createToken(userId, token);
            return res.status(200).send(token);
        } else{
            return res.status(401).send("E-mail ou senha incorretos");
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }
}

export { signup, signin };
