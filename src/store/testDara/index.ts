import { defineStore } from 'pinia';
import pinia from '@/store';

export const useTestDataStoreHook = defineStore({
	id: 'TESTDATA', // 模块中使用的ID
	state: () => ({
		coin: 0,
		usdt: 10000,
		nfts: [],
		employed: []
	}),
	getters: {},
	actions: {
		// 用于更新store数据，可以是异步操作
		addUsdtBalance(usdt: number | string) {
			this.usdt += Number(usdt);
		},
		reduceUsdtBalance(usdt: number | string) {
			if (this.usdt - Number(usdt) < 0) {
				throw new Error('余额不足');
			}
			this.usdt -= Number(usdt);
		},
		addCoinBalance(coin: number | string) {
			this.coin += Number(coin);
		},
		reduceCoinBalance(coin: number | string) {
			if (this.coin - Number(coin) < 0) {
				throw new Error('余额不足');
			}
			this.coin -= Number(coin);
		},
		addNft(info: any) {}
	},
	persist: {
		// 开启本地存储
		key: 'TESTDATA',
		storage: localStorage
	}
});

export function useTestDataStore() {
	return useTestDataStoreHook(pinia);
}
