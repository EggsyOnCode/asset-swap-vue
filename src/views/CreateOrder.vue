<template lang="html">
  <div class="min-h-screen bg-bg flex h-[100vh]">
    <div
      class="mx-[25%] p-10 flex flex-col items-start justify-start h-full w-full"
    >
      <h1 class="text-3xl font-semibold pb-6">~Advertise An Asset~</h1>
      <hr class="border-black w-full border-r-2" />
      <div
        class="bg-secondary w-full my-4 h-[30%] rounded-lg flex flex-col items-center justify-center"
      >
        <button class="py-1 px-4 rounded-[11px] bg-accent flex-shrink-0">
          Add An Image
        </button>
      </div>
      <input
        type="text"
        class="bg-accent w-full rounded-lg h-[5%] p-1.5 mb-4 text-black"
        placeholder="Asset Name"
      />
      <input
        type="number"
        class="bg-accent w-full rounded-lg h-[5%] p-1.5 mb-4 text-black"
        placeholder="Asset Price"
      />
      <h1 class="text-xl font-normal pb-6 mt-3">~Asset Specs~</h1>
      <input
        type="text"
        class="bg-accent w-full rounded-lg h-[5%] p-1.5 mb-4 text-black"
        placeholder="Mileage"
      />
      <input
        type="text"
        class="bg-accent w-full rounded-lg h-[5%] p-1.5 mb-4 text-black"
        placeholder="Location of Buyer"
      />
      <input
        type="text"
        class="bg-accent w-full rounded-lg h-[5%] p-1.5 mb-4 text-black"
        placeholder="Registered At"
      />
      <input
        type="text"
        class="bg-accent w-full rounded-lg h-[5%] p-1.5 mb-4 text-black"
        placeholder="Manufacturing Date"
      />
      <div class="w-full h-full flex flex-col justify-center flex-1">
        <div
          class="order-btn flex align-middle justify-center bg-green p-3 rounded-lg text-black font-bold text-2xl hover:cursor-pointer mt-4"
        >
          Create Order
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {};
</script>
<style lang=""></style>
