import fs from "fs";
import addCourse from "./src/core/addCourse";
import allotment from "./src/core/courseAllotment";
import cancelCourse from "./src/core/cancelCourse";
import register from "./src/core/registerCourse";
import { Commands } from "./src/models/command";
import { Course } from "./src/models/course";
import { Employee } from "./src/models/employee";
import { parseCommandParams } from "./src/utils";

const binder: Record<Commands, any> = {
  [Commands.CANCEL]:  cancelCourse,
  [Commands.ADD_COURSE_OFFERING]:  addCourse,
  [Commands.REGISTER]:  register,
  [Commands.ALLOT]:  allotment,
}

function main(fileContent: Buffer) :void {
  const lines = fileContent.toString().split("\n");

  lines.forEach((line, i) => {
    const [command, ...params] = line.split(" ");
    const sanitizedParams = parseCommandParams(command as Commands, params, lines.length)

    const result = binder[command as Commands].apply(null, sanitizedParams)
    if (result) {
        console.log(result);
    }
  });
}

const data = fs.readFileSync(process.argv[2]);
main(data);

export default main;
