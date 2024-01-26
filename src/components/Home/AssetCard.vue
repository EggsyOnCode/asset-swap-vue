<template lang="html">
  <div
    class="mr-6 bg-bg p-2 flex flex-col items-start w-full rounded-[11px] font-garamond h-full"
  >
    <img
      src="../Home/../../assets/wallpaper.jpg"
      alt="free-img-api"
      class="h-[100px] w-full rounded-[11px] bg-primary"
    />
    <h1 class="font-bold text-2xl">{{ model }}</h1>
    <div class="card-item">
      <strong>Manufacturing Date:</strong> {{ manufacturingDate }}
    </div>
    <div class="card-item">
      <strong>Engine Power:</strong> {{ enginePower }}
    </div>
    <div class="card-item"><strong>Mileage:</strong> {{ mileage }}</div>
    <div class="card-item"><strong>Location:</strong> {{ location }}</div>
    <div class="card-item"><strong>Seller:</strong> {{ seller }}</div>
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
    mileage: Number,
    location: String,
    //Manufacturing Date
    manufacturingDate: String,
  },
  data() {
    return {};
  },
  components: {
  },
};
</script>
