// import { getTasklist } from "@/lib/action";
import { getData } from "@/lib/action";
import { formatDate } from "@/lib/utlis";
import Link from "next/link";
import { DeleteButton } from "./delete";


const Task = async ({
    query
     }: {
    query: string;
     }) => {
        const tasks = await getData(query);
    return(
        <table className="table  bg-white">
            <thead className="text-sm text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th className="py-3 px-6">#</th>
                    <th className="py-3 px-6">Title</th>
                    <th className="py-3 px-6">Description</th>
                    <th className="py-3 px-6">Created At</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((rs,index) => (
                <tr className=" border-b"> 
                     <td className="py-3 px-6">{index +1}</td>
                     <td className="py-3 px-6">{rs.title}</td>
                     <td className="py-3 px-6">{rs.description}</td>
                     <td className="py-3 px-6">
                        {formatDate(rs.createdAt.toString())}
                     </td>
                     
               
                <td className="flex justify-center gap-1 py-3">
                    <Link
                       href={`/task/edit/${rs.id}`}
                       className="btn btn-info"
                    >
                      Edit
                    </Link>
                    <DeleteButton id={rs.id}/>
                </td>
                </tr>
                ))}
            </tbody>
        </table>


    )
  }


export default Task;