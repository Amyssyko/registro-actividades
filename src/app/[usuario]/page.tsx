import Container from '@/components/ui/container'
import { datos, PageProps } from '@/lib/type'
import { FC } from 'react'
import UsuarioDataTable from './components/client'

const UsuarioPage: FC<PageProps> = async ({ params }) => {
	const { usuario } = await params

	console.log(usuario)
	return (
		<div className='flex flex-col justify-center items-center bg-background'>
			<Container>
				<UsuarioDataTable data={datos} />
			</Container>
		</div>
	)
}

export default UsuarioPage
