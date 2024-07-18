"use server";

import { z } from "zod"; //npm i zod https://www.npmjs.com/package/zod
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
 
const TaskSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(6),
});

export const saveTask = async (prevSate: any, formData: FormData) => {
    const validatedFields = TaskSchema.safeParse(
      Object.fromEntries(formData.entries())
    );
    
    if (!validatedFields.success) {
      return {
        Error: validatedFields.error.flatten().fieldErrors,
      };
    }


try {
    await prisma.task.create({
      data:{
        title: validatedFields.data.title,
        description: validatedFields.data.description
      }
    })
  } catch (error) {
    return { message: "Failed to create new task" };
  }

  revalidatePath("/");
  redirect("/");
};
 

export const getTasklist = async (query: string) => {
  try {
    const tasks = await prisma.task.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return tasks;
  } catch (error) {
    throw new Error("Failed to fetch tasks data");
  }
};

export const getData = async (query: string) => {
  try {
    const task = await prisma.task.findMany({
        where: {
            title: {
            contains: query,
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return task;
  } catch (error) {
    throw new Error("Failed to fetch task data");
  }
};
 

export const getTaskById = async (id: string) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id },
    });
    return task;
  } catch (error) {
    throw new Error("Failed to fetch contact data");
  }
};
 
export const updateTask = async (
  id: string,
  prevSate: any,
  formData: FormData
) => {
  const validatedFields = TaskSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  
  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.task.update({
      data: {
        title: validatedFields.data.title,
        description: validatedFields.data.description,   
      },
      where: { id },
    });
    console.log("success");
  } catch (error) {
    return { message: "Failed to update task" };
  }
  
  revalidatePath("/task");
  redirect("/task");
};

export const deleteTask = async (id: string) => {
  try {
    await prisma.task.delete({
      where: { id },
    });
  } catch (error) {
    return { message: "Failed to delete task" };
  }
  
  revalidatePath("/task");
};

