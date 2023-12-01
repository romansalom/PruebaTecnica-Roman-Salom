
///recibo la tarea mediante props
import { useRouter } from "next/navigation"
import {useTasks} from '../context/TaskContext'
import toast, { Toast } from "react-hot-toast"
export const TaskCard = ({task}) =>{
    const router = useRouter()
    const { deleteTask} = useTasks()
    return(
<div className="max-w-screen-md md:w-3/4 mx-auto mb-4 mt-5">
  <div className="flex flex-col space-y-2 items-center justify-end h-full p-4 bg-blue-700 rounded-xl">
    <p className="w-full text-2xl font-semibold text-white">{task.title}</p>
    <p className="w-full pb-8 text-sm tracking-wide leading-tight text-white">{task.description}</p>
    <div className="rounded mr-auto">
      <div className="border-white px-4 flex items-justify-center">
        <button
          onClick={() => {
            const acept = window.confirm(`¿Estás seguro que quieres borrar la tarea ${task.title} ?`);
            if (acept) {
              deleteTask(task.id);
              toast.success("Tarea Borrada");
            }
          }}
          className="mr-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Borrar Tarea
        </button>
        <button
          onClick={() => router.push(`/edit/${task.id}`)}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Editar
        </button>
      </div>
    </div>
  </div>
</div>

  
      )
  }
///el boton editar al hacer click te redirigue a lavista editar con el id que le pertence


