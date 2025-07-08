'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState,
	type VisibilityState
} from '@tanstack/react-table'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { DataTablePagination } from './data-table-pagination'
import { DataTableViewOptions } from './data-table-view-options'

/* La interfaz `DataTableProps` está definiendo los tipos que se pueden pasar al 'DataTable`'
componente.Tiene tres propiedades: */
type DataTableProps<TData, TValue> = {
	columns: Array<ColumnDef<TData, TValue>>
	data: TData[]
	// searchKey es la clave por la que se va a buscar en la tabla, se puede asignar cualquier atribulo de las columnas ingresadas en columns
	searchKey: keyof TData
}

export function DataTable<TData, TValue>({
	columns,
	data,
	searchKey
}: DataTableProps<TData, TValue>) {
	const key = searchKey as string // Aseguramos que searchKey sea un string para usarlo en el Input

	const pathname = usePathname()
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	)
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({})

	const [rowSelection, setRowSelection] = React.useState({})

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,

		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection
		}
	})

	return (
		<div>
			<div>
				<div className='flex justify-between items-center gap-4 py-4'>
					<Input
						className='max-w-xs'
						placeholder={`Filtrar por ${key}...`}
						value={(table.getColumn(key)?.getFilterValue() as string) ?? ''}
						onChange={(event) =>
							table.getColumn(key)?.setFilterValue(event.target.value)
						}
					/>
					<Button asChild>
						<Link href={`${pathname}/nuevo`}>Nuevo</Link>
					</Button>
				</div>

				<div className='flex justify-center items-center py-4'>
					<div className='flex-1 text-muted-foreground text-sm'>
						{table.getFilteredSelectedRowModel().rows.length} de{' '}
						{table.getFilteredRowModel().rows.length} registro
						{table.getFilteredRowModel().rows.length > 1 ? 's' : null}{' '}
						seleccionado.
					</div>
					<DataTableViewOptions table={table} />
				</div>
			</div>
			<div className='border border-border rounded-sm overflow-x-auto'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className='flex justify-end items-center space-x-2 py-4'>
				<DataTablePagination table={table} />
			</div>
		</div>
	)
}
