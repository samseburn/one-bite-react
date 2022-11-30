import React from 'react';
// 1. 본인이 관리하고 본인이 가진 state가 바뀔 때마다 re-render
// 2. 나에게 내려오는 props가 바뀔 때마다 re-render
// 3. 둘 다 아니여도 내 부모가 re-render 될 경우 re-render
const OddEvenResult = ({ count }) => {
	console.log(count);
	return <>{count % 2 === 0 ? '짝수' : '홀수'}</>;
};

export default OddEvenResult;
