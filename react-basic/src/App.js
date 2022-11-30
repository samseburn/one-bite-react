// import './App.css';

import Container from './Container';
import MyHeader from './MyHeader';
import MyFooter from './MyFooter';
import Counter from './Counter';

function App() {
	const counterProps = {
		a: 1,
		b: 2,
		c: 3,
		d: 4,
	};

	return (
		<Container>
			<div>
				<MyHeader />
				<Counter {...counterProps} />
				<MyFooter />
			</div>
		</Container>
	);
}

export default App;
