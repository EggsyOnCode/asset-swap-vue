<template lang="html">
  <div class="min-h-screen bg-bg flex h-[100vh]">
    <div
      class="mx-[25%] p-10 flex flex-col items-start justify-start h-full w-full"
    >
      <h1 class="text-3xl font-semibold pb-6">~Create An Order~</h1>
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
        class="bg-accent w-full rounded-lg h-[5%] p-1.5 text-black"
        placeholder="Asset Name"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {};
</script>
<style lang=""></style>
