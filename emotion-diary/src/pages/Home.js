import React, { useContext, useEffect, useState } from 'react';
import { DiaryStateContext } from '../App';

// COMPONENTS
import MyHeader from '../components/MyHeader';
import MyButton from '../components/MyButton';
import DiaryList from '../components/DiaryList';

// HEADER
// Mount 되는 동시에 왼쪽 오른쪽 버튼 구현
//  1. 현재 시점 표시
//  2. 왼쪽 버튼 구현
//  3. 오른쪽 버튼 구현

const Home = () => {
	const diaryList = useContext(DiaryStateContext);
	const [data, setData] = useState([]);
	const [curDate, setCurDate] = useState(new Date());
	const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

	useEffect(() => {
		if (diaryList.length >= 1) {
			const firstDay = new Date(
				curDate.getFullYear(),
				curDate.getMonth(),
				1,
			).getTime();

			const lastDay = new Date(
				curDate.getFullYear(),
				curDate.getMonth() + 1,
				0,
			).getTime();

			setData(
				diaryList.filter(item => firstDay <= item.date && item.date <= lastDay),
			);
		}
	}, [diaryList, curDate]);
	// CHECK :: 필터 결과값 데이터 확인
	useEffect(() => {
		console.log(data);
	}, [data]);

	const increaseMonth = () => {
		setCurDate(
			new Date(
				curDate.getFullYear(),
				curDate.getMonth() + 1,
				curDate.getDate(),
			),
		);
	};

	const decreaseMonth = () => {
		setCurDate(
			new Date(
				curDate.getFullYear(),
				curDate.getMonth() - 1,
				curDate.getDate(),
			),
		);
	};

	return (
		<div>
			<MyHeader
				headText={headText}
				leftChild={<MyButton text={'<'} onClick={decreaseMonth} />}
				rightChild={<MyButton text={'>'} onClick={increaseMonth} />}
			/>
			<DiaryList diaryList={data} />
		</div>
	);
};

export default Home;
