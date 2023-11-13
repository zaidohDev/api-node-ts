import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Room } from "../entities/Room";

export const RoomRepository: Repository<Room> =
  AppDataSource.getRepository(Room);
