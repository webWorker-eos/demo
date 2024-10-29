export const isElementInViewport = (el: HTMLElement, top: number = 0) => {
	if (!el) return false;
	const topPosition = el.getBoundingClientRect().top;
	// 如果工具栏的顶部位置小于等于0，则表示它已到达视口顶部
	return topPosition <= top;
};
