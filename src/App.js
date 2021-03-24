import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import {
	Home,
	About,
	Products,
	SingleProduct,
	Cart,
	Error,
	Checkout,
	PrivateRoute,
	AuthWrapper,
} from './pages';

function App() {
	return (
		// stop the app until authentication is done/loaded
		<AuthWrapper>
			<Router>
				<Navbar />
				<Sidebar />
				{/*  */}
				<Switch>
					<Route exact path='/'>
						<Home />
					</Route>
					{/*  */}
					<Route exact path='/about'>
						<About />
					</Route>
					{/*  */}
					<Route exact path='/cart'>
						<Cart />
					</Route>
					{/*  */}
					{/* prevent form accessing to secured route */}
					<PrivateRoute exact path='/checkout'>
						<Checkout />
					</PrivateRoute>
					{/*  */}
					<Route exact path='/products'>
						<Products />
					</Route>
					{/*  */}
					<Route exact path='/products/:id' children={<SingleProduct />} />
					{/*  */}
					<Route path='*'>
						<Error />
					</Route>
				</Switch>
				{/*  */}
				<Footer />
			</Router>
		</AuthWrapper>
	);
}

export default App;
