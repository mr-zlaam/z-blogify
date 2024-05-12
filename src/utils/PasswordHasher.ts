import bcrypt from "bcrypt";

export const passwordHasher = async (password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error: any) {
    console.log(error.message);
    return;
  }
};
