'use client'

import { useEffect, useState } from "react";
import {useTasks} from '../../context/TaskContext'
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast, { Toast } from "react-hot-toast";


export default function Page({params}) {

    //creo un estado para acceder a los valores que me llegan del formulario

  
    ///ejecuto la funcion para crear tarea , e importo del contexto funciones
    const { tasks ,createTask , updateTask} = useTasks()
    const router = useRouter()
    const {register, handleSubmit ,setValue, formState:{errors}} = useForm()
 


    ////CERO UNA FUNCION handlesumbit , que previene el refresh defauilt

    const onSubmit = handleSubmit((data)=>{
      if(params.id){
        updateTask(params.id, data)
        toast.success(`tarea ${data.title} actualizada`)
      }else{
        createTask(data.title , data.description)
        toast.success(`tarea ${data.title} creada`)
      }
      router.push('/')
    })

     
    

///apenas carga el componente ejecuto la funcion
    useEffect(()=>{
      if(params.id){
  
        console.log(params.id)
       const taskFound =  tasks.find(task => task.id === params.id);
       console.log(taskFound)
       if(taskFound){
        setValue('title' , taskFound.title)
        setValue('description' , taskFound.description)
       }
      }
    },[])
    return (
      <div class="font-sans mt-20">
      <div class="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100">
        <div class="relative sm:max-w-sm w-full">
          <div class="card bg-blue-400 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"></div>
          <div class="card bg-red-400 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"></div>
          <div class="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
            <label for="" class="block mt-3 text-sm text-gray-700 text-center font-semibold">
              {params.id ? 'Editar Tarea' : 'Crea Nueva Tarea'}
            </label>
    
            <form onSubmit={onSubmit} class="mt-10">
    
              <div>
                <input
                  placeholder="Escribe el titulo de la nueva tarea"
                  {...register('title', { required: true })}
                  class="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
                {errors.title && (
                  <span>
                    Este campo es requerido
                  </span>
                )}
              </div>
    
              <div class="mt-7">
                <textarea
                  placeholder="Escribe una descripcion de la nueva tarea"
                  {...register('description', { required: true })}
                  class="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
                {errors.description && (
                  <span>
                    Este campo es requerido
                  </span>
                )}
              </div>
    
              <div class="mt-7">
                <button
                  onClick={() => router.push('/new')}
                  class="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                >
                  {params.id ? 'Editar Tarea' : 'Crear Tarea'}
                </button>
              </div>
    
            </form>
          </div>
        </div>
      </div>
    </div>
    
    )
  }
   

 