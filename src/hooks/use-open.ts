import { useState } from 'react'

const useOpen = () => {
	const [open, setOpen] = useState(false)

	const isOpen = () => {
		return open
	}
	const startOpen = () => {
		setOpen(true)
	}

	const stopOpen = () => {
		setOpen(false)
	}

	return { isOpen, startOpen, stopOpen }
}

export default useOpen
