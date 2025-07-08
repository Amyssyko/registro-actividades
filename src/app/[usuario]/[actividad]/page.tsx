import Container from '@/components/ui/container'
import { datos, PageProps } from '@/lib/type'
import { FC } from 'react'
import FormActividad from '../components/form-actividad'

const page: FC<PageProps> = async ({ params }) => {
	const { usuario } = await params

	const dato_usuario = datos.find((item) => item.id === usuario)
	if (!datos) {
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
			</Container>
		</div>
	)
}

export default page
