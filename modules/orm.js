import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const hashPassword = async (password) => {
  try {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  } catch (error) {
    console.error(error);
  }
};

export const comparePassword = async (plaintextPassword, hashedPassword) => {
  try {
    if (await argon2.verify(hashedPassword, plaintextPassword)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};

// Initialize Prisma Client
const prisma = new PrismaClient();

export const createUser = async (username, password) => {
  const hash = await hashPassword(password);
  const newUser = await prisma.user.create({
    data: {
      username,
      password: hash,
    },
  });
  console.log("New user created:", newUser);
  return newUser;
};

export const deleteUser = async (username) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: { username },
    });
    console.log("User deleted:", deletedUser);
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (username) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    return user;
  } catch (error) {
    console.error(error);
  }
};

export const getAllUser = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error(error);
  }
};

const getNode = async (owner, nodeId) => {
  return await prisma.node.findUnique({
    where: {
      owner_trackId: {
        owner,
        trackId: nodeId, // Check for an existing node with the same owner and trackId
      },
    },
  });
};

const updatePrev = async (owner, nodeId, prev) => {
  await prisma.node.update({
    where: {
      owner_trackId: {
        owner,
        trackId: nodeId, // Using trackId instead of tackId
      },
    },
    data: {
      prevId: prev,
    },
  });
};

const updateNext = async (owner, nodeId, next) => {
  await prisma.node.update({
    where: {
      owner_trackId: {
        owner,
        trackId: nodeId, // Using trackId instead of tackId
      },
    },
    data: {
      nextId: next,
    },
  });
};

export const addNode = async (owner, nodeId) => {
  if (await getNode(owner, nodeId)) {
    return false;
  }
  // create new node
  await prisma.node.create({
    data: {
      owner,
      trackId: nodeId,
    },
  });
  // Get the user to check if they already have a tail node
  const user = await getUser(owner);
  if (user.tail) {
    await updateNext(owner, user.tail, nodeId);
    await updatePrev(owner, nodeId, user.tail);
  }
  // Update the user's tail reference to the new node
  await prisma.user.update({
    where: { username: owner },
    data: { tail: nodeId },
  });
  return true;
};

export const removeNode = async (owner, nodeId) => {
  const node = await getNode(owner, nodeId);
  if (!node) {
    return false;
  }
  // If the node has a previous node, update its nextId to point to the node after the current node
  if (node.prevId) {
    await updateNext(owner, node.prevId, node.nextId);
  }
  // If the node has a next node, update its prevId to point to the node before the current node
  if (node.nextId) {
    await updatePrev(owner, node.nextId, node.prevId);
  }
  // If the node being removed is the tail, update the user's tail to point to the previous node
  const user = await getUser(owner);
  if (user.tail === nodeId) {
    await prisma.user.update({
      where: { username: owner },
      data: { tail: node.prevId },
    });
  }
  // Delete the node from the database
  await prisma.node.delete({
    where: {
      owner_trackId: {
        owner,
        trackId: nodeId,
      },
    },
  });
  return true;
};

//gather playlist
export const gatherAllNodes = async (owner) => {
  // Get the user to find the tail node
  const user = await getUser(owner);
  // If the user has no tail, return an empty array
  if (!user.tail) {
    return [];
  }
  // Start from the tail node and keep moving upwards
  let nodeId = user.tail;
  const nodeIds = [];
  // Traverse the linked list, collecting trackIds
  while (nodeId) {
    const node = await getNode(owner, nodeId);
    // If node doesn't exist, break the loop
    if (!node) {
      break;
    }
    // Push the current node's trackId into the array
    nodeIds.push(node.trackId);
    // Move to the previous node
    nodeId = node.prevId;
  }
  // Reverse the array to get the correct order
  return nodeIds.reverse();
};

// swap elements
export const swapNode = async (owner, nodeId, direction) => {
  const node = await getNode(owner, nodeId);
  if (!node) return null;

  const user = await getUser(owner);

  if (direction < 0 && node.prevId) {
    const prev = await getNode(owner, node.prevId);
    if (!prev) return null;

    const prevPrev = prev.prevId;
    const next = node.nextId;

    if (prevPrev) await updateNext(owner, prevPrev, node.trackId);
    if (next) await updatePrev(owner, next, prev.trackId);

    await updatePrev(owner, node.trackId, prevPrev);
    await updateNext(owner, node.trackId, prev.trackId);

    await updatePrev(owner, prev.trackId, node.trackId);
    await updateNext(owner, prev.trackId, next);

    if (user.tail === node.trackId) {
      await prisma.user.update({
        where: { username: owner },
        data: { tail: prev.trackId },
      });
    }

    return prev.trackId;
  }

  if (direction > 0 && node.nextId) {
    const next = await getNode(owner, node.nextId);
    if (!next) return null;

    const nextNext = next.nextId;
    const prev = node.prevId;

    if (prev) await updateNext(owner, prev, next.trackId);
    if (nextNext) await updatePrev(owner, nextNext, node.trackId);

    await updatePrev(owner, next.trackId, prev);
    await updateNext(owner, next.trackId, node.trackId);

    await updatePrev(owner, node.trackId, next.trackId);
    await updateNext(owner, node.trackId, nextNext);

    if (user.tail === next.trackId) {
      await prisma.user.update({
        where: { username: owner },
        data: { tail: node.trackId },
      });
    }

    return next.trackId;
  }

  return null;
};
