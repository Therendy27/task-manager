//components\editform.tsx
"use client";
  
import { updateTask } from "@/lib/action";
import { useFormState } from "react-dom";
import type { Task } from "@prisma/client";
  
const UpdateForm = ({ task }: { task: Task }) => {
    const UpdateTaskWithId = updateTask.bind(null, task.id);
    const [state, formAction] = useFormState(UpdateTaskWithId, null);
  
    return (
    <div>
      <form action={formAction}>
        <div className="mb-5">
          <label htmlFor="name" className="block text-sm font-medium text-gray-900">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="input input-bordered bg-white w-full max-w-xs"
            placeholder="Full Name..."
            defaultValue={task.title}
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.title}</p>
          </div>
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-medium text-gray-900">
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            className="input input-bordered bg-white w-full max-w-xs"
            placeholder="Email..."
            defaultValue={task.description}
          />
          <div id="email-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2  text-sm text-red-500">{state?.Error?.description}</p>
          </div>
        </div>
        <button className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};
  
export default UpdateForm;