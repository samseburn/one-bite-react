import React, { useContext, useEffect, useRef, useState } from 'react';
import { DiaryDispatchContext } from './App';

const DiaryEditor = () => {
	const { onCreate } = useContext(DiaryDispatchContext);

	useEffect(() => {
		console.log('DiaryEditor 렌더');
	});

	const authorInput = useRef();
	const contentInput = useRef('');

	const [state, setState] = useState({
		author: '',
		content: '',
		emotion: 1,
	});

	// state 상태 값 변경
	const handleChangeState = e => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	// 현재 state 상태 출력
	const handleSubmit = e => {
		// console.log(state);

		if (state.author.length < 1) {
			authorInput.current.focus();
			return;
		}

		if (state.content.length < 5) {
			contentInput.current.focus();
			return;
		}

		onCreate(state.author, state.content, state.emotion);
		alert('저장 성공');

		// 일기를 정상적으로 저장했다면 setState 기본값 초기화
		setState({
			author: '',
			content: '',
			emotion: 1,
		});
	};

	return (
		<div className="DiaryEditor">
			<h2>오늘의 일기</h2>
			<div>
				<input
					ref={authorInput}
					name="author"
					type="text"
					value={state.author}
					onChange={handleChangeState}
				/>
			</div>
			<div>
				<textarea
					name="content"
					value={state.content}
					onChange={handleChangeState}
				/>
			</div>
			<div>
				<select
					ref={contentInput}
					name="emotion"
					value={state.emotion}
					onChange={handleChangeState}
				>
					<option value={1}>1</option>
					<option value={2}>2</option>
					<option value={3}>3</option>
					<option value={4}>4</option>
					<option value={5}>5</option>
				</select>
			</div>
			<div>
				<button onClick={handleSubmit}>일기 저장하기</button>
			</div>
		</div>
	);
};

export default React.memo(DiaryEditor);
