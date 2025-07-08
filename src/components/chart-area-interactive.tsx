'use client'

import * as React from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import { Calendar } from '@/components/ui/calendar'
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent
} from '@/components/ui/chart'
import { Label } from '@/components/ui/label'
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
import { useIsMobile } from '@/hooks/use-mobile'
import { datos } from '@/lib/type'
import { Button } from './ui/button'

export const description = 'An interactive area chart'

const GROUP_OPTIONS = [
	{ value: 'estado', label: 'Estado' },
	{ value: 'frecuencia', label: 'Frecuencia' },
	{ value: 'prioridad', label: 'Prioridad' },
	{ value: 'nombre_area', label: 'Área' },
	{ value: 'nombre_responsable', label: 'Responsable' }
]

const chartConfig = {
	actividades: {
		label: 'Actividades',
		color: 'var(--primary)'
	}
} satisfies ChartConfig
type GroupByKey =
	| 'estado'
	| 'frecuencia'
	| 'prioridad'
	| 'nombre_area'
	| 'nombre_responsable'
export function ChartAreaInteractive() {
	const isMobile = useIsMobile()
	const [timeRange, setTimeRange] = React.useState('90d')
	const [groupBy, setGroupBy] = React.useState(GROUP_OPTIONS[0].value)
	const [customFrom, setCustomFrom] = React.useState<Date | undefined>(
		undefined
	)
	const [customTo, setCustomTo] = React.useState<Date | undefined>(undefined)
	const [showFrom, setShowFrom] = React.useState(false)
	const [showTo, setShowTo] = React.useState(false)

	React.useEffect(() => {
		if (isMobile) {
			setTimeRange('7d')
		}
	}, [isMobile])

	// Agrupación dinámica
	const getChartData = () => {
		// Agrupa por el campo seleccionado y guarda la fecha_inicio de cada actividad
		const actividadesPorCampo: Record<
			string,
			{ count: number; fechas: string[] }
		> = {}
		datos.forEach((actividad) => {
			const campo = actividad[groupBy as GroupByKey] as string
			const fecha =
				actividad.fecha_inicio instanceof Date
					? actividad.fecha_inicio
					: actividad.fecha_inicio
					? new Date(actividad.fecha_inicio as string)
					: undefined
			if (!campo || !fecha) return
			if (!actividadesPorCampo[campo])
				actividadesPorCampo[campo] = { count: 0, fechas: [] }
			actividadesPorCampo[campo].count++
			actividadesPorCampo[campo].fechas.push(fecha.toISOString().slice(0, 10))
		})
		return Object.entries(actividadesPorCampo)
			.map(([campo, { count, fechas }]) => ({
				label: campo,
				actividades: count,
				fechas
			}))
			.sort((a, b) => a.label.localeCompare(b.label))
	}

	// Filtrado por rango de tiempo para todos los filtros (usa fecha_inicio)
	const chartData = getChartData()
		.map((item) => {
			let fechasFiltradas = item.fechas
			if (timeRange === 'custom' && customFrom && customTo) {
				fechasFiltradas = item.fechas.filter((f) => {
					const d = new Date(f)
					return d >= customFrom && d <= customTo
				})
			} else {
				const referenceDate = new Date()
				let daysToSubtract = 180
				if (timeRange === '30d') daysToSubtract = 30
				else if (timeRange === '7d') daysToSubtract = 7
				else if (timeRange === '90d') daysToSubtract = 90
				const startDate = new Date(referenceDate)
				startDate.setDate(startDate.getDate() - daysToSubtract)
				fechasFiltradas = item.fechas.filter((f) => {
					const d = new Date(f)
					return d >= startDate
				})
			}
			return { ...item, value: fechasFiltradas.length, fechas: fechasFiltradas }
		})
		.filter((item) => item.value > 0)

	return (
		<Card className='@container/card'>
			<CardHeader>
				<CardTitle>Actividades agrupadas</CardTitle>
				<CardDescription>
					<span className='hidden @[540px]/card:block'>
						Agrupación por{' '}
						{GROUP_OPTIONS.find((opt) => opt.value === groupBy)?.label}
					</span>
				</CardDescription>
				<CardAction className='flex flex-wrap gap-2'>
					<Select
						value={groupBy}
						onValueChange={setGroupBy}>
						<SelectTrigger
							className='w-48'
							size='sm'
							aria-label='Agrupar por'>
							<SelectValue placeholder='Agrupar por' />
						</SelectTrigger>
						<SelectContent className='rounded-xl'>
							{GROUP_OPTIONS.map((opt) => (
								<SelectItem
									key={opt.value}
									value={opt.value}
									className='rounded-lg'>
									{opt.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Select
						value={timeRange}
						onValueChange={setTimeRange}>
						<SelectTrigger
							className='w-40'
							size='sm'
							aria-label='Rango de fechas'>
							<SelectValue placeholder='Rango de fechas' />
						</SelectTrigger>
						<SelectContent className='rounded-xl'>
							<SelectItem
								value='7d'
								className='rounded-lg'>
								Últimos 7 días
							</SelectItem>
							<SelectItem
								value='30d'
								className='rounded-lg'>
								Últimos 30 días
							</SelectItem>
							<SelectItem
								value='90d'
								className='rounded-lg'>
								Últimos 3 meses
							</SelectItem>
							<SelectItem
								value='180d'
								className='rounded-lg'>
								Últimos 6 meses
							</SelectItem>
							<SelectItem
								value='custom'
								className='rounded-lg'>
								Rango personalizado
							</SelectItem>
						</SelectContent>
					</Select>
					{timeRange === 'custom' && (
						<>
							<Popover
								open={showFrom}
								onOpenChange={setShowFrom}>
								<PopoverTrigger asChild>
									<Button
										variant='outline'
										onClick={() => setShowFrom(true)}>
										{customFrom
											? customFrom.toLocaleDateString()
											: 'Fecha inicio'}
									</Button>
								</PopoverTrigger>
								<PopoverContent align='center'>
									<Label>Fecha inicio</Label>
									<Calendar
										mode='single'
										defaultMonth={new Date()}
										selected={customFrom}
										onSelect={(date) => {
											setCustomFrom(date as Date)
											setShowFrom(false)
										}}
										captionLayout='dropdown'
										className='shadow-sm border rounded-lg'
									/>
								</PopoverContent>
							</Popover>
							<Popover
								open={showTo}
								onOpenChange={setShowTo}>
								<PopoverTrigger asChild>
									<Button
										variant='outline'
										onClick={() => setShowTo(true)}>
										{customTo ? customTo.toLocaleDateString() : 'Fecha fin'}
									</Button>
								</PopoverTrigger>
								<PopoverContent align='center'>
									<Label>Fecha fin</Label>
									<Calendar
										mode='single'
										selected={customTo}
										onSelect={(date) => {
											setCustomTo(date as Date)
											setShowTo(false)
										}}
										captionLayout='dropdown'
									/>
								</PopoverContent>
							</Popover>
						</>
					)}
				</CardAction>
			</CardHeader>
			<CardContent className='px-2 sm:px-6 pt-4 sm:pt-6'>
				<ChartContainer
					config={chartConfig}
					className='w-full h-[250px] aspect-auto'>
					<AreaChart data={chartData}>
						<defs>
							<linearGradient
								id='fillActividades'
								x1='0'
								y1='0'
								x2='0'
								y2='1'>
								<stop
									offset='5%'
									stopColor='var(--primary)'
									stopOpacity={1.0}
								/>
								<stop
									offset='95%'
									stopColor='var(--primary)'
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='label'
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
						/>
						<ChartTooltip
							cursor={false}
							defaultIndex={isMobile ? -1 : 0}
							content={
								<ChartTooltipContent
									labelFormatter={(value) => {
										const item = chartData.find((i) => i.label === value)
										if (item && item.fechas.length > 0) {
											return (
												<div>
													<div>
														<b>{value}</b>
													</div>
													<div>Fechas de actividades:</div>
													<ul style={{ margin: 0, paddingLeft: 16 }}>
														{item.fechas.map((f, idx) => (
															<li key={idx}>
																{new Date(f).toLocaleDateString('es-ES', {
																	year: 'numeric',
																	month: 'short',
																	day: 'numeric'
																})}
															</li>
														))}
													</ul>
												</div>
											)
										}
										return value
									}}
									indicator='dot'
								/>
							}
						/>
						<Area
							dataKey='actividades'
							type='natural'
							fill='url(#fillActividades)'
							stroke='var(--primary)'
							stackId='a'
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
