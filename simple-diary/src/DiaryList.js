import React from 'react';

const DiaryList = props => {
	const { diaryList } = props;

	return (
		<div className="DiaryList">
			<h1>일기 리스트</h1>
			<h4>{diaryList.length}개의 일기가 있습니다.</h4>
			<div>
				{diaryList.map(item => (
					<div key={item.id}>
						<div>작성자: {item.author}</div>
						<div>일기: {item.content}</div>
						<div>감정 점수: {item.emotion}</div>
						<div>작성 시간(ms): {item.created_date}</div>
					</div>
				))}
			</div>
		</div>
	);
};

// undefined로 전달될 상황을 방지하기 위해
// 전달받을 값의 기본값 설정
DiaryList.defaultProps = {
	diaryList: [],
};

export default DiaryList;
