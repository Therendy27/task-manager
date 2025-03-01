import { UpdateForm } from "@/components/editform";
import { getTaskById } from "@/lib/action";
import { notFound } from "next/navigation";
  
const UpdateTaskPage = async ({ params }: { params: { id: string } }) => {
    const id = params.id;
    const task = await getTaskById(id);
    console.log(id);
  
    if (!task) {
        notFound();
    }
  
    return (
    <div className="max-w-md mx-auto mt-5">
      <h1 className="text-2xl text-center mb-2">Update Task</h1>
        <UpdateForm task={task}/>
    </div>
  );
};
  
export default UpdateTaskPage;
