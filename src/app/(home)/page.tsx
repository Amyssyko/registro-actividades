"use client";
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
    const usuarios = ['cpilla', 'otroUsuario', 'usuario3']
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('')

    function handleBuscarUsuario(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const usuario = (e.currentTarget.elements.namedItem('usuario') as HTMLInputElement).value.trim()
        if (usuario) {
            window.location.href = `/${usuario}`
        }
    }

    function handleComboChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const usuario = e.target.value
        setUsuarioSeleccionado(usuario)
        if (usuario) {
            window.location.href = `/${usuario}`
        }
    }

    return (
        <div className="flex flex-col bg-gray-50 min-h-screen">
            {/* HEADER */}
            <header className="bg-white shadow-md w-full">
                <div className="flex sm:flex-row flex-col justify-between items-center px-8 py-6">
                    <div className="flex items-center gap-4">
                        <Image
                            src="/images/undraw_activity_tracking_re_4j2w.svg"
                            alt="Logo"
                            width={60}
                            height={60}
                            className="bg-blue-100 rounded-full"
                        />
                        <span className="font-bold text-blue-700 text-2xl">Registro de Actividades</span>
                    </div>
                    <span className="mt-4 sm:mt-0 text-gray-500">Panel de usuarios</span>
                </div>
            </header>

            {/* NAVIGATION BAR */}
            <nav className="flex flex-row items-center gap-4 bg-blue-50 shadow px-8 py-4 border-b border-blue-100 w-full">
                <div className="flex flex-col gap-2 w-full max-w-xs">
                    <form className="flex gap-2" onSubmit={handleBuscarUsuario}>
                        <input
                            type="text"
                            name="usuario"
                            placeholder="Buscar usuario..."
                            className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
                        />
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-700 px-4 py-2 rounded font-bold text-white transition"
                        >
                            Buscar
                        </button>
                    </form>
                    <select
                        value={usuarioSeleccionado}
                        onChange={handleComboChange}
                        className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
                    >
                        <option value="">Selecciona un usuario...</option>
                        {usuarios.map((usuario) => (
                            <option key={usuario} value={usuario}>
                                {usuario}
                            </option>
                        ))}
                    </select>
                </div>
            </nav>

            {/* CONTENIDO PRINCIPAL */}
            <main className="flex flex-col flex-1 justify-center items-center px-4 py-12">
                <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-2xl text-center">
                    <h1 className="mb-4 font-bold text-blue-700 text-4xl">
                        Registro de Actividades
                    </h1>
                    <p className="mb-4 text-gray-600 text-lg">
                        Bienvenido al sistema de registro de actividades. Aquí podrás gestionar y visualizar el historial de actividades de los usuarios.
                    </p>
                    <div className="mb-8 text-gray-700 text-left">
                        <ul className="mb-2 list-disc list-inside">
                            <li>Consulta el historial de actividades de cada usuario.</li>
                            <li>
                                <span className="font-semibold text-blue-700">Visualiza tendencias y patrones de actividad a lo largo del tiempo:</span>
                                <div className="bg-blue-50 mt-2 p-4 border border-blue-100 rounded">
                                    <div className="flex sm:flex-row flex-col sm:justify-between gap-4">
                                        <div>
                                            <span className="block font-bold text-blue-800 text-lg">Resumen semanal</span>
                                            <span className="block mt-1 font-semibold text-green-600">+12% actividades respecto a la semana pasada</span>
                                            <span className="block mt-1 text-gray-600">Promedio diario: <span className="font-bold">8 actividades</span></span>
                                        </div>
                                        <div>
                                            <span className="block font-bold text-blue-800 text-lg">Horas activas</span>
                                            <span className="block mt-1 text-gray-600">Mayor actividad: <span className="font-bold">10:00 - 13:00</span></span>
                                            <span className="block text-gray-600">Menor actividad: <span className="font-bold">18:00 - 20:00</span></span>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <span className="block text-gray-700">
                                            <span className="font-semibold text-blue-700">Tendencia:</span>
                                            La actividad muestra un crecimiento constante durante los últimos 30 días, con picos los lunes y miércoles.
                                        </span>
                                        <span className="block mt-2 text-gray-500 text-xs">
                                            *Para ver gráficos detallados, accede al panel de usuario.
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <li>Utiliza el buscador o el combo para navegar rápidamente entre usuarios.</li>
                            <li>Accede a reportes detallados y exporta información relevante.</li>
                        </ul>
                        <div className="bg-blue-50 mt-4 p-4 border border-blue-100 rounded">
                            <span className="font-semibold text-blue-600">¿Sabías?</span> Puedes analizar la productividad y evolución de cada usuario usando los filtros y herramientas del panel.
                        </div>
                    </div>
                    
                </div>
            </main>

            {/* FOOTER */}
            <footer className="bg-white shadow-inner py-4 text-gray-500 text-sm text-center">
                <p>© 2023 Registro de Actividades. Todos los derechos reservados.</p>
            </footer>
        </div>
    )
}
