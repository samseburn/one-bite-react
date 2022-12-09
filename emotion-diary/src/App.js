import React, { useReducer, useRef } from 'react';

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
			return (newState = [action.data, ...state]);
			break; // NOTE
		}
		case 'REMOVE': {
			return (newState = state.filter(item => item.id !== action.targetId));
			break; // NOTE
		}
		case 'EDIT': {
			return (newState = state.map(item =>
				item.id === action.data.id ? { ...action.data } : item,
			));
			break; // NOTE
		}
		default:
			return state;
	}
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
	{ id: 1, emotion: 1, content: '오늘의 일기 1번', date: 1670482354623 },
	{ id: 2, emotion: 2, content: '오늘의 일기 2번', date: 1670482354624 },
	{ id: 3, emotion: 3, content: '오늘의 일기 3번', date: 1670482354625 },
	{ id: 4, emotion: 4, content: '오늘의 일기 4번', date: 1670482354626 },
	{ id: 5, emotion: 5, content: '오늘의 일기 5번', date: 1670482354627 },
	{ id: 6, emotion: 2, content: '오늘의 일기 6번', date: 1570482354617 },
];

function App() {
	const [data, dispatch] = useReducer(reducer, dummyData);

	// console.log(new Date().getTime());

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
