import fs from "fs";
import { Command } from "./src/models/command";
import { parseCommandParams } from "./src/utils";
import commands from "./src/commands";

function main(fileContent: Buffer) :void {
  const lines = fileContent.toString().split("\n");

  lines.forEach((line, i) => {
    const [command, ...params] = line.split(" ");
    const sanitizedParams = parseCommandParams(command as Command, params, lines.length)

    const result = commands[command as Command].apply(null, sanitizedParams)
    if (result) {
        console.log(result);
    }
  });
}

const data = fs.readFileSync(process.argv[2]);
main(data);

export default main;
