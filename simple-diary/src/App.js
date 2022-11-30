import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const dummyList = [
	{
		id: 1,
		author: '장만옥..',
		content: '일기 1',
		emotion: 5,
		created_date: new Date().getTime(),
	},
	{
		id: 2,
		author: '웬디..',
		content: '일기 2',
		emotion: 4,
		created_date: new Date().getTime(),
	},
	{
		id: 3,
		author: '김태리..',
		content: '일기 3',
		emotion: 3,
		created_date: new Date().getTime(),
	},
	{
		id: 4,
		author: '탕웨이..',
		content: '일기 4',
		emotion: 2,
		created_date: new Date().getTime(),
	},
	{
		id: 5,
		author: '조이..',
		content: '일기 5',
		emotion: 1,
		created_date: new Date().getTime(),
	},
];

function App() {
	return (
		<div className="App">
			<DiaryEditor />
			<DiaryList diaryList={dummyList} />
		</div>
	);
}

export default App;
