import addCourse from "./core/addCourse";
import cancelCourse from "./core/cancelCourse";
import courseAllotment from "./core/courseAllotment";
import registerCourse from "./core/registerCourse";
import { Command } from "./models/command";

const commands: Record<Command, any> = {
  [Command.CANCEL]: cancelCourse,
  [Command.ADD_COURSE_OFFERING]: addCourse,
  [Command.REGISTER]: registerCourse,
  [Command.ALLOT]: courseAllotment,
};

export default commands;
