import { z } from 'zod/v4'

export type Params = {
	pathname: string
	params: Promise<{ usuario: string }>
	searchParams: Promise<Readonly<Record<string, string | string[]>>>
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

export type UsuarioType = {
	id: string
	nombre_usuario: string
}

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
		fecha_inicio: new Date('2023-10-01T10:00:00Z'),
		fecha_fin: new Date('2023-10-01T11:00:00Z'),
		fecha_creacion: new Date('2023-09-25T10:00:00Z'),
		fecha_actualizacion: new Date('2023-09-26T10:00	:00Z')
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
		fecha_inicio: new Date('2023-10-02T09:00:00Z'),
		fecha_fin: new Date('2023-10-02T17:00:00Z'),
		fecha_creacion: new Date('2023-09-26T09:00:00Z'),
		fecha_actualizacion: new Date('2023-09-27T09:00:00Z')
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
		fecha_inicio: new Date('2023-10-03T08:00:00Z'),
		fecha_fin: new Date('2023-10-03T12:00:00Z'),
		fecha_creacion: new Date('2023-09-27T08:00:00Z'),
		fecha_actualizacion: new Date('2023-09-28T08:00:00Z')
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
		fecha_inicio: new Date('2023-10-04T14:00:00Z'),
		fecha_fin: new Date('2023-10-04T16:00:00Z'),
		fecha_creacion: new Date('2023-09-28T14:00:00Z'),
		fecha_actualizacion: new Date('2023-09-29T14:00:00Z')
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
		fecha_inicio: new Date('2023-10-05T11:00:00Z'),
		fecha_fin: new Date('2023-10-05T13:00:00Z'),
		fecha_creacion: new Date('2023-09-29T11:00:00Z'),
		fecha_actualizacion: new Date('2023-09-30T11:00:00Z')
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
		fecha_inicio: new Date('2023-10-06T15:00:00Z'),
		fecha_fin: new Date('2023-10-06T17:00:00Z'),
		fecha_creacion: new Date('2023-09-30T15:00:00Z'),
		fecha_actualizacion: new Date('2023-10-01T15:00:00Z')
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
		fecha_inicio: new Date('2023-10-07T10:00:00Z'),
		fecha_fin: new Date('2023-10-07T12:00:00Z'),
		fecha_creacion: new Date('2023-10-01T10:00:00Z'),
		fecha_actualizacion: new Date('2023-10-02T10:00:00Z')
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
		fecha_inicio: new Date('2023-10-08T09:00:00Z'),
		fecha_fin: new Date('2023-10-08T11:00:00Z'),
		fecha_creacion: new Date('2023-10-02T09:00:00Z'),
		fecha_actualizacion: new Date('2023-10-03T09:00:00Z')
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
		fecha_inicio: new Date('2023-10-09T08:00:00Z'),
		fecha_fin: new Date('2023-10-09T10:00:00Z'),
		fecha_creacion: new Date('2023-10-03T08:00:00Z'),
		fecha_actualizacion: new Date('2023-10-04T08:00:00Z')
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
		fecha_inicio: new Date('2023-10-10T14:00:00Z'),
		fecha_fin: new Date('2023-10-10T16:00:00Z'),
		fecha_creacion: new Date('2023-10-04T14:00:00Z'),
		fecha_actualizacion: new Date('2023-10-05T14:00:00Z')
	},
	{
		id: '11',
		nombre_responsable: 'Carlos Pilla',
		prioridad: Prioridad.MEDIA,
		estado: Estado['Stand by'],
		frecuencia: Frecuencia.TRIMESTRAL,
		actividad: 'Análisis de resultados financieros',
		descripcion: 'Revisión de los informes financieros del último trimestre',
		usuario_experto: 'Ana Gómez',
		nombre_area: 'Finanzas',
		fecha_inicio: new Date('2023-10-11T11:00:00Z'),
		fecha_fin: new Date('2023-10-11T13:00:00Z'),
		fecha_creacion: new Date('2023-10-05T11:00:00Z'),
		fecha_actualizacion: new Date('2023-10-06T11:00:00Z')
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
		fecha_inicio: new Date('2023-10-12T15:00:00Z'),
		fecha_fin: new Date('2023-10-12T17:00:00Z'),
		fecha_creacion: new Date('2023-10-06T15:00:00Z'),
		fecha_actualizacion: new Date('2023-10-07T15:00:00Z')
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
		fecha_inicio: new Date('2023-10-13T10:00:00Z'),
		fecha_fin: new Date('2023-10-13T12:00:00Z'),
		fecha_creacion: new Date('2023-10-07T10:00:00Z'),
		fecha_actualizacion: new Date('2023-10-08T10:00:00Z')
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
		fecha_inicio: new Date('2023-10-14T09:00:00Z'),
		fecha_fin: new Date('2023-10-14T11:00:00Z'),
		fecha_creacion: new Date('2023-10-08T09:00:00Z'),
		fecha_actualizacion: new Date('2023-10-09T09:00:00Z')
	}
]
