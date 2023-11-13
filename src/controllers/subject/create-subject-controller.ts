import { SubjectRepository } from "../../repositories/subjectRepository";
import { Request, Response } from "express";

export class CreateSubjectController {
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
}
