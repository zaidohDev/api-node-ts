import { Request, Response } from "express";
import { BadRequestError } from "../../helpers/api-errors";
import { RoomRepository } from "../../repositories/roomRepository";

export class CreateRoomController {
  async create(req: Request, res: Response) {
    const { name } = req.body;

    if (!name) {
      throw new BadRequestError("Invalid Request");
    }

    const newRoom = RoomRepository.create({ name });
    const response = await RoomRepository.save(newRoom);

    return res.status(201).json({ obj: response });
  }
}
