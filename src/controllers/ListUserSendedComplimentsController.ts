import {Request, Response} from "express";
import {ListUserSendedComplimentsService} from "../services/ListUserSendedComplimentsService";

class ListUserSendedComplimentsController {
  async handle(req: Request, res:Response){
    const {user_id} = req;

    const listUserSendedComplimentsService = new ListUserSendedComplimentsService();

    const compliments = await listUserSendedComplimentsService.execute(user_id);

    return res.json(compliments);

  }
}

export {ListUserSendedComplimentsController}