import { ReactNode } from 'react'

const Container = ({ children }: { children: ReactNode }) => {
	return <div className='px-4 w-full h-full'>{children}</div>
}

export default Container
