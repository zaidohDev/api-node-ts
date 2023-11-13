import { Request, Response } from "express";
import { NotFoundError } from "../../helpers/api-errors";
import { RoomRepository } from "../../repositories/roomRepository";

export class ListRoomController {
  async list(req: Request, res: Response) {
    const room = await RoomRepository.find({
      relations: {
        subjects: true,
        videos: true,
      },
    });

    if (!room) {
      throw new NotFoundError("No room were found");
    }

    return res.status(200).json({ obj: room });
  }
}
