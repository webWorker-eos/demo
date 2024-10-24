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
	}
] as MockMethod[];
