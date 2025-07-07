'use client'

import { Loader } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Modal } from './ui/modal'

interface AlertModalProps {
	isOpen: boolean
	loading: boolean
	onClose: () => void
	onConfirm: () => void
}

const AlertModal: React.FC<AlertModalProps> = ({
	isOpen,
	loading,
	onClose,
	onConfirm
}) => {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])
	if (!mounted) return null

	return (
		<Modal
			title='¿Estás seguro?'
			description='Esta acción no se puede deshacer. Cancele o confirme esta acción.'
			isOpen={isOpen}
			onClose={onClose}>
			<section className='flex justify-end items-center space-x-2 pt-6 w-full'>
				<Button
					disabled={loading}
					variant='outline'
					onClick={onClose}>
					Cancelar
				</Button>
				<Button
					className='w-[5.5rem]'
					disabled={loading}
					variant='destructive'
					onClick={onConfirm}
					asChild>
					<span className='text-center'>
						{loading ? (
							<Loader
								className='mr-2 animate-spin'
								size={16}
							/>
						) : (
							'Eliminar'
						)}
					</span>
				</Button>
			</section>
		</Modal>
	)
}

export default AlertModal
