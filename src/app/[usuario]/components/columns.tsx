import { Checkbox } from '@/components/ui/checkbox'
import { formatHora } from '@/lib/format-date'
import { ActividadFormType } from '@/lib/type'
import { type ColumnDef } from '@tanstack/react-table'
import CellAction from './cell-action'
import { DataTableColumnHeader } from './data-table-column-header'

export const columns: ColumnDef<ActividadFormType>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label='Select row'
			/>
		),
		enableSorting: false,
		enableHiding: false
	},
	{
		accessorKey: 'id',
		header: ({ column }) => {
			return (
				<DataTableColumnHeader
					column={column}
					title='Secuencial'
				/>
			)
		}
	},

	{
		accessorKey: 'actividad',
		header: ({ column }) => {
			return (
				<DataTableColumnHeader
					column={column}
					title='Actividad'
				/>
			)
		}
	},

	{
		accessorKey: 'descripcion',
		header: ({ column }) => {
			return (
				<DataTableColumnHeader
					column={column}
					title='Descripción'
				/>
			)
		}
	},
	{
		accessorKey: 'frecuencia',
		header: ({ column }) => {
			return (
				<DataTableColumnHeader
					column={column}
					title='Frecuencia'
				/>
			)
		}
	},

	{
		accessorKey: 'estado',
		header: ({ column }) => {
			return (
				<DataTableColumnHeader
					column={column}
					title='Estado'
				/>
			)
		}
	},

	{
		accessorKey: 'nombre_area',
		header: ({ column }) => {
			return (
				<DataTableColumnHeader
					column={column}
					title='Nombre Área'
				/>
			)
		}
	},
	{
		accessorKey: 'usuario_experto',
		header: ({ column }) => {
			return (
				<DataTableColumnHeader
					column={column}
					title='Usuario Experto'
				/>
			)
		}
	},
	{
		accessorKey: 'fecha_inicio',
		cell: ({ row }) => <span> {formatHora(row.original.fecha_inicio)}</span>,
		header: ({ column }) => {
			return (
				<DataTableColumnHeader
					column={column}
					title='Fecha Inicio Actividad'
				/>
			)
		}
	},
	{
		accessorKey: 'fecha_fin',
		cell: ({ row }) => <span>{formatHora(row.original.fecha_fin)}</span>,
		header: ({ column }) => {
			return (
				<DataTableColumnHeader
					column={column}
					title='Fecha Fin Actividad'
				/>
			)
		}
	},
	{
		accessorKey: 'fecha_creacion',
		cell: ({ row }) => <span>{formatHora(row.original.fecha_creacion)}</span>,
		header: ({ column }) => {
			return (
				<DataTableColumnHeader
					column={column}
					title='Fecha Creación'
				/>
			)
		}
	},
	{
		accessorKey: 'fecha_actualizacion',
		cell: ({ row }) => (
			<span>{formatHora(row.original.fecha_actualizacion)}</span>
		),
		header: ({ column }) => {
			return (
				<DataTableColumnHeader
					column={column}
					title='Fecha Actualización'
				/>
			)
		}
	},
	{
		id: 'acciones',
		cell: ({ row }) => <CellAction data={row.original} />,
		header: 'Acciones'
	}
]
