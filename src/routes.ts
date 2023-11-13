import { Router } from "express";

import {
  AddSubjectToRoomController,
  CreateRoomController,
  CreateSubjectController,
  CreateVideoWithRoomController,
  ListRoomController,
  ListSubjectController,
} from "./controllers";
const routes = Router();

routes.get("/subjects", new ListSubjectController().list);

routes.post("/subjects", new CreateSubjectController().create);

routes.get("/rooms", new ListRoomController().list);

routes.post("/rooms", new CreateRoomController().create);

routes.post(
  "/rooms/:idRoom/create",
  new CreateVideoWithRoomController().createVideo
);
routes.post(
  "/rooms/:idRoom/subject",
  new AddSubjectToRoomController().addSubjectToRoom
);

export default routes;
