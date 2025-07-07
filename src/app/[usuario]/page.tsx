import { Button } from '@/components/ui/button'
import Container from '@/components/ui/container'
import { datos } from '@/lib/type'
import Link from 'next/link'
import { FC } from 'react'
import UsuarioDataTable from './components/client'

type Params = {
	pathname: string
	params: Promise<{ usuario: string }>
	searchParams: Promise<Readonly<Record<string, string | string[]>>>
}

const UsuarioPage: FC<Params> = async ({ params }) => {
	const { usuario } = await params

	console.log(usuario)
	return (
		<div className='flex flex-col justify-center items-center bg-background min-h-screen'>
			<Container>
				<Button asChild>
					<Link
						href={`/${usuario}/nuevo`}
						className='w-full'>
						Nuevo
					</Link>
				</Button>
				<UsuarioDataTable data={datos} />
			</Container>
		</div>
	)
}

export default UsuarioPage
