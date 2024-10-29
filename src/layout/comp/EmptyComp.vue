<template>
	<div class="empty">
		<img src="@/assets/svg/Empty.svg" class="empty-img" />
		<p>{{ str }}</p>
	</div>
</template>

<script setup lang="ts">
defineProps({
	str: {
		type: String,
		required: true,
		default: 'No Data'
	}
});
</script>

<style scoped lang="scss">
.empty {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	flex-direction: column;

	.empty-img {
		width: 200px;
		height: 200px;
	}

	p {
		font-size: 14px;
		color: #666;
	}
}
</style>
