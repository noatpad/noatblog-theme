import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import NotFound from './pages/_404';
// import './style.scss';

export const App = () => (
	<LocationProvider>
		<Header />
		<main>
			<Router>
				<Route path='/' component={Home} />
				<Route default component={NotFound} />
			</Router>
		</main>
		<Footer />
	</LocationProvider>
);

render(<App />, document.getElementById('app'));
