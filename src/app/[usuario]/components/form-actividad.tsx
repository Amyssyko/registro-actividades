'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
	actividadFormSchema,
	ActividadFormType,
	Estado,
	Frecuencia,
	Prioridad
} from '@/lib/type'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod/v4'

const areas = [
	{ value: 'Desarrollo', label: 'Desarrollo' },
	{ value: 'Marketing', label: 'Marketing' },
	{ value: 'Ventas', label: 'Ventas' },
	{ value: 'Recursos Humanos', label: 'Recursos Humanos' },
	{ value: 'Finanzas', label: 'Finanzas' },
	{ value: 'Operaciones', label: 'Operaciones' }
]

export const prioridad: Prioridad[] = [
	Prioridad.ALTA,
	Prioridad.MEDIA,
	Prioridad.BAJA
]
export const estado: Estado[] = [
	Estado['To Do'],
	Estado['In progress'],
	Estado['In Review'],
	Estado['Done'],
	Estado['Blocked'],
	Estado['Stand by']
]

export const frecuencia: Frecuencia[] = [
	Frecuencia['UNICA'],
	Frecuencia['DIARIA'],
	Frecuencia['SEMANAL'],
	Frecuencia['MENSUAL'],
	Frecuencia['ANUAL'],
	Frecuencia['TRIMESTRAL'],
	Frecuencia['SEMESTRAL']
]

type ActividadFormProps = {
	usuario: string
	className?: string
	initialValues?: ActividadFormType
} & React.ComponentProps<'div'>

const FormActividad: FC<ActividadFormProps> = ({
	className,
	initialValues,
	...props
}) => {
	const { push, refresh } = useRouter()

	const form = useForm<ActividadFormType>({
		resolver: zodResolver(actividadFormSchema),
		defaultValues: initialValues || {
			id: '',
			nombre_responsable: '',
			prioridad: undefined,
			estado: undefined,
			frecuencia: undefined,
			actividad: '',
			descripcion: '',
			usuario_experto: '',
			nombre_area: '',
			fecha_inicio: undefined,
			fecha_fin: undefined
		}
	})

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof actividadFormSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.

		console.log('Form submitted:', values)
		// Aquí puedes enviar los datos al servidor o realizar cualquier acción necesaria
		// Por ejemplo, redirigir a otra página o mostrar un mensaje de éxito
		await fetch('/api/actividad', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(values)
		})
		refresh()
		push(`/${props.usuario}`)

		console.log(values)
	}

	return (
		<>
			<div
				{...props}
				className={cn('space-y-6', className)}>
				<Card className='shadow w-full'>
					<CardHeader className='text-center'>
						<CardTitle className='text-xl'>Crear Actividad</CardTitle>
						<CardDescription>
							Describe la actividad que deseas registrar. Asegúrate de incluir
							todos los detalles necesarios para que sea fácilmente
							identificable.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className='space-y-8'>
								<div className='gap-6 grid'>
									<FormField
										control={form.control}
										name='actividad'
										render={({ field }) => (
											<FormItem>
												<div className='group relative'>
													<FormDescription className='top-full absolute opacity-0 group-hover:opacity-100 -mt-9 text-destructive text-sm transition-opacity duration-300'>
														Escribe el nombre de la actividad.
													</FormDescription>
													<FormLabel className='cursor-pointer'>
														Actividad
													</FormLabel>
												</div>
												<FormControl>
													<Input
														placeholder='Actualicación de tableros...'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name='descripcion'
										render={({ field }) => {
											return (
												<FormItem>
													<div className='group relative'>
														<FormDescription className='top-full absolute opacity-0 group-hover:opacity-100 -mt-9 text-destructive text-sm transition-opacity duration-300'>
															Escribe una breve descripción de la actividad.
														</FormDescription>
														<FormLabel className='cursor-pointer'>
															Descripción
														</FormLabel>
													</div>
													<FormControl>
														<Textarea
															placeholder='Descripción de la actividad...'
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)
										}}
									/>

									<fieldset className='gap-6 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4'>
										<FormField
											control={form.control}
											name='prioridad'
											render={({ field }) => (
												<FormItem>
													<div className='group relative'>
														<FormDescription className='top-full absolute opacity-0 group-hover:opacity-100 -mt-9 text-destructive text-sm transition-opacity duration-300'>
															Selecciona la prioridad de la actividad.
														</FormDescription>
														<FormLabel className='cursor-pointer'>
															Prioridad
														</FormLabel>
													</div>
													<FormControl>
														<Select
															{...field}
															onValueChange={field.onChange}>
															<SelectTrigger
																aria-label='Seleccionar prioridad'
																type='button'
																className='w-[220px]'>
																<SelectValue placeholder='Seleccionar prioridad' />
															</SelectTrigger>
															<SelectContent>
																{prioridad.map((item) => (
																	<SelectItem
																		key={item}
																		value={item}>
																		{item}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name='estado'
											render={({ field }) => (
												<FormItem>
													<div className='group relative'>
														<FormDescription className='top-full absolute opacity-0 group-hover:opacity-100 -mt-9 text-destructive text-sm transition-opacity duration-300'>
															Selecciona el estado de la actividad.
														</FormDescription>
														<FormLabel className='cursor-pointer'>
															Estado
														</FormLabel>
													</div>
													<FormControl>
														<Select
															{...field}
															onValueChange={field.onChange}>
															<SelectTrigger
																aria-label='Seleccionar estado'
																type='button'
																className='w-[220px]'>
																<SelectValue placeholder='Seleccionar estado' />
															</SelectTrigger>
															<SelectContent>
																{estado.map((item) => (
																	<SelectItem
																		key={item}
																		value={item}>
																		{item}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name='frecuencia'
											render={({ field }) => (
												<FormItem>
													<div className='group relative'>
														<FormDescription className='top-full absolute opacity-0 group-hover:opacity-100 -mt-9 text-destructive text-sm transition-opacity duration-300'>
															Selecciona la frecuencia de la actividad.
														</FormDescription>
														<FormLabel className='cursor-pointer'>
															Frecuencia
														</FormLabel>
													</div>
													<FormControl>
														<Select
															{...field}
															onValueChange={field.onChange}>
															<SelectTrigger
																aria-label='Seleccionar frecuencia'
																type='button'
																className='w-[220px]'>
																<SelectValue placeholder='Seleccionar frecuencia' />
															</SelectTrigger>
															<SelectContent>
																{frecuencia.map((item) => (
																	<SelectItem
																		key={item}
																		value={item}>
																		{item}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name='nombre_area'
											render={({ field }) => (
												<FormItem>
													<div className='group relative'>
														<FormDescription className='top-full absolute opacity-0 group-hover:opacity-100 -mt-9 text-destructive text-sm transition-opacity duration-300'>
															Selecciona el área responsable de la actividad.
														</FormDescription>
														<FormLabel className='cursor-pointer'>
															Área Responsable
														</FormLabel>
													</div>
													<FormControl>
														<Select
															{...field}
															onValueChange={field.onChange}>
															<SelectTrigger
																aria-label='Seleccionar área'
																type='button'
																className='w-[220px]'>
																<SelectValue placeholder='Seleccionar área' />
															</SelectTrigger>
															<SelectContent>
																{areas.map((area) => (
																	<SelectItem
																		key={area.value}
																		value={area.value}>
																		{area.label}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</fieldset>

									<FormField
										control={form.control}
										name='nombre_responsable'
										render={({ field }) => (
											<FormItem>
												<div className='group relative'>
													<FormDescription className='top-full absolute opacity-0 group-hover:opacity-100 -mt-9 text-destructive text-sm transition-opacity duration-300'>
														Escribe el nombre del responsable de la actividad.
													</FormDescription>
													<FormLabel className='cursor-pointer'>
														Nombre Responsable
													</FormLabel>
												</div>
												<FormControl>
													<Input
														placeholder='Jhon Doe'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name='usuario_experto'
										render={({ field }) => (
											<FormItem>
												<div className='group relative'>
													<FormDescription className='top-full absolute opacity-0 group-hover:opacity-100 -mt-9 text-destructive text-sm transition-opacity duration-300'>
														Escribe el nombre del usuario experto relacionado
														con la actividad.
													</FormDescription>
													<FormLabel className='cursor-pointer'>
														Usuario Experto
													</FormLabel>
												</div>
												<FormControl>
													<Input
														placeholder='cpilla'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<fieldset className='gap-6 grid grid-cols-1 sm:grid-cols-2'>
										<FormField
											control={form.control}
											name='fecha_inicio'
											render={({ field }) => (
												<FormItem className='flex flex-col'>
													<div className='group relative'>
														<FormDescription className='top-full absolute opacity-0 group-hover:opacity-100 -mt-9 text-destructive text-sm transition-opacity duration-300'>
															Selecciona la fecha de inicio de la actividad.
														</FormDescription>
														<FormLabel className='cursor-pointer'>
															Fecha Inicio
														</FormLabel>
													</div>
													<Popover>
														<PopoverTrigger asChild>
															<FormControl>
																<Button
																	variant={'outline'}
																	className={cn(
																		'w-[240px] pl-3 text-left font-normal',
																		!field.value && 'text-muted-foreground'
																	)}>
																	{field.value ? (
																		format(field.value, 'PPP', { locale: es })
																	) : (
																		<span>Selecciona una fecha</span>
																	)}
																	<CalendarIcon className='opacity-50 ml-auto w-4 h-4' />
																</Button>
															</FormControl>
														</PopoverTrigger>
														<PopoverContent
															className='p-0 w-auto'
															align='start'>
															<Calendar
																mode='single'
																selected={field.value}
																onSelect={field.onChange}
																disabled={(date) =>
																	date > new Date() ||
																	date < new Date('1900-01-01')
																}
																captionLayout='dropdown'
															/>
														</PopoverContent>
													</Popover>

													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name='fecha_fin'
											render={({ field }) => (
												<FormItem className='flex flex-col'>
													<div className='group relative'>
														<FormDescription className='top-full absolute opacity-0 group-hover:opacity-100 -mt-9 text-destructive text-sm transition-opacity duration-300'>
															Selecciona la fecha de finalización de la
															actividad.
														</FormDescription>
														<FormLabel className='cursor-pointer'>
															Fecha Fin
														</FormLabel>
													</div>
													<Popover>
														<PopoverTrigger asChild>
															<FormControl>
																<Button
																	variant={'outline'}
																	className={cn(
																		'w-[240px] pl-3 text-left font-normal',
																		!field.value && 'text-muted-foreground'
																	)}>
																	{field.value ? (
																		format(field.value, 'PPP', { locale: es })
																	) : (
																		<span>Selecciona una fecha</span>
																	)}
																	<CalendarIcon className='opacity-50 ml-auto w-4 h-4' />
																</Button>
															</FormControl>
														</PopoverTrigger>
														<PopoverContent
															className='p-0 w-auto'
															align='start'>
															<Calendar
																mode='single'
																selected={field.value}
																onSelect={field.onChange}
																disabled={(date) =>
																	date > new Date() ||
																	date < new Date('1900-01-01')
																}
																captionLayout='dropdown'
															/>
														</PopoverContent>
													</Popover>

													<FormMessage />
												</FormItem>
											)}
										/>
									</fieldset>
								</div>

								<div>
									<Button type='submit'>Guardar</Button>
								</div>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</>
	)
}

export default FormActividad
