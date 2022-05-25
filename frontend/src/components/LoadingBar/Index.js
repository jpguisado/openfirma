export default function LoadingBar (props){

	return(

		<div className={`overflow-hidden ${props.position} w-full z-10`} id='progress-bar'>
			<div className={`overflow-hidden ${props.bgColor} h-1 w-3/4 animate-progress-bar`}></div>
		</div>

	)

}