import { schemaUrl } from "../schemas/urlSchema.js"

export async function validateUrl(req, res, next){
    const url = req.body;
    try {
        const validation = schemaUrl.validate(url, {abortEarly: false});
        if(validation.error){
            return res.status(422).send(validation.error.details.map(detail => detail.message));
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }
    next()
}