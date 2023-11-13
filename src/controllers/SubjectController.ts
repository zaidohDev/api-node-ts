import { Request, Response } from "express";
import { SubjectRepository } from "../repositories/subjectRepository";

export class SubjectController {
  async create(req: Request, res: Response) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Field name is required" });
    }
    try {
      const newSubject = SubjectRepository.create({ name });
      const response = await SubjectRepository.save(newSubject);

      return res.status(201).json({ obj: response });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

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
