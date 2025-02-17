import { Form, Link, Outlet, useLoaderData } from 'react-router-dom';

import { createContact, getContacts } from '../contacts';
import { ContactType } from '../types/ContactType';

export async function loader() {
	const contacts = await getContacts();
	return { contacts };
}

export async function action() {
	const contact = await createContact();
	return { contact };
}

export default function Root() {
	const contacts = useLoaderData() as ContactType[];
	return (
		<>
			<div id='sidebar'>
				<h1>React Router Contacts</h1>
				<div>
					<form id='search-form' role='search'>
						<input
							id='q'
							aria-label='Search contacts'
							placeholder='Search'
							type='search'
							name='q'
						/>
						<div
							id='search-spinner'
							aria-hidden
							hidden={true}
						/>
						<div className='sr-only' aria-live='polite'></div>
					</form>
					<Form method='post'>
						<button type='submit'>New</button>
					</Form>
				</div>
				<nav>
					{contacts.length ? (
						<ul>
							{contacts.map((contact: ContactType) => (
								<li key={contact.id}>
									<Link
										to={`contacts/${contact.id}`}
									>
										{contact.first ||
										contact.last ? (
											<>
												{contact.first}{' '}
												{contact.last}
											</>
										) : (
											<i>No Name</i>
										)}{' '}
										{contact.favorite && (
											<span>★</span>
										)}
									</Link>
								</li>
							))}
						</ul>
					) : (
						<p>
							<i>No contacts</i>
						</p>
					)}
				</nav>
			</div>
			<div id='detail'>
				<Outlet />
			</div>
		</>
	);
}
