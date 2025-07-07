import { ReactNode } from 'react'

const Container = ({ children }: { children: ReactNode }) => {
	return <div className='px-4 w-full max-w-7xl h-full'>{children}</div>
}

export default Container
