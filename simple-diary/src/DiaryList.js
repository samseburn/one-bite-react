import DiaryItem from './DiaryItem';

const DiaryList = props => {
	const { diaryList, onRemove, onEdit } = props;

	return (
		<div className="DiaryList">
			<h1>일기 리스트</h1>
			<h4>{diaryList.length}개의 일기가 있습니다.</h4>
			<div>
				{diaryList.map(item => (
					<DiaryItem
						key={item.id}
						{...item}
						onRemove={onRemove}
						onEdit={onEdit}
					/>
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
