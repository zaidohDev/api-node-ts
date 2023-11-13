import { Request, Response } from "express";
import { NotFoundError } from "../../helpers/api-errors";
import { RoomRepository } from "../../repositories/roomRepository";
import { VideoRepository } from "../../repositories/videoRepository";

export class CreateVideoWithRoomController {
  async createVideo(req: Request, res: Response) {
    const { title, url } = req.body;
    const { idRoom } = req.params;

    const room = await RoomRepository.findOneBy({ id: +idRoom });

    if (!room) {
      throw new NotFoundError("No room were found");
    }

    const video = VideoRepository.create({
      url,
      title,
      room,
    });

    const response = await VideoRepository.save(video);

    return res.status(201).json({ obj: response });
  }
}
