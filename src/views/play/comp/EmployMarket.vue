<template>
	<div class="my-nft">
		<div class="title flex-between" :class="{ stickyed: isSticky }" ref="Title">
			<span class="underline">人才市场</span>
			<div class="tools">
				<el-input
					v-model="search"
					class="search-input"
					clearable
					placeholder="Search..."
					:prefix-icon="Search"
					round
				/>
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
		</div>
		<div class="content" :class="{ show: showNft }">
			<CardComp v-for="(info, i) in filterList" :key="i" :info="info" :comp-type="'employMarket'" />
		</div>
		<EmptyComp v-if="filterList.length === 0" />
	</div>
</template>

<script setup lang="ts">
import { isElementInViewport } from '@/utils/common';
import CardComp from '@/layout/comp/CardComp.vue';
import EmptyComp from '@/layout/comp/EmptyComp.vue';
import { ArrowDown, ArrowUp, Search } from '@element-plus/icons-vue';
import { INFTInfo } from '@/types/customType';
const showNft = ref(false);
const search = ref('');

const nftList = ref<INFTInfo[]>([
	...new Array(100).fill({}).map(
		(_, i) =>
			({
				id: i,
				name: 'NFT' + i,
				coin: Math.floor(Math.random() * 100) + 300,
				desc: '',
				status: Math.floor(Math.random() * 3),
				image: '',
				loyalty: Math.floor(Math.random() * 40) + 60
			}) as INFTInfo
	)
]);

const isSticky = ref(false);
const Title = ref<HTMLElement>();
const listenElement = () => {
	if (isElementInViewport(Title.value!, 95)) {
		isSticky.value = true;
	} else {
		isSticky.value = false;
	}
};
// 根据 ID、name 筛选
const filterList = computed(() => {
	if (!search.value) return nftList.value;

	// 深拷贝数据
	const nftListCopy = JSON.parse(JSON.stringify(nftList.value));
	// 先根据ID查询所有包含 search 的数据
	return nftListCopy.filter((item) => {
		return (
			item.id.toString().includes(search.value) || item.name.toLowerCase().includes(search.value.toLowerCase())
		);
	});
});

onMounted(() => {
	// 监听滚动
	window.addEventListener('scroll', listenElement, true);
});
onBeforeUnmount(() => {
	window.removeEventListener('scroll', listenElement, true);
});
</script>

<style scoped lang="scss">
.my-nft {
	position: relative;
	margin-bottom: 20px;

	.title {
		position: sticky;
		top: 0;
		z-index: 10;
		padding-bottom: 10px;
		font-size: 20px;
		backdrop-filter: blur(10px);
		font-weight: 700;

		&.stickyed {
			// 渐变
			background: linear-gradient(to bottom, #25a0bf, #2da4c2);
		}

		.underline {
			color: #a63;
			border-bottom: 1px solid #a63;
		}

		.tools {
			display: flex;
			gap: 10px;
			align-items: center;

			.search-input {
				width: 200px;

				@include responseTo(mobile) {
					width: 100px;
				}
			}
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
