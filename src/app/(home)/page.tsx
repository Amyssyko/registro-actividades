import { ToolCase } from 'lucide-react'
import { UserSwitcherHome } from './components/user-switcher'

const HomePage = () => {
	return (
		<div className='grid grid[auto_1fr_auto] w-full h-full'>
			{/* HEADER */}
			<header className='flex justify-between items-center shadow-md w-full'>
				<div className='flex sm:flex-row flex-col justify-between items-center gap-4 px-8 py-6'>
					<ToolCase size={36} />
					<span className='font-bold text-2xl'>Registro de Actividades</span>
				</div>
				{/* NAVIGATION BAR */}
				<nav className='gap-4 shadow px-8 py-4 border-b border-blue-100'>
					<span className='mt-4 sm:mt-0'>Panel de usuarios</span>
					<UserSwitcherHome />
				</nav>
			</header>

			{/* CONTENIDO PRINCIPAL */}
			<main className='flex flex-col flex-1 justify-center items-center px-4 py-12'>
				<div className='shadow-lg p-8 rounded-lg w-full max-w-2xl text-center'>
					<h1 className='mb-4 font-bold text-4xl'>Registro de Actividades</h1>
					<p className='mb-4 text-lg'>
						Bienvenido al sistema de registro de actividades. Aquí podrás
						gestionar y visualizar el historial de actividades de los usuarios.
					</p>
					<div className='mb-8 text-left'>
						<ul className='mb-2 list-disc list-inside'>
							<li>Consulta el historial de actividades de cada usuario.</li>
							<li>
								<span className='font-semibold'>
									Visualiza tendencias y patrones de actividad a lo largo del
									tiempo:
								</span>
								<div className='mt-2 p-4 border border-blue-100 rounded'>
									<div className='flex sm:flex-row flex-col sm:justify-between gap-4'>
										<div>
											<span className='block font-bold text-lg'>
												Resumen semanal
											</span>
											<span className='block mt-1 font-semibold'>
												+12% actividades respecto a la semana pasada
											</span>
											<span className='block mt-1'>
												Promedio diario:{' '}
												<span className='font-bold'>8 actividades</span>
											</span>
										</div>
										<div>
											<span className='block font-bold text-lg'>
												Horas activas
											</span>
											<span className='block mt-1'>
												Mayor actividad:{' '}
												<span className='font-bold'>10:00 - 13:00</span>
											</span>
											<span className='block'>
												Menor actividad:{' '}
												<span className='font-bold'>18:00 - 20:00</span>
											</span>
										</div>
									</div>
									<div className='mt-4'>
										<span className='block'>
											<span className='font-semibold'>Tendencia:</span>
											La actividad muestra un crecimiento constante durante los
											últimos 30 días, con picos los lunes y miércoles.
										</span>
										<span className='block mt-2 text-xs'>
											*Para ver gráficos detallados, accede al panel de usuario.
										</span>
									</div>
								</div>
							</li>
							<li>
								Utiliza el buscador o el combo para navegar rápidamente entre
								usuarios.
							</li>
							<li>
								Accede a reportes detallados y exporta información relevante.
							</li>
						</ul>
						<div className='bg-blue-50 mt-4 p-4 border border-blue-100 rounded'>
							<span className='font-semibold text-blue-600'>¿Sabías?</span>{' '}
							Puedes analizar la productividad y evolución de cada usuario
							usando los filtros y herramientas del panel.
						</div>
					</div>
				</div>
			</main>

			{/* FOOTER */}
			<footer className='bg-white shadow-inner py-4 text-gray-500 text-sm text-center'>
				<p>
					© {new Date().getFullYear()} Registro de Actividades. Todos los
					derechos reservados.
				</p>
			</footer>
		</div>
	)
}
export default HomePage
