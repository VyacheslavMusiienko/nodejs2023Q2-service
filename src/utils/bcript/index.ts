import * as bcrypt from 'bcryptjs';

export const hashData = async (data: string) => {
  const saltRounds = Number(process.env.CRYPT_SALT) || 10;
  return bcrypt.hash(data, saltRounds);
};

export const compareData = async (data: string, hashData: string) => {
  return bcrypt.compare(data, hashData);
};
