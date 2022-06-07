import { Prisma } from '@prisma/client';

export const errorHandler = (e: unknown) => {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    // The .code property can be accessed in a type-safe manner
    if (e.code === 'P2002') {
      var messageArr = e.message.split(' ');
      var target = messageArr[messageArr.length - 1];

      return `A Informação ${target.toUpperCase()} já está cadastrado no sistema!`;
    } else {
      return e.message;
    }
  } else {
    const error = e as Error;
    return error.message;
  }
};
