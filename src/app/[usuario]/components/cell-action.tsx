'use client'

import AlertModal from '@/components/alert-modal'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import useOpen from '@/hooks/use-open'
import { ActividadFormType } from '@/lib/type'
import { Copy, Edit, MoreHorizontal, Trash2 } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

interface CellActionProps {
	data: ActividadFormType
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
	const { refresh, push } = useRouter()

	const pathname = usePathname()

	//const { showError, showCopy, showSuccess } = useToast()
	const { startOpen, stopOpen, isOpen } = useOpen()
	//const { isLoading, startLoading, stopLoading } = useLoading()

	const [isLoading, setIsLoading] = React.useState(false)

	const onCopy = (id: string) => {
		navigator.clipboard.writeText(id)
		//showCopy(msgTool.copy)
	}
	const onDelete = async () => {
		setIsLoading(true)
		//startLoading()
		//await axios.delete(`/api/anuncio/${data.id}`)
		refresh()
		//showSuccess(msgResponse.delete)
		//showError(error.response.data)
		setIsLoading(false)
		//stopLoading()
		stopOpen()
	}

	return (
		<>
			<AlertModal
				isOpen={isOpen()}
				onClose={() => stopOpen()}
				onConfirm={onDelete}
				loading={isLoading}
			/>
			<DropdownMenu>
				<DropdownMenuTrigger
					asChild
					className='hover:bg-black hover:text-white'>
					<Button
						type='button'
						variant='ghost'
						className='ml-4 p-0 w-8 h-8'>
						<span className='sr-only'>Open</span>
						<MoreHorizontal className='size-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuLabel>Acciones</DropdownMenuLabel>
					<DropdownMenuItem
						onClick={() => {
							return onCopy(data.id)
						}}>
						<Copy className='mr-2 w-4 h-4' />
						Copiar ID
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => push(`${pathname}/${data.id}`)}>
						<Edit className='mr-2 w-4 h-4' />
						Actualizar
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => startOpen()}>
						<Trash2 className='mr-2 w-4 h-4' />
						Eliminar
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}

export default CellAction
