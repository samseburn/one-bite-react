import React, { useState, useEffect } from 'react';

const Textview = React.memo(({ text }) => {
	// React.memo -> text가 바뀔 때만 리렌더링
	useEffect(() => {
		console.log(`Update :: Text : ${text}`);
	});
	return <div>{text}</div>;
});

const Countview = React.memo(({ count }) => {
	// React.memo -> count가 바뀔 때만 리렌더링
	useEffect(() => {
		console.log(`Update :: Count : ${count}`);
	});
	return <div>{count}</div>;
});

// 컴포넌트를 재사용하는 실습용 컴포넌트
const OptimizeTest_1 = () => {
	const [count, setCount] = useState(1);
	const [text, setText] = useState('');

	return (
		<div style={{ padding: 50 }}>
			<div>
				<h2>Count</h2>
				<Countview count={count} />
				<button onClick={() => setCount(count + 1)}>1씩 증가</button>
			</div>
			<div>
				<h2>Text</h2>
				<Textview text={text} />
				<input value={text} onChange={e => setText(e.target.value)} />
			</div>
		</div>
	);
};

export default OptimizeTest_1;
