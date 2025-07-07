const formatter = new Intl.DateTimeFormat('es-EC', {
	day: 'numeric',
	month: 'long',
	year: 'numeric',
	timeZone: 'America/Guayaquil'
})

function formatHora(fecha: Date | null | undefined) {
	if (!fecha) {
		return ''
	}

	const ahora = new Date()
	const fechaAjustada = new Date(fecha)
	const fechaFormateada = formatter.format(fechaAjustada)

	const diff = ahora.getTime() - fechaAjustada.getTime()
	const msPerDay = 24 * 60 * 60 * 1000
	if (diff < 0) {
		// Si la diferencia es negativa, la fecha ingresada es en el futuro
		return `hace unos instantes`
	} else if (diff < msPerDay) {
		return `hace ${getTimeDiffString(diff)}`
	} else {
		return fechaFormateada
	}
}

function getTimeDiffString(diff: number) {
	const seconds = Math.floor(diff / 1000)
	const minutes = Math.floor(seconds / 60)
	const hours = Math.floor(minutes / 60)

	if (seconds < 60) {
		return `${seconds} segundo${seconds !== 1 ? 's' : ''}`
	} else if (minutes < 60) {
		return `${minutes} minuto${minutes !== 1 ? 's' : ''}`
	} else {
		return `${hours} hora${hours !== 1 ? 's' : ''}`
	}
}

export { formatHora, formatter }
