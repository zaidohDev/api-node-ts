import { Request, Response } from "express";
import { NotFoundError } from "../../helpers/api-errors";
import { RoomRepository } from "../../repositories/roomRepository";
import { SubjectRepository } from "../../repositories/subjectRepository";

type SubjectTypes = {
  subject_id: string;
};

export class AddSubjectToRoomController {
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
