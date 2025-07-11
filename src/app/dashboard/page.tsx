import { ChartAreaInteractive } from '@/components/chart-area-interactive'
import { DataTable } from '@/components/data-table'
import { SectionCards } from '@/components/section-cards'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

import data from './data.json'

export default function Page() {
	return (
		<SidebarProvider
			style={
				{
					'--sidebar-width': 'calc(var(--spacing) * 72)',
					'--header-height': 'calc(var(--spacing) * 12)'
				} as React.CSSProperties
			}>
			{/* <AppSidebar variant='inset' /> */}
			<SidebarInset>
				<SiteHeader />
				<div className='flex flex-col flex-1'>
					<div className='@container/main flex flex-col flex-1 gap-2'>
						<div className='flex flex-col gap-4 md:gap-6 py-4 md:py-6'>
							<SectionCards />
							<div className='px-4 lg:px-6'>
								<ChartAreaInteractive />
							</div>
							<DataTable data={data} />
						</div>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
