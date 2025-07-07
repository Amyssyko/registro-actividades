import { Button } from '@/components/ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { Table } from '@tanstack/react-table'
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight
} from 'lucide-react'

type DataTablePaginationProps<TData> = {
	table: Table<TData>
}

export function DataTablePagination<TData>({
	table
}: DataTablePaginationProps<TData>) {
	return (
		<div className='flex justify-between items-center gap-2 px-2'>
			<div className='flex items-center space-x-6 lg:space-x-8'>
				<div className='flex items-center space-x-2'>
					<p className='font-medium text-sm'>Registros por página</p>
					<Select
						value={`${table.getState().pagination.pageSize}`}
						onValueChange={(value) => {
							table.setPageSize(Number(value))
						}}>
						<SelectTrigger className='w-[70px] h-8'>
							<SelectValue placeholder={table.getState().pagination.pageSize} />
						</SelectTrigger>
						<SelectContent side='top'>
							{[10, 20, 25, 30, 40, 50].map((pageSize) => (
								<SelectItem
									key={pageSize}
									value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className='flex justify-center items-center w-[100px] font-medium text-sm'>
					Pag {table.getState().pagination.pageIndex + 1} de{' '}
					{table.getPageCount()}
				</div>
				<div className='flex items-center space-x-2'>
					<Button
						variant='outline'
						size='icon'
						className='hidden lg:flex size-8'
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}>
						<span className='sr-only'>Go to first page</span>
						<ChevronsLeft />
					</Button>
					<Button
						variant='outline'
						size='icon'
						className='size-8'
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}>
						<span className='sr-only'>Go to previous page</span>
						<ChevronLeft />
					</Button>
					<Button
						variant='outline'
						size='icon'
						className='size-8'
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}>
						<span className='sr-only'>Go to next page</span>
						<ChevronRight />
					</Button>
					<Button
						variant='outline'
						size='icon'
						className='hidden lg:flex size-8'
						onClick={() => table.setPageIndex(table.getPageCount() - 1)}
						disabled={!table.getCanNextPage()}>
						<span className='sr-only'>Go to last page</span>
						<ChevronsRight />
					</Button>
				</div>
			</div>
		</div>
	)
}
