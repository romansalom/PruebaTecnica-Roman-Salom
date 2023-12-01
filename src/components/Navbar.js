"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
export function Navbar({task}){
    const router = useRouter()

    return(
<header className="bg-blue-800 text-white py-4">
<div className="max-w-screen-md mx-auto flex justify-between items-center">
        <Link href={"/"}> <h1 className="text-2xl font-semibold hover:text-gray-300 transition duration-300 hover:bg-blue-800">Aplicacion de tareas</h1></Link>
       
        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300" onClick={()=>router.push('/new')}>
            
            Crear Nueva Tarea
        </button>
        
    </div>
</header>
    )
}
 
       