import React, { useEffect, useState } from 'react';

const UnmountTest = () => {
	useEffect(() => {
		console.log('Mount!');

		return () => {
			// Unmount 시점에 실행
			console.log('Unmount!');
		};
	}, []);
};

const Lifecycle = () => {
	// const [count, setCount] = useState(0);
	// const [text, setText] = useState('');

	const [isVisible, setIsVisible] = useState(false);
	const toggle = () => setIsVisible(!isVisible);

	// useEffect(() => {
	// 	console.log('Mount!'); // component가 마운트를 시작한 시점에 콘솔에 Mount! 출력
	// }, []); // dependency array에 빈 배열 전달

	// useEffect(() => {
	// 	console.log('Update!');
	// }); // dependency array에 아무것도 전달하지 않음

	// useEffect(() => {
	// 	console.log(`count is update: ${count}`);
	// 	if (count > 5) {
	// 		alert('count가 5를 넘었습니다. 따라서 1로 초기화합니다');
	// 		setCount(1);
	// 	}
	// }, [count]);

	// useEffect(() => {
	// 	console.log(`text is update: ${text}`);
	// }, [text]);

	return (
		<div style={{ padding: 20 }}>
			{/* <div>
				{count}
				<button onClick={() => setCount(count + 1)}>+</button>
			</div>
			<div>
				<input value={text} onChange={e => setText(e.target.value)} />
			</div> */}
			<button onClick={toggle}>ON / OFF</button>
			{isVisible && <UnmountTest />}
		</div>
	);
};

export default Lifecycle;
