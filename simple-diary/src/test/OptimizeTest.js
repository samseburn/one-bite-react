import React, { useState, useEffect } from 'react';

// state count를 props로 사용하는 자식 컴포넌트
const CounterA = React.memo(({ count }) => {
	useEffect(() => {
		console.log(`Counter A Update :: count : ${count}`);
	});
	return <div>{count}</div>;
});

// state obj를 props로 사용하는 자식 컴포넌트
// 자바스크립트에서 객체는 얕은 비교를 하기 때문에 리렌더링 일어남
const CounterB = ({ obj }) => {
	useEffect(() => {
		console.log(`Counter B Update :: count : ${obj.count} `);
	});
	return <div>{obj.count}</div>;
};

// 비교함수 areEqual
const areEqual = (prevProps, nextProps) => {
	return prevProps.obj.count === nextProps.obj.count;
};

const MemoizedCounterB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {
	const [count, setCount] = useState(1);
	const [obj, setObj] = useState({
		count: 1,
	});

	return (
		<div style={{ padding: 50 }}>
			<div>
				<h2>Counter A</h2>
				<CounterA count={count} />
				<button onClick={() => setCount(count)}>A Button</button>
			</div>
			<div>
				<h2>Counter B</h2>
				<MemoizedCounterB obj={obj} />
				<button onClick={() => setObj({ count: obj.count })}>B Button</button>
			</div>
		</div>
	);
};

export default OptimizeTest;
