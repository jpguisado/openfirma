import { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { useAuth } from '../../hooks/useAuth';

export default function DocumentPreview(props) {

	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);

	const {currentUser} = useAuth();

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

	const file = { 
		url: props.file,
		httpHeaders: 
			{'Authorization' : currentUser.token},
	}

	return (

		<div className='overflow-hidden'>
			<div className='h-3/4 overflow-hidden'>
				<Document loading={''} file={file} onLoadSuccess={onDocumentLoadSuccess}>
					<Page scale={0.3} className={""} pageNumber={pageNumber} />
				</Document>
			</div>
			<div className='bg-gray-100 h-1/4 flex'>
				<div className='w-1/5 self-center'>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
						<path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
					</svg>
				</div>
				<div className='w-4/5 self-center text-xs truncate uppercase'>{props.documentsName}</div>
			</div>
		</div>

	)

}