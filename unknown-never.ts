let userInput: unknown;
let userName: string;

userInput = 'max';
if (typeof userInput === 'string') {
  userName = userInput;
}

function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
}

generateError('Eror occured', 500);