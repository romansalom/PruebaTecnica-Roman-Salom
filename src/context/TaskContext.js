"use client"

import { createContext, useContext, useState, useEffect } from "react";  
/// importo libreria uuiid que me da un id unico y lo nombro como uuid
import {v4 as uuid} from 'uuid'

///creo contexto para utilizarlo en toda LA APPA
export const TaskContext = createContext();

///creo un hook que se ejecute cada vez que se necesiten los datos del provider

export const useTasks = () =>{
   const  context =  useContext(TaskContext)
   if(!context)
    throw new Error("useTask debe ser usadio dentro de un provider ")
   return context
}

////cuando las tareas cambien voy a guardar las tareas en el local host


export const TaskProvider = ({children}) =>{
    ////creo un estado para manejar las tareas
const [tasks,setTasks] = useState(()=>[])


////el servidor no esta localsrtorage y me tira error , porque pasa por el servidor y no se procesa
useEffect(()=>{
    const item = localStorage.getItem("tasks")
    const tasks = JSON.parse(item)
  console.log(tasks)
  if(tasks){
     
  setTasks(tasks)
  }

},[])



useEffect(()=>{
    localStorage.setItem('tasks' , JSON.stringify(tasks))
    }, [tasks])

    //// creo una funcion que me permita agregar nuevas tareas al arreglo.
    const createTask = (title , description) =>{
        ///creo una copia del arreglo
        setTasks([...tasks , {
            title , description, id:uuid()
        }])
    }

    const deleteTask = (id) =>
        ///con el metodo filter , cero un nuevo arreglo pero sin el elemneto eliminado 
        setTasks( [...tasks.filter(task =>task.id !== id)]);
       


    /// lo que hace esta funcion es actualizar los valores realizando copias del nuevbo objeto convinado con el anterior 
    const updateTask =(id, newData)=>{
        setTasks( [...tasks.map(task =>task.id === id ? {...task, ...newData } : task)]);
    }


    return <TaskContext.Provider value={{
       tasks,
       createTask,
       deleteTask,
       updateTask
    }}>
        {children}

    </TaskContext.Provider>
}