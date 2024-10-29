<template>
	<div class="workDialog">
		<div class="flex-between">
			<span
				>当前忠诚度: {{ info?.loyalty }}
				<span v-if="checkWorkInfo" class="warn">
					({{ checkWorkInfo?.effectLoyalty > 0 ? '+' : ''
					}}{{ checkWorkInfo?.effectLoyalty * Number(workTime || 0) }})
				</span>
			</span>
			<div>
				<span>工作时间: </span>
				<el-select v-model="workTime" placeholder="Select" style="width: 80px">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</div>
		</div>
		<div class="works">
			<div class="work" v-for="work in works" :key="work.id" @click="handleCheckedWork(work)">
				<!-- 遮罩 -->
				<div class="mask flex-center">雇佣3次后解锁</div>
				<div class="work-name">{{ work.name }}</div>
				<div class="work-loyalty">
					<span>
						忠诚: {{ work.effectLoyalty > 0 ? '+' : ''
						}}{{ work.effectLoyalty * Number(workTime || 0) }}</span
					>
					<span
						>奖励: {{ work.reward * Number(workTime || 0) }}
						<img src="@/assets/svg/Coin.svg" class="coin" />
					</span>
				</div>
			</div>
		</div>
		<div class="expected" v-if="checkWorkInfo">
			<div>预期收益</div>
			<div
				v-if="info?.loyalty + checkWorkInfo?.effectLoyalty * Number(workTime || 0) >= 50"
				class="nomal flex-center"
			>
				<img src="@/assets/svg/Coin.svg" class="coin" />
				<span>{{ expectedReward }}</span>
			</div>
			<div v-else class="danger">
				<span>忠诚度低于50，员工将会叛逃，无法获得收益</span>
			</div>
		</div>
		<el-button type="primary" class="btn" @click="handleConfirm">确认</el-button>
	</div>
</template>

<script setup lang="ts">
import { INFTInfo, IWorkEventInfo } from '@/types/customType';
import { ElMessage } from 'element-plus';

defineProps({
	info: {
		type: Object as PropType<INFTInfo>,
		required: true
	}
});
const workTime = ref('1');
const options = ref([
	{
		value: '1',
		label: '1h'
	},
	{
		value: '2',
		label: '2h'
	},
	{
		value: '3',
		label: '3h'
	},
	{
		value: '4',
		label: '4h'
	}
]);
const works = ref<IWorkEventInfo[]>([
	{
		id: 1,
		name: 'Picking up trash', // 捡垃圾
		effectLoyalty: -5,
		unlock: 0,
		reward: 10,
		maxHours: 4,
		extraBonus: 0
	},
	{
		id: 2,
		name: 'Dig Coal', // 挖矿
		effectLoyalty: -8,
		unlock: 1,
		reward: 15,
		maxHours: 4,
		extraBonus: 15
	},
	{
		id: 3,
		name: 'Tutoring', // 家教
		effectLoyalty: -8,
		unlock: 2,
		reward: 20,
		maxHours: 4,
		extraBonus: 20
	},
	{
		id: 4,
		name: 'Singing', //卖唱
		effectLoyalty: -10,
		unlock: 3,
		reward: 30,
		maxHours: 4,
		extraBonus: 30
	},
	{
		id: 5,
		name: 'Nanny', // 保姆
		effectLoyalty: -8,
		unlock: 4,
		reward: 40,
		maxHours: 4,
		extraBonus: 40
	},
	{
		id: 6,
		name: 'Hawker', // 小摊贩
		effectLoyalty: -10,
		unlock: 5,
		reward: 50,
		maxHours: 4,
		extraBonus: 50
	},
	{
		id: 7,
		name: 'Streaking', // 裸奔
		effectLoyalty: -12,
		unlock: 6,
		reward: 80,
		maxHours: 4,
		extraBonus: 80
	},
	{
		id: 8,
		name: 'Study', // 学习
		effectLoyalty: 5,
		unlock: 7,
		reward: 40,
		maxHours: 8,
		extraBonus: 40
	}
]);
const checkWorkInfo = ref<IWorkEventInfo>();
const expectedReward = computed(() => {
	if (!checkWorkInfo.value) {
		return 0;
	}
	const _count = checkWorkInfo.value.reward * Number(workTime.value || 0);
	return Number(workTime.value || 0) == 4 ? _count + checkWorkInfo.value.extraBonus : _count;
});
const handleCheckedWork = (_info: IWorkEventInfo) => {
	checkWorkInfo.value = _info;
};
const handleConfirm = async () => {
	if (!checkWorkInfo.value) {
		ElMessage({
			type: 'error',
			message: '请选择工作'
		});
		return;
	}
};
</script>

<style scoped lang="scss">
.workDialog {
	color: #333;

	.warn {
		color: var(--danger-hover);
	}

	.works {
		display: grid;
		margin-top: 5px;
		gap: 10px;
		grid-template-columns: repeat(2, 1fr);

		.work {
			position: relative;
			padding: 6px;
			border: 1px solid #333;
			border-radius: 5px;
			cursor: pointer;

			&:hover {
				color: var(--purple);
				border-color: var(--purple);
			}

			&.active {
				color: var(--purple);
				border-color: var(--purple);
			}

			.mask {
				position: absolute;
				top: 0;
				left: 0;
				z-index: 10;
				width: 100%;
				height: 100%;
				color: #fff;
				background: rgb(0 0 0 / 50%);
			}

			.work-name {
				font-size: 14px;
			}

			.work-loyalty {
				display: grid;
				margin-top: 5px;
				font-size: 12px;
				gap: 5px;
				grid-template-columns: repeat(2, 1fr);

				span {
					display: flex;
					gap: 5px;
					align-items: center;

					.coin {
						display: block;
						width: 16px;
					}
				}
			}
		}
	}

	.expected {
		margin-top: 10px;
		font-size: 14px;
		font-weight: 600;

		span {
			color: var(--purple);
		}

		.coin {
			width: 20px;
		}
	}

	.btn {
		margin-top: 10px;
		width: 100%;
	}
}
</style>
