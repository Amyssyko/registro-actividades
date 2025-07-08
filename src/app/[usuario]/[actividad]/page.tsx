// Añade esta línea al inicio del archivo
"use client"

import Container from '@/components/ui/container'
import { datos, PageProps } from '@/lib/type'
import { FC } from 'react'
import FormActividad from '../components/form-actividad'
import { useRouter } from 'next/navigation'


const Page: FC<PageProps> = ({ params }) => {
    const { usuario } = params
    const router = useRouter()

    const dato_usuario = datos.find((item) => item.id === usuario)
    if (!dato_usuario) { 
        return (
            <div className='flex flex-col justify-center items-center bg-background min-h-screen'>
                <p className='text-red-500'>Usuario no encontrado</p>
            </div>
        )
    }
    return (
        <div className='flex flex-col justify-center items-center bg-background min-h-screen'>
            <Container>
                <FormActividad
                    initialValues={dato_usuario}
                    usuario={usuario}
                />
                <div className="flex justify-between mt-8">
                    <button
                        type="button"
                        className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                        onClick={() => router.push(`/${usuario}`)}
                    >
                        Cancelar
                    </button>
                    
                </div>
            </Container>
        </div>
    )
}

export default Page