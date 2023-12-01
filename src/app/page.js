"use client"
import { useTasks } from "@/context/TaskContext"
import { TaskCard } from "@/components/TaskCard";
export default function Page() {
///me traigo el arreglo de tareas
  const {tasks} = useTasks();
 
  return (
    <div>
      {tasks.length > 0 ? (
        // Si hay tareas, las mapeo
        tasks.map((task) => <TaskCard task={task} key={task.id} />)
      ) : (
        // Si no hay tareas, muestro un mensaje
        <p style={{ textAlign: 'center' }}>No tenés tareas.</p>
      )}
    </div>
  );
}

 
