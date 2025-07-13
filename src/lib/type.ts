import React from 'react'
import { z } from 'zod/v4'

export type PageProps = {
	params: Promise<{ usuario: string }>
	searchParams?: Promise<Readonly<Record<string, string | string[]>>>
}

export type LayoutProps = PageProps & {
	pathname: string
	children: React.ReactNode
}

export enum Prioridad {
	ALTA = 'Alta',
	MEDIA = 'Media',
	BAJA = 'Baja'
}

export enum Estado {
	'To Do' = 'Por hacer',
	'In progress' = 'En progreso',
	'In Review' = 'En revisión',
	'Done' = 'Hecho',
	'Blocked' = 'Bloqueado',
	'Stand by' = 'Suspendido'
}

export enum Frecuencia {
	UNICA = 'Única',
	DIARIA = 'Diaria',
	SEMANAL = 'Semanal',
	MENSUAL = 'Mensual',
	ANUAL = 'Anual',
	TRIMESTRAL = 'Trimestral',
	SEMESTRAL = 'Semestral'
}

export const usuarioFormSchema = z.object({
	id: z.string(),
	nombre_usuario: z.string().min(1, 'El nombre del usuario es obligatorio')
})
export type UsuarioFormType = z.infer<typeof usuarioFormSchema>

export const actividadFormSchema = z.object({
	id: z.string(),
	nombre_responsable: z
		.string()
		.min(1, 'El nombre del responsable es obligatorio'),
	prioridad: z.enum(Prioridad, { error: 'La prioridad es obligatoria' }),
	estado: z.enum(Estado, { error: 'El estado es obligatorio' }),
	frecuencia: z.enum(Frecuencia, { error: 'La frecuencia es obligatoria' }),
	actividad: z.string().min(1, 'La actividad es obligatoria'),
	descripcion: z.string().min(1, 'La descripción es obligatoria'),
	usuario_experto: z.string().min(1, 'El usuario experto es obligatorio'),
	nombre_area: z.string().min(1, 'El nombre del área es obligatorio'),
	fecha_inicio: z.date({ error: 'La fecha de inicio es obligatoria' }),
	fecha_fin: z.date().optional(),
	fecha_creacion: z.date().optional(),
	fecha_actualizacion: z.date().optional()
})

// crea nuevo tipo solo de los enums: ActividadFormEnums
export type ActividadFormEnums = {
	prioridad: Prioridad
	estado: Estado
	frecuencia: Frecuencia
}

export const prioridades: Prioridad[] = [
	Prioridad.ALTA,
	Prioridad.MEDIA,
	Prioridad.BAJA
]
export const estados: Estado[] = [
	Estado['To Do'],
	Estado['In progress'],
	Estado['In Review'],
	Estado['Done'],
	Estado['Blocked'],
	Estado['Stand by']
]

export const frecuencias: Frecuencia[] = [
	Frecuencia['UNICA'],
	Frecuencia['DIARIA'],
	Frecuencia['SEMANAL'],
	Frecuencia['MENSUAL'],
	Frecuencia['ANUAL'],
	Frecuencia['TRIMESTRAL'],
	Frecuencia['SEMESTRAL']
]
export const areas: string[] = [
	'Desarrollo',
	'Calidad',
	'Soporte',
	'Administración'
]
export const usuariosList: string[] = [
	'Juan Pérez',
	'María López',
	'Pedro Martínez',
	'Lucía Sánchez',
	'Andrés Gómez',
	'Clara Ruiz',
	'Diego Fernández',
	'Sara López',
	'David Martínez',
	'Laura Torres',
	'Carlos Garces',
	'Ana Gómez',
	'Isabel Martínez',
	'Fernando Gómez'
]

export const detallesActividadFormSchema = z.object({
	id: z.string(),
	nombre_responsable: z.string(),
	estado: z.enum(Estado, { error: 'El estado es obligatorio' })
})

export type ActividadFormType = z.infer<typeof actividadFormSchema>

export type ActividadType = {
	id: string
	nombre_responsable: string
	priodridad: Prioridad
	estado: Estado
	frecuencia: Frecuencia
	actividad: string
	descripcion: string
	usuario_experto: string
	nombre_area: string
	fecha_inicio: Date
	fecha_fin: Date
}

export const usuarios: UsuarioFormType[] = [
	{ id: '1', nombre_usuario: 'Juan Pérez' },
	{ id: '2', nombre_usuario: 'María López' },
	{ id: '3', nombre_usuario: 'Pedro Martínez' },
	{ id: '4', nombre_usuario: 'Lucía Sánchez' },
	{ id: '5', nombre_usuario: 'Andrés Gómez' },
	{ id: '6', nombre_usuario: 'Clara Ruiz' },
	{ id: '7', nombre_usuario: 'Diego Fernández' },
	{ id: '8', nombre_usuario: 'Sara López' },
	{ id: '9', nombre_usuario: 'David Martínez' },
	{ id: '10', nombre_usuario: 'Laura Torres' },
	{ id: '11', nombre_usuario: 'Carlos Garces' },
	{ id: '12', nombre_usuario: 'Ana Gómez' },
	{ id: '13', nombre_usuario: 'Isabel Martínez' },
	{ id: '14', nombre_usuario: 'Fernando Gómez' }
]

export const datos: ActividadFormType[] = [
	{
		id: '1',
		nombre_responsable: 'Juan Pérez',
		prioridad: Prioridad.ALTA,
		estado: Estado['To Do'],
		frecuencia: Frecuencia.UNICA,
		actividad: 'Reunión de equipo',
		descripcion: 'Reunión semanal para revisar el progreso del proyecto',
		usuario_experto: 'Ana Gómez',
		nombre_area: 'Desarrollo',
		fecha_inicio: new Date('2025-06-01T10:00:00Z'),
		fecha_fin: new Date('2025-06-01T11:00:00Z'),
		fecha_creacion: new Date('2025-09-25T10:00:00Z'),
		fecha_actualizacion: new Date('2025-09-26T10:00	:00Z')
	},
	{
		id: '2',
		nombre_responsable: 'María López',
		prioridad: Prioridad.MEDIA,
		estado: Estado['In progress'],
		frecuencia: Frecuencia.SEMANAL,
		actividad: 'Desarrollo de funcionalidades',
		descripcion: 'Implementación de nuevas características en la aplicación',
		usuario_experto: 'Carlos Ruiz',
		nombre_area: 'Desarrollo',
		fecha_inicio: new Date('2025-06-02T09:00:00Z'),
		fecha_fin: new Date('2025-06-02T17:00:00Z'),
		fecha_creacion: new Date('2025-09-26T09:00:00Z'),
		fecha_actualizacion: new Date('2025-09-27T09:00:00Z')
	},
	{
		id: '3',
		nombre_responsable: 'Pedro Martínez',
		prioridad: Prioridad.BAJA,
		estado: Estado['Done'],
		frecuencia: Frecuencia.MENSUAL,
		actividad: 'Revisión de código',
		descripcion: 'Análisis y mejora del código existente',
		usuario_experto: 'Laura Fernández',
		nombre_area: 'Calidad',
		fecha_inicio: new Date('2025-06-03T08:00:00Z'),
		fecha_fin: new Date('2025-06-03T12:00:00Z'),
		fecha_creacion: new Date('2025-09-27T08:00:00Z'),
		fecha_actualizacion: new Date('2025-09-28T08:00:00Z')
	},
	{
		id: '4',
		nombre_responsable: 'Lucía Sánchez',
		prioridad: Prioridad.ALTA,
		estado: Estado['Blocked'],
		frecuencia: Frecuencia.ANUAL,
		actividad: 'Planificación estratégica',
		descripcion: 'Definición de objetivos y estrategias para el próximo año',
		usuario_experto: 'Javier Torres',
		nombre_area: 'Dirección',
		fecha_inicio: new Date('2025-06-04T14:00:00Z'),
		fecha_fin: new Date('2025-06-04T16:00:00Z'),
		fecha_creacion: new Date('2025-09-28T14:00:00Z'),
		fecha_actualizacion: new Date('2025-09-29T14:00:00Z')
	},
	{
		id: '5',
		nombre_responsable: 'Andrés Gómez',
		prioridad: Prioridad.MEDIA,
		estado: Estado['Stand by'],
		frecuencia: Frecuencia.TRIMESTRAL,
		actividad: 'Análisis de mercado',
		descripcion: 'Estudio de tendencias y competidores en el sector',
		usuario_experto: 'Sofía Pérez',
		nombre_area: 'Marketing',
		fecha_inicio: new Date('2025-06-05T11:00:00Z'),
		fecha_fin: new Date('2025-06-05T13:00:00Z'),
		fecha_creacion: new Date('2025-09-29T11:00:00Z'),
		fecha_actualizacion: new Date('2025-09-30T11:00:00Z')
	},
	{
		id: '6',
		nombre_responsable: 'Clara Ruiz',
		prioridad: Prioridad.BAJA,
		estado: Estado['To Do'],
		frecuencia: Frecuencia.SEMESTRAL,
		actividad: 'Capacitación del personal',
		descripcion: 'Formación en nuevas tecnologías y herramientas',
		usuario_experto: 'Miguel Ángel Díaz',
		nombre_area: 'Recursos Humanos',
		fecha_inicio: new Date('2025-06-06T15:00:00Z'),
		fecha_fin: new Date('2025-06-06T17:00:00Z'),
		fecha_creacion: new Date('2025-09-30T15:00:00Z'),
		fecha_actualizacion: new Date('2025-06-01T15:00:00Z')
	},
	{
		id: '7',
		nombre_responsable: 'Diego Fernández',
		prioridad: Prioridad.ALTA,
		estado: Estado['In progress'],
		frecuencia: Frecuencia.UNICA,
		actividad: 'Implementación de nuevas tecnologías',
		descripcion:
			'Adopción de herramientas innovadoras para mejorar la productividad',
		usuario_experto: 'Isabel Martínez',
		nombre_area: 'Tecnología',
		fecha_inicio: new Date('2025-06-07T10:00:00Z'),
		fecha_fin: new Date('2025-06-07T12:00:00Z'),
		fecha_creacion: new Date('2025-06-01T10:00:00Z'),
		fecha_actualizacion: new Date('2025-06-02T10:00:00Z')
	},
	{
		id: '8',
		nombre_responsable: 'Sara López',
		prioridad: Prioridad.MEDIA,
		estado: Estado['In Review'],
		frecuencia: Frecuencia.SEMANAL,
		actividad: 'Revisión de procesos internos',
		descripcion: 'Evaluación y mejora de los procedimientos operativos',
		usuario_experto: 'Fernando Gómez',
		nombre_area: 'Operaciones',
		fecha_inicio: new Date('2025-06-08T09:00:00Z'),
		fecha_fin: new Date('2025-06-08T11:00:00Z'),
		fecha_creacion: new Date('2025-06-02T09:00:00Z'),
		fecha_actualizacion: new Date('2025-06-03T09:00:00Z')
	},
	{
		id: '9',
		nombre_responsable: 'David Martínez',
		prioridad: Prioridad.BAJA,
		estado: Estado['Done'],
		frecuencia: Frecuencia.MENSUAL,
		actividad: 'Evaluación de desempeño',
		descripcion:
			'Análisis del rendimiento del equipo y establecimiento de objetivos',
		usuario_experto: 'Patricia Sánchez',
		nombre_area: 'Recursos Humanos',
		fecha_inicio: new Date('2025-06-09T08:00:00Z'),
		fecha_fin: new Date('2025-06-09T10:00:00Z'),
		fecha_creacion: new Date('2025-06-03T08:00:00Z'),
		fecha_actualizacion: new Date('2025-06-04T08:00:00Z')
	},
	{
		id: '10',
		nombre_responsable: 'Laura Torres',
		prioridad: Prioridad.ALTA,
		estado: Estado['Blocked'],
		frecuencia: Frecuencia.ANUAL,
		actividad: 'Planificación de eventos corporativos',
		descripcion:
			'Organización de conferencias y seminarios para el próximo año',
		usuario_experto: 'Jorge Pérez',
		nombre_area: 'Eventos',
		fecha_inicio: new Date('2025-06-10T14:00:00Z'),
		fecha_fin: new Date('2025-06-10T16:00:00Z'),
		fecha_creacion: new Date('2025-06-04T14:00:00Z'),
		fecha_actualizacion: new Date('2025-06-05T14:00:00Z')
	},
	{
		id: '11',
		nombre_responsable: 'Carlos Garces',
		prioridad: Prioridad.MEDIA,
		estado: Estado['Stand by'],
		frecuencia: Frecuencia.TRIMESTRAL,
		actividad: 'Análisis de resultados financieros',
		descripcion: 'Revisión de los informes financieros del último trimestre',
		usuario_experto: 'Ana Gómez',
		nombre_area: 'Finanzas',
		fecha_inicio: new Date('2025-06-11T11:00:00Z'),
		fecha_fin: new Date('2025-06-11T13:00:00Z'),
		fecha_creacion: new Date('2025-06-05T11:00:00Z'),
		fecha_actualizacion: new Date('2025-06-06T11:00:00Z')
	},
	{
		id: '12',
		nombre_responsable: 'Clara Ruiz',
		prioridad: Prioridad.BAJA,
		estado: Estado['To Do'],
		frecuencia: Frecuencia.SEMESTRAL,
		actividad: 'Capacitación en nuevas herramientas',
		descripcion: 'Formación en el uso de software y herramientas recientes',
		usuario_experto: 'Miguel Ángel Díaz',
		nombre_area: 'Capacitación',
		fecha_inicio: new Date('2025-06-12T15:00:00Z'),
		fecha_fin: new Date('2025-06-12T17:00:00Z'),
		fecha_creacion: new Date('2025-06-06T15:00:00Z'),
		fecha_actualizacion: new Date('2025-06-07T15:00:00Z')
	},
	{
		id: '13',
		nombre_responsable: 'Diego Fernández',
		prioridad: Prioridad.ALTA,
		estado: Estado['In progress'],
		frecuencia: Frecuencia.UNICA,
		actividad: 'Implementación de nuevas tecnologías',
		descripcion:
			'Adopción de herramientas innovadoras para mejorar la productividad',
		usuario_experto: 'Isabel Martínez',
		nombre_area: 'Tecnología',
		fecha_inicio: new Date('2025-06-13T10:00:00Z'),
		fecha_fin: new Date('2025-06-13T12:00:00Z'),
		fecha_creacion: new Date('2025-06-07T10:00:00Z'),
		fecha_actualizacion: new Date('2025-06-08T10:00:00Z')
	},
	{
		id: '14',
		nombre_responsable: 'Sara López',
		prioridad: Prioridad.MEDIA,
		estado: Estado['In Review'],
		frecuencia: Frecuencia.SEMANAL,
		actividad: 'Revisión de procesos internos',
		descripcion: 'Evaluación y mejora de los procedimientos operativos',
		usuario_experto: 'Fernando Gómez',
		nombre_area: 'Operaciones',
		fecha_inicio: new Date('2025-06-14T09:00:00Z'),
		fecha_fin: new Date('2025-06-14T11:00:00Z'),
		fecha_creacion: new Date('2025-06-08T09:00:00Z'),
		fecha_actualizacion: new Date('2025-06-09T09:00:00Z')
	}
]
