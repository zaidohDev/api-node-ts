import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Video } from "../entities/Video";

export const VideoRepository: Repository<Video> =
  AppDataSource.getRepository(Video);
