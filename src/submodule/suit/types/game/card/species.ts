export const species = [
	'ウィルス',
	'ドラゴン',
	'不死',
	'侍',
	'四聖獣',
	'天使',
	'巨人',
	'忍者',
	'悪魔',
	'戦士',
	'昆虫',
	'機械',
	'武身',
	'海洋',
	'獣',
	'珍獣',
	'盗賊',
	'神',
	'神獣',
	'精霊',
	'舞姫',
	'英雄',
	'道化師',
	'魔導士',
] as const

// Union型として抽出
export type Species = (typeof species)[number];
