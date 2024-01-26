<template lang="html">
  <div
    class="mr-6 bg-bg p-2 flex flex-col items-start w-full rounded-[11px] font-garamond h-full"
  >
    <img
      src="../Home/../../assets/wallpaper.jpg"
      alt="free-img-api"
      class="h-[100px] w-full rounded-[11px] bg-primary"
    />
    <h1>{{ model }}</h1>
    <h1>Manufacturing Date: {{ manDate }}</h1>
    <h1>Engine Power: {{ enginePower }}</h1>
    <h1>Mileage: {{ mileage }}</h1>
    <h1>Location: {{ location }}</h1>
    <div class="card-item"><strong>Seller:</strong> {{ seller }}</div>
    <v-chip elevated color="black" theme="light" class="bg-accent rounded-xl">
      <v-icon icon="mdi-cash"></v-icon>
      <h1 class="text-xl">{{ price }}</h1>
    </v-chip>
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
export default {
    props: {
    model: String,
    price: String,
    enginePower: String,
    seller: String,
    mileage: String,
    location: String,
    //Manufacturing Date
    manDate: String,
  },
  data() {
    return {};
  },
  components: {
  },
};
</script>
