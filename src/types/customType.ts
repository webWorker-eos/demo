export interface INFTInfo {
	id: number;
	name: string;
	desc: string;
	coin: number;
	status: number;
	image: string;
	loyalty: number;
}

export interface IWorkEventInfo {
	id: number;
	name: string;
	effectLoyalty: number;
	unlock: number;
	reward: number;
	maxHours: number;
	extraBonus: number;
}
export interface ITormentEventInfo {
	id: number;
	name: string;
	effectLoyalty: number;
	unlock: number;
	reward: number;
	incrMktValue: number;
	reduceMktValue: number;
}
export interface IAppeaseEventInfo {
	id: number;
	name: string;
	effectLoyalty: number;
	unlock: number;
}
