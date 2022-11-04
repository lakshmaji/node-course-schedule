import { Commands } from "./models/command";


const trim = (value: string) => value.trim();
export const toInt = (value: string) => parseInt(value, 10)

export const parseCommandParams = (
  command: Commands,
  params: string[],
  totalLines: number
) :(string | number)[] => {
    params = params.map(trim)
  switch (command) {
    case Commands.CANCEL:
    case Commands.REGISTER:
    case Commands.ALLOT:
      return params;
    case Commands.ADD_COURSE_OFFERING:
      return [
        ...params.slice(0, 3),
        ...params.slice(3, 5).map(toInt),
      ];
      case Commands.ALLOT:
        return [...params, totalLines];
  }
};


