import roundTo from 'round-to';

const padding = (value) => {
	if (Number.isNaN(value)) {
		return '-';
	}
	return roundTo(Number(value), 2).toPrecision(3);
};

const round = (value) => {
	return roundTo(value, 2);
};

export { padding, round };
