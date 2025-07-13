import { Checkbox } from '@/components/ui/checkbox'
import { formatHora } from '@/lib/format-date'
import {
	ActividadFormType,
	areas,
	estados,
	frecuencias,
	prioridades,
	usuariosList
} from '@/lib/type'
import { type ColumnDef } from '@tanstack/react-table'
import CellAction from './cell-action'
import { DataTableColumnHeader } from './data-table-column-header'
import { EditableCell } from './editable-cell'
import { EnumSelect } from './enum-list-edit'

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
		},
		cell: ({ row }) => (
			<EditableCell
				value={row.original.actividad}
				rowId={row.original.id}
				field='actividad'
			/>
		)
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
		},
		cell: ({ row }) => (
			<EditableCell
				value={row.original.descripcion}
				rowId={row.original.id}
				field='descripcion'
			/>
		)
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
		},
		cell: ({ row }) => (
			<EnumSelect
				field='frecuencia'
				rowId={row.original.id}
				value={row.original.frecuencia}
				options={frecuencias}
			/>
		)
	},
	{
		accessorKey: 'prioridad',
		header: ({ column }) => {
			return (
				<DataTableColumnHeader
					column={column}
					title='Prioridad'
				/>
			)
		},
		cell: ({ row }) => (
			<EnumSelect
				field='prioridad'
				rowId={row.original.id}
				value={row.original.prioridad}
				options={prioridades}
			/>
		)
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
		},
		cell: ({ row }) => (
			<EnumSelect
				field='estado'
				rowId={row.original.id}
				value={row.original.estado}
				options={estados}
			/>
		)
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
		},
		cell: ({ row }) => (
			<EnumSelect
				options={areas}
				value={row.original.nombre_area}
				rowId={row.original.id}
				field='nombre_area'
			/>
		)
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
		},
		cell: ({ row }) => (
			<EnumSelect
				options={usuariosList}
				value={row.original.usuario_experto}
				rowId={row.original.id}
				field='usuario_experto'
			/>
		)
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
