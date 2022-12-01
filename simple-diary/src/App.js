import { useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

function App() {
	// 일기 데이터 저장할 빈 배열 생성
	const [data, setData] = useState([]);

	const dataId = useRef(0);

	const onCreate = (author, content, emotion) => {
		const created_date = new Date().getTime();
		const newItem = {
			author,
			content,
			emotion,
			created_date,
			id: dataId.current,
		};
		dataId.current += 1;
		setData([newItem, ...data]); // 최신순 배치
	};

	const onDelete = targetId => {
		console.log(`${targetId}가 삭제되었습니다.`);
		const newDirayList = data.filter(item => item.id !== targetId);
		setData(newDirayList);
	}; // targetId --> DirayItem에서 id

	return (
		<div className="App">
			<DiaryEditor onCreate={onCreate} />
			<DiaryList diaryList={data} onDelete={onDelete} />
		</div>
	);
}

export default App;
