import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Subject } from "../entities/Subject";

export const SubjectRepository: Repository<Subject> =
  AppDataSource.getRepository(Subject);
