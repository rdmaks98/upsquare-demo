import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Avtar } from "../entity/avtar";


let NAMESPACE = "USER CONTROLLER";
const AvtarController = {


    async avtar(req: Request, res: Response, next: NextFunction) {
        try {
            // @ts-ignore
            const repository = getRepository(Avtar)
            const user = await repository.find();
            res.status(200).json({ success: true, user });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
}
export default AvtarController;