export type commandType = {
  command: string;
  param1?: string;
  param2?: string;
}

export const parseCommand = (commandLine: string): commandType => {
  const isCommandWithParams = commandLine.includes(' ');

  if (isCommandWithParams) {
    const paramsArr = commandLine.toString().split(' ');

    return {
      command: paramsArr[0],
      param1: paramsArr[1],
      param2: paramsArr[2] || undefined,
    };
  }
  return {
    command: commandLine,
  };
};
