'use client'

import { ChevronsUpDown } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { usuarios } from '@/lib/type'
import { useRouter } from 'next/navigation'

export function UserSwitcherHome() {
	const [open, setOpen] = React.useState(false)
	const [value, setValue] = React.useState<string>('')

	const { push } = useRouter()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		// Aquí puedes manejar el envío del formulario
		// Por ejemplo, podrías guardar el usuario seleccionado en un estado global o en una base de datos
		if (value) {
			// Redirigir a la página del usuario seleccionado
			push(`/${value}`)
		} else {
			console.error('No se ha seleccionado ningún usuario')
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className='space-x-2'>
				<Popover
					open={open}
					onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							variant='outline'
							role='combobox'
							aria-expanded={open}
							className='justify-between w-[200px]'>
							{value
								? usuarios.find((usuario) => usuario.id === value)
										?.nombre_usuario
								: 'Seleccione usuario...'}
							<ChevronsUpDown className='opacity-50' />
						</Button>
					</PopoverTrigger>
					<PopoverContent className='p-0 w-[200px]'>
						<Command>
							<CommandInput
								placeholder='Search framework...'
								className='h-9'
							/>
							<CommandList>
								<CommandEmpty>No framework found.</CommandEmpty>
								<CommandGroup>
									{usuarios.map((usuario) => (
										<CommandItem
											key={usuario.id}
											value={`${usuario.id} ${usuario.nombre_usuario}`}
											onSelect={() => {
												setValue(usuario.id)
												setOpen(false)
											}}>
											{usuario.nombre_usuario}
										</CommandItem>
									))}
								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
				<Button
					type='submit'
					className='mt-4'
					disabled={!value}>
					Ir al usuario
				</Button>
			</div>
		</form>
	)
}
