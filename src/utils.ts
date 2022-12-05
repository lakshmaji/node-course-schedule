import { Command } from "./models/command";


const trim = (value: string) => value.trim();
export const toInt = (value: string) => parseInt(value, 10)

export const parseCommandParams = (
  command: Command,
  params: string[],
  totalLines: number
) :(string | number)[] => {
    params = params.map(trim)
  switch (command) {
    case Command.CANCEL:
    case Command.REGISTER:
    case Command.ALLOT:
      return params;
    case Command.ADD_COURSE_OFFERING:
      return [
        ...params.slice(0, 3),
        ...params.slice(3, 5).map(toInt),
      ];
      case Command.ALLOT:
        return [...params, totalLines];
  }
};


