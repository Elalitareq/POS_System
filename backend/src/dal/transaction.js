import prisma from '../utils/prisma';

async function getAllTransactions() {
  return await prisma.transaction.findMany({
    include: { details: true }, // Include transaction details by default
  });
}

async function getTransactionById(id) {
  return await prisma.transaction.findUnique({
    where: { id },
    include: { details: true }, // Include transaction details
  });
}

async function createTransaction(data) {
  return await prisma.transaction.create({
    data,
  });
}

async function updateTransaction(id, data) {
  return await prisma.transaction.update({
    where: { id },
    data,
  });
}

async function deleteTransaction(id) {
  return await prisma.transaction.delete({
    where: { id },
  });
}

const transactionDAL = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};

export default transactionDAL;
