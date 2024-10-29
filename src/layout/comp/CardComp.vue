<template>
	<div class="card-comp">
		<div class="card-status flex-center" :class="{ work: info?.status === 1, rest: info?.status === 2 }">
			<span v-if="info?.status === 0">待业中</span>
			<span v-else-if="info?.status === 1">工作中</span>
			<span v-else-if="info?.status === 2">休息中</span>
		</div>
		<div class="card-img">
			<!-- 随机图片 -->
			<img :src="`https://picsum.photos/300/300?random=${info?.id}`" />
		</div>
		<div class="card-info">
			<div class="name">#{{ info?.id }} {{ info?.name }}</div>
			<div class="infos flex-between">
				<div class="info">
					<img src="@/assets/svg/Coin.svg" class="coin" />
					<span>{{ info?.coin }}</span>
				</div>
				<div class="info" v-if="compType === 'employed'">
					<img src="@/assets/svg/Loyalty.svg" class="coin" />
					<span>{{ info?.loyalty }}</span>
				</div>
			</div>
		</div>
		<div class="card-tool flex-center" v-if="compType !== 'employed'">
			<el-button type="danger" v-if="compType === 'my'" class="btn" @click="handleComing">卖出NFT</el-button>
			<el-button type="primary" class="btn" v-if="compType === 'employMarket'">雇佣</el-button>
			<el-button type="success" class="btn" v-if="compType === 'nftMarket'">购买</el-button>
		</div>
		<div class="card-tool flex-center employed" v-else>
			<el-button type="danger" class="btn">折磨</el-button>
			<el-button type="primary" class="btn" @click="handleShowWorkDialog">工作</el-button>
			<el-button type="success" class="btn">安抚</el-button>
		</div>
	</div>

	<el-dialog v-model="showWorkDialog" title="派 TA 去" width="500" center :close-on-click-modal="false">
		<WorkDialog :info="info" />
	</el-dialog>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import WorkDialog from '@/views/play/dialog/WorkDialog.vue';
import { INFTInfo } from '@/types/customType';
const props = defineProps({
	info: {
		type: Object as PropType<INFTInfo>,
		required: true
	},
	compType: {
		type: String,
		required: true,
		default: 'my' // my | employed | employMrket | nftMarket
	}
});
defineExpose({
	info: props.info
});

const showWorkDialog = ref(false);
const handleShowWorkDialog = () => {
	showWorkDialog.value = true;
};

const handleComing = () => {
	ElMessage({
		message: '即将开放，敬请期待',
		type: 'info',
		plain: true
	});
};
</script>

<style scoped lang="scss">
.card-comp {
	position: relative;
	overflow: hidden;
	width: 180px;
	height: 250px;
	background-color: #fff;
	border-radius: 10px;
	box-shadow: 0 2px 4px -1px rgb(57 76 96 / 15%);

	&:hover {
		.card-img {
			img {
				transform: scale(1.1);
			}
		}

		.card-tool {
			transform: translateY(-30px);
			box-shadow: 0 2px 4px 1px rgb(57 76 96 / 35%);
		}
	}

	.card-status {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 5;
		width: 50px;
		height: 50px;
		background: linear-gradient(to top right, #0000 50%, gray 50%);

		&.work {
			background: linear-gradient(to top right, #0000 50%, #e6a23c 50%);
		}

		&.rest {
			background: linear-gradient(to top right, #0000 50%, #67c23a 50%);
		}

		span {
			display: block;
			margin-bottom: 10px;
			font-size: 14px;
			white-space: nowrap;
			color: #000;
			transform: rotate(45deg) translateY(-8px) scale(0.7);
		}
	}

	.card-img {
		position: relative;
		overflow: hidden;
		width: 100%;
		max-height: 300px;
		object-fit: contain;

		img {
			display: block;
			width: 100%;
			height: 100%;
			max-height: 300px;
			transition: all 0.3s;
			aspect-ratio: 1/1;
		}
	}

	.card-info {
		padding: 10px;

		.name {
			margin-bottom: 5px;
			font-size: 16px;
			font-weight: 700;

			@include ellipsis();
		}

		.infos {
			// display: grid;
			// grid-template-columns: 1fr 1fr;
			// gap: 5px;
			.info {
				display: flex;
				align-items: center;
				padding-bottom: 3px;
				font-size: 14px;

				@include ellipsis();

				.coin {
					margin-right: 5px;
					width: 16px;
				}
			}
		}
	}

	.card-tool {
		// padding: 3px 0;
		background: #fff;
		transition: all 0.3s;

		&.employed {
			.btn {
				margin-left: 0;
			}
		}

		.btn {
			width: 100%;
			border-radius: 0;
		}
	}
}
</style>
