'use client'

import {
	IconCamera,
	IconChartBar,
	IconDashboard,
	IconDatabase,
	IconFileAi,
	IconFileDescription,
	IconFileWord,
	IconFolder,
	IconHelp,
	IconInnerShadowTop,
	IconListDetails,
	IconReport,
	IconSearch,
	IconSettings,
	IconUsers
} from '@tabler/icons-react'
import * as React from 'react'

import { UserSwitcher } from '@/app/dashboard/components/user-switcher'
import { NavDocuments } from '@/components/nav-documents'
import { NavMain } from '@/components/nav-main'
import { NavSecondary } from '@/components/nav-secondary'
import { NavUser } from '@/components/nav-user'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@/components/ui/sidebar'
import { UsuarioFormType, usuarios } from '@/lib/type'

const data = {
	user: {
		name: 'shadcn',
		email: 'm@example.com',
		avatar: '/avatars/shadcn.jpg'
	},
	navMain: [
		{
			title: 'Dashboard',
			url: '#',
			icon: IconDashboard
		},
		{
			title: 'Lifecycle',
			url: '#',
			icon: IconListDetails
		},
		{
			title: 'Analytics',
			url: '#',
			icon: IconChartBar
		},
		{
			title: 'Projects',
			url: '#',
			icon: IconFolder
		},
		{
			title: 'Team',
			url: '#',
			icon: IconUsers
		}
	],
	navClouds: [
		{
			title: 'Capture',
			icon: IconCamera,
			isActive: true,
			url: '#',
			items: [
				{
					title: 'Active Proposals',
					url: '#'
				},
				{
					title: 'Archived',
					url: '#'
				}
			]
		},
		{
			title: 'Proposal',
			icon: IconFileDescription,
			url: '#',
			items: [
				{
					title: 'Active Proposals',
					url: '#'
				},
				{
					title: 'Archived',
					url: '#'
				}
			]
		},
		{
			title: 'Prompts',
			icon: IconFileAi,
			url: '#',
			items: [
				{
					title: 'Active Proposals',
					url: '#'
				},
				{
					title: 'Archived',
					url: '#'
				}
			]
		}
	],
	navSecondary: [
		{
			title: 'Settings',
			url: '#',
			icon: IconSettings
		},
		{
			title: 'Get Help',
			url: '#',
			icon: IconHelp
		},
		{
			title: 'Search',
			url: '#',
			icon: IconSearch
		}
	],
	documents: [
		{
			name: 'Data Library',
			url: '#',
			icon: IconDatabase
		},
		{
			name: 'Reports',
			url: '#',
			icon: IconReport
		},
		{
			name: 'Word Assistant',
			url: '#',
			icon: IconFileWord
		}
	]
}
type SidebarProps = {
	usuario: UsuarioFormType
} & React.ComponentProps<typeof Sidebar>

export function AppSidebar({ usuario, ...props }: SidebarProps) {
	return (
		<Sidebar
			collapsible='offcanvas'
			{...props}>
			<SidebarHeader>
				<div>
					<UserSwitcher
						usuarios={usuarios}
						defaultUsuario={usuario}
					/>
				</div>

				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className='data-[slot=sidebar-menu-button]:!p-1.5'>
							<a href='#'>
								<IconInnerShadowTop className='!size-5' />
								<span className='font-semibold text-base'>Acme Inc.</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavDocuments items={data.documents} />
				<NavSecondary
					items={data.navSecondary}
					className='mt-auto'
				/>
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	)
}
