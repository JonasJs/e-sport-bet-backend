import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {

  const user = await prisma.user.create({
    data: {
      email: 'joonasbalves@gmail.com',
      name: 'Joonas Balves',
      avatarUrl: 'https://ithub.com/jonasjs.png',
    }
  });

  const pool = await prisma.pool.create({
    data: {
      title:  'My first pool',
      code: 'JBA123',
      ownerId: user.id,
      participants: {
        create: {
          userId: user.id,
        }
      }
    }
  });

  await prisma.game.create({
    data: {
      date: '2022-11-02T14:33:51.903Z',
      teams: {
        create: [
          {
            name: 'Team 1',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/17/LOUD_LOGO.png'
          },
          {
            name: 'Team 2',
            imageUrl: 'https://i.pinimg.com/736x/0e/81/af/0e81af0219d5ba34c32d0607744faed7.jpg'
          }
        ]
      },
      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 3,
          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              },
            }
          }
        }
      }
    }
  })

}

main()