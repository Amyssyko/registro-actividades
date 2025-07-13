'use client'

import { actividadFormSchema } from '@/lib/type'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { z } from 'zod/v4'
import { updateActividadCampo } from '../actions/update-activities'

// Inferencia de tipos desde el schema de Zod
type FieldName = keyof typeof actividadFormSchema.shape
type FieldSchemas = typeof actividadFormSchema.shape
type FieldValue<K extends FieldName> = z.infer<FieldSchemas[K]>

// Props genéricas para campos enum
type EnumSelectProps<K extends FieldName> = {
	value: FieldValue<K>
	rowId: string
	field: K
	options: FieldValue<K>[]
}

// Validación genérica para evitar guardar valores no permitidos
function isValidEnumValue(value: unknown): boolean {
	return typeof value === 'string' && value.trim().length > 0
}

export function EnumSelect<K extends FieldName>({
	value: initialValue,
	rowId,
	field,
	options
}: EnumSelectProps<K>) {
	const [value, setValue] = useState<FieldValue<K>>(initialValue)
	const [isPending, startTransition] = useTransition()

	const handleSave = (newValue: FieldValue<K>) => {
		//valirdar que no sea tipo fecha, undefined o string
		if (typeof newValue === 'object' || newValue === undefined) {
			toast.error('Valor no válido para guardar')
			return
		}

		if (newValue === initialValue) return
		if (!isValidEnumValue(newValue)) {
			toast.error('Valor no válido para guardar')
			return
		}
		console.log('Valor seleccionado:', newValue)

		startTransition(async () => {
			const res = await updateActividadCampo(rowId, field, newValue)

			if (!res.success) {
				toast.error(`Error al guardar: ${res.error}`)
			} else {
				toast.success('Campo actualizado correctamente')
			}
		})
	}

	return (
		<select
			value={value as string}
			disabled={isPending}
			className='bg-white px-2 py-1 border border-gray-300 rounded text-sm'
			onChange={(e) => {
				const newValue = e.target.value as FieldValue<K>
				setValue(newValue)
				handleSave(newValue)
			}}>
			{options.map((opt) => (
				<option
					key={opt as string}
					value={opt as string}>
					{opt?.toLocaleString() || 'Seleccionar'}
				</option>
			))}
		</select>
	)
}
