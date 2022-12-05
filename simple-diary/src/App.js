import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

// 복잡한 상태 변화 로직을 컴포넌트 밖으로 분리하기 위함이므로 밖에 작성
const reducer = (state, action) => {
	switch (action.type) {
		// getData -> 데이터 초기화 iniData -> initAction
		case 'INIT': {
			console.log('::INIT::');
			return action.data;
		}
		case 'CREATE': {
			const created_date = new Date().getTime();
			const newItem = { ...action.data, created_date };
			console.log('::UPDATE::');
			return [newItem, ...state];
		}
		case 'REMOVE': {
			console.log('::REMOVE::');
			return state.filter(item => item.id !== action.targetId);
		}
		case 'EDIT': {
			console.log('::EDIT::');
			return state.map(item =>
				item.id === action.targetId
					? { ...item, content: action.newContent }
					: item,
			);
		}
		default:
			return state;
	}
};

function App() {
	const [data, dispatch] = useReducer(reducer, []);
	const dataId = useRef(1);

	const getData = async () => {
		const res = await fetch(
			'https://jsonplaceholder.typicode.com/comments',
		).then(res => res.json());

		const initData = res.slice(0, 20).map(item => {
			return {
				author: item.email,
				content: item.body,
				emotion: Math.floor(Math.random() * 5) + 1,
				created_date: new Date().getTime() + 1,
				id: dataId.current++,
			};
		});

		dispatch({ type: 'INIT', data: initData });
	};

	useEffect(() => {
		getData();
	}, []);

	const onCreate = useCallback((author, content, emotion) => {
		dispatch({
			type: 'CREATE',
			data: { author, content, emotion, id: dataId.current },
		});

		dataId.current += 1;
	}, []);

	const onRemove = useCallback(targetId => {
		dispatch({ type: 'REMOVE', targetId });
	}, []); // targetId --> DirayItem에서 id

	// 수정
	const onEdit = useCallback((targetId, newContent) => {
		dispatch({ type: 'EDIT', targetId, newContent });
	}, []);

	// 감정 점수를 필터링하여 카운팅
	// useMemo를 사용하여 함수를 최적화하게 되며,
	// 함수는 더이상 함수가 아니고 값을 반환하게 됨 여기에서는 객체 {goodCout, badCount, goodRatio}
	const getDiaryAnalysis = useMemo(() => {
		if (data.length === 0) {
			return { goodcount: 0, badCount: 0, goodRatio: 0 };
		}
		// console.log('일기 분석 시작');

		// 3점을 기준으로 감정 점수 분류
		const goodCount = data.filter(item => item.emotion >= 3).length;
		const badCount = data.length - goodCount;

		// 좋은 감정 점수 비율 구하기
		const goodRatio = (goodCount / data.length) * 100;

		// 객체로 리턴
		return { goodCount, badCount, goodRatio };
	}, [data.length]); // 두번째 인자로 받은 값이 변화할 때만 첫 번째 인자로 받은 콜백함수가 실행 즉, 리렌더링 진행

	// 객체 비구조화 할당으로 지역 함수의 리턴값 변수에 저장
	// 함수가 아닌 값을 리턴받게 되므로 값으로 사용해야 함
	const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

	return (
		<div className="App">
			<DiaryEditor onCreate={onCreate} />
			<div>전체 일기 : {data.length}</div>
			<div>기분 좋은 일기 개수: {goodCount}</div>
			<div>기분 나쁜 일기 개수: {badCount}</div>
			<div>기분 좋은 일기 비율: {goodRatio}</div>
			<DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
		</div>
	);
}

export default App;
