import { AppSidebar } from '@/components/app-sidebar'
import { ChartAreaInteractive } from '@/components/chart-area-interactive'
import { SectionCards } from '@/components/section-cards'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { usuarios } from '@/lib/type'
import { notFound } from 'next/navigation'

type Params = Promise<{ usuario: string }>

const LayoutUser = async ({
	children,
	params
}: {
	children: React.ReactNode
	params: Params
}) => {
	const { usuario } = await params

	const usuarioActual = usuarios.find((usr) => usr.id === usuario)

	if (!usuarioActual) {
		return notFound()
	}

	return (
		<>
			<SidebarProvider
				style={
					{
						'--sidebar-width': 'calc(var(--spacing) * 72)',
						'--header-height': 'calc(var(--spacing) * 12)'
					} as React.CSSProperties
				}>
				<AppSidebar
					usuario={usuarioActual}
					variant='inset'
				/>
				<SidebarInset>
					<SiteHeader />
					<div className='flex flex-col flex-1'>
						<div className='@container/main flex flex-col flex-1 gap-2'>
							<div className='flex flex-col gap-4 md:gap-6 py-4 md:py-6'>
								<SectionCards />
								<div className='px-4 lg:px-6'>
									<ChartAreaInteractive />
								</div>
								<div>{children}</div>
							</div>
						</div>
					</div>
				</SidebarInset>
			</SidebarProvider>
		</>
	)
}

export default LayoutUser
