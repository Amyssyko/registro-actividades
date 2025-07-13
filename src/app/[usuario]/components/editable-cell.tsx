'use client'

import { Input } from '@/components/ui/input'
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
type EditableCellProps<K extends FieldName> = {
	value: FieldValue<K>
	rowId: string
	field: K
}

export function EditableCell<K extends FieldName>({
	value: initialValue,
	rowId,
	field
}: EditableCellProps<K>) {
	const [value, setValue] = useState<FieldValue<K>>(initialValue)
	const [isPending, startTransition] = useTransition()

	const handleSave = () => {
		//valirdar que no sea tipo fecha, undefined o string
		if (typeof value === 'object' || value === undefined) {
			toast.error('Valor no válido para guardar')
			return
		}

		if (value === initialValue) return

		startTransition(async () => {
			const res = await updateActividadCampo(rowId, field, value)

			if (!res.success) {
				toast.error(`Error al guardar: ${res.error}`)
			} else {
				toast.success('Campo actualizado correctamente')
			}
		})
	}

	return (
		<>
			<Input
				type='text'
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onBlur={handleSave}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						e.preventDefault()
						handleSave()
					}
				}}
				disabled={isPending}
				className='w-fit h-full text-sm'
			/>
		</>
	)
}
