type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];
function formatDate(
	date: string,
	dateStyle: DateStyle = 'medium',
	locales: string = 'zh-TW'
): string {
	const formatter = new Intl.DateTimeFormat(locales, { dateStyle });
	return formatter.format(new Date(date));
}

export { formatDate };
