// app/actions/update-actividad.ts
'use server'

//import { db } from '@/lib/db'
import { actividadFormSchema } from '@/lib/type'

// Extraemos validadores por campo
const fieldSchemas = actividadFormSchema.shape

export async function updateActividadCampo(
	id: string,
	field: keyof typeof fieldSchemas,
	value: (typeof fieldSchemas)[typeof field] | Date | string
) {
	try {
		console.log({ id, field, value })
		// Validar el campo individualmente usando zod
		const fieldSchema = fieldSchemas[field]
		const parsed = fieldSchema.safeParse(value)

		if (!parsed.success) {
			return { success: false, error: parsed.error.issues[0].message }
		}
		console.log(parsed.data)

		// Guardar solo el campo editado
		/* 	await db.actividad.update({
			where: { id },
			data: {
				[field]: parsed.data,
				fecha_actualizacion: new Date() // puedes actualizar la fecha si deseas
			}
		}) */

		return { success: true }
	} catch (error) {
		console.error('[updateActividadCampo]', error)
		return { success: false, error: 'Error al guardar el campo' }
	}
}
