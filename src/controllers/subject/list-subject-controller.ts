import { SubjectRepository } from "../../repositories/subjectRepository";
import { Request, Response } from "express";

export class ListSubjectController {
  async list(req: Request, res: Response) {
    try {
      const subject = await SubjectRepository.find();

      if (!subject) {
        return res.status(400).json({ message: "No subjects were found" });
      }
      return res.status(200).json({ obj: subject });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
}
