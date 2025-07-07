'use client'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import React from 'react'

interface ModalProps {
	title: string
	description: string
	isOpen: boolean
	onClose: () => void
	children?: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({
	title,
	description,
	isOpen,
	onClose,
	children
}) => {
	const onChange = (open: boolean) => {
		if (!open) {
			onClose()
		}
	}

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onChange}>
			<DialogContent className='bg-[#FBFBFE] dark:bg-[#192229]'>
				<DialogHeader>
					<DialogTitle className='text-center'>{title} </DialogTitle>
					<DialogDescription className='text-sm sm:text-base text-left'>
						{description}
					</DialogDescription>
				</DialogHeader>
				<div>{children}</div>
			</DialogContent>
		</Dialog>
	)
}
