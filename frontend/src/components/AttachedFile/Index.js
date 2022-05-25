import { useState } from 'react';
import formatBytes from '../../services/base/formatBytes'
export default function AttachedFile(props) {

	const [showOptions, setShowOptions] = useState(false);

	const showfileOptions = () => {
		setShowOptions(!showOptions)
	}

	function removeFileFromList(e){
		props.removeFileFromList(e.target.id)
	}

	return (
			<div className='w-40 h-10 flex border-[1px] relative bg-white mx-[1px]'>
				<div className='w-8 m-auto text-center'>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
						<path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
					</svg>
				</div>
				<div className='flex flex-col w-28 m-auto'>
					<span className='text-[10px] font-semi-bold select-none truncate'>{props.fileName}</span>
					<span className='text-[9px] select-none'>{formatBytes(props.fileSize)}</span>
				</div>
				<div className='flex w-8 cursor-pointer hover:bg-gray-100 active:bg-gray-200' onClick={showfileOptions}>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
						<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
					</svg>
				</div>
				{showOptions &&
				<div className='w-34 h-auto flex border-[1px] bg-white absolute top-10 right-0'>
					<div className='h-8 w-full flex cursor-pointer'>
						<div className='w-8 m-auto text-center cursor-pointer'>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 m-auto" fill="none" viewBox="0 0 24 24" stroke="black" strokeWidth={1}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</div>
						<div id={props.id} onClick={removeFileFromList} className='w-24 text-xs m-auto select-none'>Quitar adjunto</div>
					</div>
				</div>
				}
			</div>
	);
}