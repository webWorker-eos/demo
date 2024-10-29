<template>
	<div class="my-nft">
		<div class="title flex-between">
			<span class="underline">我的NFT</span>
			<div class="tool" @click="showNft = !showNft">
				<span class="flex-center" v-if="!showNft">
					折叠
					<el-icon><ArrowUp /></el-icon>
				</span>
				<span class="flex-center" v-else>
					展开
					<el-icon><ArrowDown /></el-icon>
				</span>
			</div>
		</div>
		<div class="content" :class="{ show: showNft }">
			<CardComp v-for="(info, i) in nftList" :key="i" :info="info" :comp-type="'my'" />
		</div>
		<EmptyComp v-if="nftList.length === 0" />
	</div>
</template>

<script setup lang="ts">
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue';
import CardComp from '@/layout/comp/CardComp.vue';
import EmptyComp from '@/layout/comp/EmptyComp.vue';
import { INFTInfo } from '@/types/customType';
const showNft = ref(true);
const nftList = ref<INFTInfo[]>([
	...new Array(10).fill({}).map(
		(_, i) =>
			({
				id: i + 0,
				name: 'NFT' + (i + 0),
				coin: Math.floor(Math.random() * 100) + 300,
				desc: '',
				status: Math.floor(Math.random() * 3),
				image: '',
				loyalty: Math.floor(Math.random() * 40) + 60
			}) as INFTInfo
	)
]);
</script>

<style scoped lang="scss">
.my-nft {
	margin-bottom: 20px;

	.title {
		margin-bottom: 10px;
		font-size: 20px;
		font-weight: 700;

		.underline {
			color: #a63;
			border-bottom: 1px solid #a63;
		}

		.tool {
			font-size: 14px;
			color: var(--purple);
			font-weight: normal;
			cursor: pointer;
		}
	}

	.content {
		display: grid;
		gap: 20px;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));

		@include responseTo(mobile) {
			gap: 10px;
		}

		&.show {
			overflow: hidden;
			max-height: 250px;
		}
	}
}
</style>
