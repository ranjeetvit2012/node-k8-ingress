
//import { PrismaClient } from '@prisma/client';
import { PrismaClient } from './generated/prisma/client'
const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log('✅ Prisma connected to the database successfully.');
  } catch (error) {
    console.error('❌ Failed to connect to the database with Prisma.');
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();


export default prisma
