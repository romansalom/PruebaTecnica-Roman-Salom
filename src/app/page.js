"use client"

import { useTasks } from "@/context/TaskContext"
import { TaskCard } from "@/components/TaskCard";
export default function Page() {
///me traigo el arreglo de tareas
  const {tasks} = useTasks();
 
  return (
    ///hago un map para recorrer el arreglo de tareas
<div>
  {tasks.length > 0 ? (
    <div>
      {tasks.map((task) => (
        <TaskCard task={task} key={task.id} />
      ))}
    </div>
  ) : (
    <div className="flex items-center justify-center h-40">
      <p>No hay tareas.</p>
    </div>
  )}
</div>

  )
}
 