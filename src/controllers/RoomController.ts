import { Request, Response } from "express";
import { RoomRepository } from "../repositories/roomRepository";
import { VideoRepository } from "../repositories/videoRepository";
import { SubjectRepository } from "../repositories/subjectRepository";
import { Subject } from "../entities/Subject";
import { Room } from "../entities/Room";
import { BadRequestError, NotFoundError } from "../helpers/api-errors";

type SubjectTypes = {
  subject_id: string;
};

export class RoomtController {
  async create(req: Request, res: Response) {
    const { name } = req.body;

    if (!name) {
      throw new BadRequestError("Invalid Request");
    }

    const newRoom = RoomRepository.create({ name });
    const response = await RoomRepository.save(newRoom);

    return res.status(201).json({ obj: response });
  }

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

  async addSubjectToRoom(req: Request, res: Response) {
    const { subject_id } = <SubjectTypes>req.body;
    const { idRoom } = req.params;

    const room = await RoomRepository.findOneBy({ id: +idRoom });

    if (!room) {
      throw new NotFoundError("No room were found");
    }

    const subject = await SubjectRepository.findOneBy({
      id: parseInt(subject_id),
    });

    if (!subject) {
      throw new NotFoundError("No subject were found");
    }

    const roomUpdate = {
      ...room,

      subjects: [subject],
    };

    await RoomRepository.save(roomUpdate);

    return res.status(201).json({ obj: room });
  }
}
