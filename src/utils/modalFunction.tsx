// 모달을 클릭했을 때는 모달이 닫히지 않도록
const handleModalLayoutClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  e.stopPropagation();
};

export { handleModalLayoutClick };
