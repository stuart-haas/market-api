import {Request, Response} from "express"

export async function indexGetAction(request: Request, response: Response) {
    response.send("Index get action")
}