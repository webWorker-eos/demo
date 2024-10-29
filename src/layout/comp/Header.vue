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
				<!-- <span class="nav" @click="$router.push('/about')">About</span> -->
			</div>
		</div>
		<div>
			<el-button type="primary" class="btn">链接钱包</el-button>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
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

	.btn {
		height: 40px;
		background: var(--purple);
	}
}
</style>
