function calcData() {
	let { data, cross, limitPercent } = store;
	cross.y = data[0].y * (100 + limitPercent) / 100;
	cross.x = calcCrossX(cross.y);
	data.push(cross);
	let tail = calcTail();
	data.push(tail);
	calcLimitLines(tail);
	calcPointLines();
}

function calcCrossX(y) {
	const { data, pointsCount } = store;
	const iLast = pointsCount - 1;
	const tgLast = getTg(data[iLast - 1], data[iLast]);
	if (tgLast <= 0) {
		return data[iLast].x * 1.01;
	}
	const dy = y - data[iLast].y;
	const dx = dy / tgLast;
	let x = (data[iLast].x + dx) / store.constant;
	// use constant, but no more than last z-point
	if (x < data[iLast].x) {
		x = data[iLast].x + (data[iLast].x / 100 / store.constant);
	}
	return x;
}

function calcTail() {
	const { data, cross } = store;
	const dy = (cross.y - data[0].y) * .1; // little more than cross.y
	const tgLast = getTg(data[store.pointsCount - 1], cross);
	if (tgLast > 0) {
		const dx = dy / tgLast;
		return { x: cross.x + dx, y: cross.y + dy };
	}
	return { x: cross.x, y: cross.y + dy };
}

function calcLimitLines(tail) {
	const { data, cross } = store;
	// to draw chart not from start of line
	const margintLeft10percent = (tail.x - data[0].x) * 0.1;
	const margintBottom10percent = (tail.y - data[0].y) * 0.1;
	store.limit = [
		{ x: data[0].x - margintLeft10percent, y: cross.y },
		{ x: tail.x, y: cross.y }];
	store.vline = [
		{ x: cross.x, y: data[0].y - margintBottom10percent },
		{ x: cross.x, y: tail.y }];
}

function calcPointLines() {
	for (let i = 0; i < store.pointsCount; i++) {
		store.pointLines[i] = calcPointLine(i);
	}
}

function calcPointLine(pi) {
	const { data, limit, vline } = store;
	const { x, y } = data[pi];
	return ([{ x: limit[0].x, y }, data[pi], { x, y: vline[0].y }]);
}

function getTg(p0, p1) {
	const dx = p1.x - p0.x;
	if (dx === 0) { return 0; } // error, actually
	return ((p1.y - p0.y) / dx);
}
