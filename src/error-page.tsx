import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
	const error = useRouteError() as { statusText?: string; message?: string };
	console.log(error);

	return (
		<div id='error-page'>
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has ocurred.</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
		</div>
	);
}
