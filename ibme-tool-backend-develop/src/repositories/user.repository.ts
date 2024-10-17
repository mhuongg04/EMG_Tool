import prisma from "../configs/prisma";

const UserRepository = {
  async findUserById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        files: true,
      },
    });
  },

  async findUserByUserName(username: string) {
    return prisma.user.findUnique({
      where: {
        username,
      },
    });
  },

  async saveUser(username: string, password: string) {
    return prisma.user.create({
      data: {
        username,
        password,
      },
    });
  },
};

export default UserRepository;
