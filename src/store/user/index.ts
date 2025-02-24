import { defineStore } from 'pinia';
import pinia from '@/store';
import { IUserState } from './types';

export const useUserStoreHook = defineStore({
	id: 'User', // 模块中使用的ID
	state: (): IUserState => ({
		name: 'webWorker',
		age: 18
	}),
	getters: {},
	actions: {
		// 用于更新store数据，可以是异步操作
		updateName(name: string) {
			this.name = name;
		}
	},
	persist: {
		// 开启本地存储
		key: 'user',
		storage: localStorage
	}
});

export function useUserStore() {
	return useUserStoreHook(pinia);
}
