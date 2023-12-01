"use client"
import { useTasks } from "@/context/TaskContext";
import { TaskCard } from "@/components/TaskCard";


export default function Page() {
  const { tasks, loading } = useTasks();

  return (
    <div>
      {loading ? (
    <div className='flex items-center justify-center min-h-screen'>
    <div style={{ borderTopColor: 'transparent' }} className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin"></div>
    <p className="ml-2">Cargando...</p>
  </div>
  
      ) : tasks.length > 0 ? (
        tasks.map((task) => <TaskCard task={task} key={task.id} />)
      ) : (
        <div className='flex items-center justify-center min-h-screen'>
        <p style={{ textAlign: 'center', fontSize: '1.5rem', color: '#555', marginTop: '20px' }}>¡Genial! No tenés tareas pendientes en este momento.</p>

        </div>
      )}
    </div>
  );
}