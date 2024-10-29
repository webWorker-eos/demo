<template>
	<div class="playPage">
		<!-- 我的NFT信息 -->
		<MyNFT />
		<!-- 我的员工 -->
		<MyEmploy />
		<!-- NFT雇佣市场 -->
		<EmployMarket />
	</div>
</template>

<script setup lang="ts">
import MyNFT from './comp/MyNFT.vue';
import MyEmploy from './comp/MyEmploy.vue';
import EmployMarket from './comp/EmployMarket.vue';
</script>

<style scoped lang="scss">
.playPage {
	position: relative;
}
</style>
