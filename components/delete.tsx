//components\delete.tsx
import { deleteTask} from "@/lib/action";
  
export const DeleteButton = ({ id }: { id: string }) => {
  const DeleteTasktWithId = deleteTask.bind(null, id);
  return (
    <form action={DeleteTasktWithId}>
      <button className="btn btn-error">
        Delete
      </button>
    </form>
  );
};
