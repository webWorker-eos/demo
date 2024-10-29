import { MockMethod } from 'vite-plugin-mock';

export default [
	{
		url: '/mock/api/test',
		method: 'get',
		response: () => {
			return {
				code: 200,
				message: 'This is mock api test',
				data: {
					token: '123'
				}
			};
		}
	},
	{
		url: '/mock/api/connectWallet',
		method: 'get',
		response: () => {
			return {
				code: 200,
				message: 'Success',
				data: {
					name: 'testusername'
				}
			};
		}
	},
	{
		url: '/mock/api/getBalanceUSDT',
		method: 'get',
		response: () => {
			return {
				code: 200,
				message: 'Success',
				data: {
					balance: '10000'
				}
			};
		}
	},
	{
		url: '/mock/api/getBalanceCoin',
		method: 'get',
		response: () => {
			return {
				code: 200,
				message: 'Success',
				data: {
					balance: '500'
				}
			};
		}
	}
] as MockMethod[];
