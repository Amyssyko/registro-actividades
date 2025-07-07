import Image from 'next/image'

export default function Home() {
	return (
		<div className='justify-items-center items-center gap-16 grid grid-rows-[20px_1fr_20px] p-8 sm:p-20 pb-20 min-h-screen font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col items-center sm:items-start gap-[32px] row-start-2'>
				<h1 className='font-bold text-4xl sm:text-left text-center'>
					Registro de Actividades
				</h1>
				<p className='text-gray-600 text-lg sm:text-left text-center'>
					Bienvenido al sistema de registro de actividades. Aquí podrás
					gestionar tus actividades diarias de manera eficiente.
				</p>
				<Image
					src='/images/undraw_activity_tracking_re_4j2w.svg'
					alt='Registro de Actividades'
					width={500}
					height={300}
					className='w-full max-w-md'
				/>
			</main>
			<footer className='row-start-3 text-gray-500 text-sm text-center'>
				<p>© 2023 Registro de Actividades. Todos los derechos reservados.</p>
			</footer>
		</div>
	)
}
