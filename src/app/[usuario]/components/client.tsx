'use client'
import { ActividadFormType } from '@/lib/type'
import React from 'react'
import { columns } from './columns'
import { DataTable } from './data_table'

type ActividadFormTypeProps = {
	data: ActividadFormType[]
}

const UsuarioDataTable: React.FC<ActividadFormTypeProps> = ({ data }) => {
	return (
		<>
			<DataTable
				searchKey='actividad'
				columns={columns}
				data={data}
			/>
		</>
	)
}

export default UsuarioDataTable
