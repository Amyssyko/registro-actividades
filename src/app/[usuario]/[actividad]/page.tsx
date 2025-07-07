import Container from '@/components/ui/container'
import { Params } from '@/lib/type'
import { FC } from 'react'
import FormActividad from '../components/form-actividad'

const page: FC<Params> = async ({ params }) => {
	const { usuario } = await params
	return (
		<div className='flex flex-col justify-center items-center bg-background min-h-screen'>
			<Container>
				<FormActividad usuario={usuario} />
			</Container>
		</div>
	)
}

export default page
