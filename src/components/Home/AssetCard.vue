<template lang="html">
  <div
    class="mr-6 bg-bg p-2 flex flex-col items-start w-full rounded-[11px] font-garamond h-full"
  >
    <div class="w-full h-[40%]">
      <img
        v-if="imgUrl"
        :src="imgUrl"
        alt="asset image"
        class="w-full h-full rounded-lg"
      />
    </div>
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

      <button
        @click="createOrder"
        class="py-1 px-4 rounded-[11px] bg-accent flex-shrink-0"
      >
        Order
      </button>
    </div>
  </div>
</template>
<script lang="js">
import { endPoints } from '@/constants/apiEndpoints';
import store from '@/store';
import { deployOrderManagerContract } from '@/utils/contractInteraction';
import axios from 'axios';


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
    assetId: String,
    sellerId: String,
    sellerWalletAddress: String,
    imgUrl: String,
  },
  data() {
    return {};
  },
  components: {
  },
  methods: {
    async createOrder(){
      try {
        const payload = {
          sellerId: this.$props.sellerId,
          buyerId: store.getters.getUserId,
          assetId: this.$props.assetId,
        };

        // Replace 'yourBearerToken' with the actual bearer token
        const token = store.getters.getToken;

        const response = await axios.post(`${endPoints.ordersUrl}/orders`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 201) {
          alert('Order created successfully');
        } else {
          alert('Order not created!');
        }
      } catch (error) {
        // Check if the error is from the server response
        if (error.response && error.response.status === 409) {
          alert('Order already exists');
        } else {
          console.error('Error creating order:', error);
          alert('Order not created!');
        }
      }

    }
  }
};
</script>
