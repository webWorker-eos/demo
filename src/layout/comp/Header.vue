<template>
	<div class="flex-between">
		<div class="header">
			<div class="header-logo">
				<img src="@/assets/svg/Coin.svg" class="logo" />
				<span>虚拟人生</span>
			</div>
			<div class="navs">
				<span class="nav" @click="$router.push('/')">Home</span>
				<span class="nav" @click="$router.push('/play')">Play</span>
				<span class="nav" @click="$router.push('/nftMarket')">NFT-Market</span>
				<span class="nav" @click="$router.push('/miniGames')">Mini-Games</span>
			</div>
		</div>
		<div class="tools">
			<template v-if="userStore.name">
				<div class="coinBal">
					<img src="@/assets/svg/Coin.svg" class="coin" />
					<span>{{ userStore.coin }}</span>
				</div>
				<el-dropdown split-button type="primary" class="dropdown">
					{{ userStore.name }}
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item
								><div class="mobileNav" @click="$router.push('/')">Home</div></el-dropdown-item
							>
							<el-dropdown-item
								><div class="mobileNav" @click="$router.push('/play')">Play</div></el-dropdown-item
							>
							<el-dropdown-item
								><div class="mobileNav" @click="$router.push('/nftMarket')">
									NFT-Market
								</div></el-dropdown-item
							>
							<el-dropdown-item
								><div class="mobileNav" @click="$router.push('/miniGames')">
									Mini-Games
								</div></el-dropdown-item
							>
							<el-dropdown-item>
								<el-button type="danger" class="btn" @click="handleLogout">断开链接</el-button>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</template>
			<el-button v-else type="primary" class="btn" @click="handleLogin">链接钱包</el-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { connectWallet, getBalanceCoin } from '@/api/user';
import { useUserStoreHook } from '@/store/user';
const userStore = useUserStoreHook();
const handleLogin = async () => {
	const res = await connectWallet();
	userStore.updateName(res.name);
	handleGetBalanceCoin();
};
const handleGetBalanceCoin = async () => {
	const res = await getBalanceCoin();
	userStore.updateCoinBalance(res.balance);
};

const handleLogout = () => {
	userStore.updateInit();
};
</script>

<style scoped lang="scss">
.mobileNav {
	cursor: pointer;
	width: 100%;
	text-align: center;
}

.flex-between {
	padding: 18px 5%;
	width: 100%;
	font-size: 14px;
	color: #0d1216;
	background: linear-gradient(to bottom, #0d98ba, #229fbe);
	box-shadow: 0 2px 4px -1px rgb(57 76 96 / 15%);

	.header {
		display: flex;
		justify-content: flex-start;
		align-items: center;

		.header-logo {
			display: flex;
			align-items: center;
			font-size: 18px;
			font-weight: bold;

			.logo {
				margin-right: 5px;
				width: 25px;
				font-size: 25px;
			}
		}

		.navs {
			margin-left: 20px;

			@include responseTo(mobile) {
				display: none;
			}

			.nav {
				margin-right: 18px;
				cursor: pointer;

				&:hover {
					color: var(--purple);
					border-bottom: 1px solid var(--purple);
				}

				&.active {
					color: var(--purple);
					border-bottom: 1px solid var(--purple);
				}
			}
		}
	}

	.tools {
		display: flex;
		gap: 20px;

		.coinBal {
			display: flex;
			align-items: center;
			font-size: 17px;

			.coin {
				margin-right: 5px;
				width: 25px;
			}
		}

		.dropdown {
			:deep(.el-button) {
				height: 40px;
				background: var(--purple) !important;
			}
		}

		.btn {
			height: 40px;
			background: var(--purple);
		}
	}
}
</style>
