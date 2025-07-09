'use client'

import { Check, ChevronsUpDown, GalleryVerticalEnd } from 'lucide-react'
import * as React from 'react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@/components/ui/sidebar'
import { UsuarioFormType } from '@/lib/type'
import { useRouter } from 'next/navigation'

type SwitcherProps = {
	usuarios: UsuarioFormType[]
	defaultUsuario: UsuarioFormType
}

export function UserSwitcher({ usuarios, defaultUsuario }: SwitcherProps) {
	const [selectedVersion, setSelectedVersion] =
		React.useState<UsuarioFormType>(defaultUsuario)

	const { push } = useRouter()

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size='lg'
							className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
							<div className='flex justify-center items-center bg-sidebar-primary rounded-lg size-8 aspect-square text-sidebar-primary-foreground'>
								<GalleryVerticalEnd className='size-4' />
							</div>
							<div className='flex flex-col gap-0.5 leading-none'>
								<span className='font-medium'>Usuario</span>
								<span className=''>{selectedVersion.nombre_usuario}</span>
							</div>
							<ChevronsUpDown className='ml-auto' />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className='w-(--radix-dropdown-menu-trigger-width)'
						align='start'>
						{usuarios.map((usuario) => (
							<DropdownMenuItem
								key={usuario.id}
								onClick={() => {
									setSelectedVersion(usuario)
									push(`/${usuario.id}`)
								}}
								onSelect={() => setSelectedVersion(usuario)}>
								{usuario.nombre_usuario}{' '}
								{usuario === selectedVersion && <Check className='ml-auto' />}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
