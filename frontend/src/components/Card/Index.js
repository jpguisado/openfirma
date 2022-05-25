export function Card(props) {
	return <div className={` ${props.color} h-28 w-1/4 m-1 rounded-xl overflow-hidden bg-cover bg-center bg-blend-soft-light text-3xl p-2 text-slate-800`} style={{
		backgroundImage: `url(/img/${props.img})`
	}}>{props.tipoDato} <br />{props.dato} {props.adjetivo}</div>;
}
