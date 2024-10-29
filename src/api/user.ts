import { useTestDataStore } from '@/store/testDara';

const testData = useTestDataStore();
export const connectWallet = async () => {
	return {
		name: 'testusername'
	};
};

export const getBalanceCoin = async () => {
	const _localCoin = testData.coin || 0;
	return {
		balance: _localCoin
	};
};

export const getBalanceUSDT = async () => {
	const _localUSDT = testData.usdt || 1000;
	return {
		balance: _localUSDT
	};
};

export const getUserNfts = async () => {
	const _localNfts = testData.nfts || [];
	return {
		nfts: _localNfts
	};
};
// 购买新手礼包
export const buyNewbiePack = async (_info: any) => {
	testData.reduceUsdtBalance(10);
	testData.addCoinBalance(500);
};
