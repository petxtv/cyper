export const getDateFormat = timeDate => {
	const date = `${
		timeDate.getMonth() + 1
	}/${timeDate.getDate()}/${timeDate.getFullYear()}`;
	const time = `${
		timeDate.getHours() < 10
			? `0${timeDate.getHours()}`
			: timeDate.getHours()
	}:${
		timeDate.getMinutes() < 10
			? `0${timeDate.getMinutes()}`
			: timeDate.getMinutes()
	}:${
		timeDate.getSeconds() < 10
			? `0${timeDate.getSeconds()}`
			: timeDate.getSeconds()
	}`;

	return `${date} ${time}`;
};
