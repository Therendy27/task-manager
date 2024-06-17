import { getTasklist } from "@/lib/action";


const Task = async ({
    query
     }: {
    query: string;
     }) => {
        const tasks = await getTasklist(query);
    return(
        <table className="table table-zebra">
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
                <tr className="bg-white border-b"> 
                     <td className="py-3 px-6">{index +1}</td>
                     <td className="py-3 px-6">{rs.title}</td>
                     <td className="py-3 px-6">{rs.description}</td>
                     <td className="py-3 px-6">July 11</td>
                     
               
                <td className="flex justify-center gap-1 py-3">
                    Edit | Delete
                </td>
                </tr>
                ))}
            </tbody>
        </table>


    )
  }


export default Task;