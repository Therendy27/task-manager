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
  
  revalidatePath("/task");
  redirect("/task");
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