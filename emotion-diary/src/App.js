import React, { useEffect, useReducer, useRef } from 'react';

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import RouteTest from './components/RouteTest';

// COMPONENTS
import MyButton from './components/MyButton';
import MyHeader from './components/MyHeader';

const reducer = (state, action) => {
	let newState = [];
	switch (action.type) {
		case 'INIT': {
			return action.data;
		}
		case 'CREATE': {
			// const newItem = { ...action.data };
			newState = [action.data, ...state];
			break; // NOTE
		}
		case 'REMOVE': {
			newState = state.filter(item => item.id !== action.targetId);
			break; // NOTE
		}
		case 'EDIT': {
			newState = state.map(item =>
				item.id === action.data.id ? { ...action.data } : item,
			);
			break; // NOTE
		}
		default:
			return state;
	}

	localStorage.setItem('diary', JSON.stringify(newState));
	return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
	const [data, dispatch] = useReducer(reducer, []);

	// console.log(new Date().getTime());

	useEffect(() => {
		const localData = localStorage.getItem('diary');
		if (localData) {
			const diaryList = JSON.parse(localData).sort(
				(a, b) => parseInt(b.id) - parseInt(a.id),
			);

			if (diaryList.length >= 1) {
				dataId.current = parseInt(diaryList[0].id) + 1;
			}

			console.log(diaryList);
			console.log(dataId);

			// diaryList를 App.js가 갖는 초기값 설정하기
			dispatch({ type: 'INIT', data: diaryList });
		}
	}, []);

	const dataId = useRef(0);

	// CREATE
	const onCreate = (date, content, emotion) => {
		dispatch({
			type: 'CREATE',
			data: {
				id: dataId.current,
				date: new Date(date).getTime(),
				content,
				emotion,
			},
		});
		dataId.current += 1;
	};

	// REMOVE
	const onRemove = targetId => {
		dispatch({
			type: 'REMOVE',
			targetId,
		});
	};

	// EDIT
	const onEdit = (targetId, date, content, emotion) => {
		dispatch({
			type: 'EDIT',
			data: {
				id: targetId,
				date: new Date(date).getTime(),
				content,
				emotion,
			},
		});
	};

	return (
		<DiaryStateContext.Provider value={data}>
			<DiaryDispatchContext.Provider value={{ onCreate, onRemove, onEdit }}>
				<BrowserRouter>
					<div className="App">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/new" element={<New />} />
							<Route path="/edit/:id" element={<Edit />} />
							<Route path="/diary/:id" element={<Diary />} />
						</Routes>
						{/* <RouteTest /> */}
					</div>
				</BrowserRouter>
			</DiaryDispatchContext.Provider>
		</DiaryStateContext.Provider>
	);
}

export default App;
