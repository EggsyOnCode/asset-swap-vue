<template lang="html">
  <div
    class="mr-6 bg-bg p-2 flex flex-col items-start w-full rounded-[11px] font-garamond h-full"
  >
    <img
      src="../Home/../../assets/wallpaper.jpg"
      alt="free-img-api"
      class="h-[100px] w-full rounded-[11px] bg-primary"
    />
    <TextComponentVue :text="name" />
    <TextComponentVue :text="supplier" />
    <div class="flex flex-row justify-between items-start w-full">
      <v-chip elevated color="black" theme="light" class="bg-accent rounded-xl">
        <v-icon icon="mdi-cash"></v-icon>
        {{ price }}
      </v-chip>

      <button class="py-1 px-4 rounded-[11px] bg-accent flex-shrink-0">
        Order
      </button>
    </div>
  </div>
</template>
<script lang="js">
import TextComponentVue from "./TextComponent.vue";
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    price: {
      type: String,
      default: "",
    },
    supplier: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  components: {
    TextComponentVue,
  },
};
</script>
