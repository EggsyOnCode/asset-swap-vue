<template lang="html">
  <form @submit.prevent="submitForm">
    <div class="min-h-screen bg-bg flex h-[100vh]">
      <div
        class="mx-[25%] p-10 flex flex-col items-start justify-start h-full w-full"
      >
        <h1 class="text-3xl font-semibold pb-6">~Advertise An Asset~</h1>
        <hr class="border-black w-full border-r-2" />
        <div
          class="bg-secondary w-full my-4 h-[30%] rounded-lg flex flex-col items-center justify-center"
        >
          <img
            v-if="selectedImage"
            :src="selectedImageURL"
            alt="Selected Image"
            class="w-full h-full object-cover rounded-lg"
          />
          <!-- Replace button with input type="file" to upload an image -->
          <input
            v-if="imageSelected === false"
            type="file"
            accept="image/*"
            @change="handleImageUpload"
            class="hidden"
            ref="imageInput"
          />
          <button
            v-if="imageSelected === false"
            class="py-1 px-4 rounded-[11px] bg-accent flex-shrink-0"
            @click="$refs.imageInput.click()"
          >
            Add An Image
          </button>
        </div>
        <input
          type="text"
          v-model="formData.model"
          class="bg-accent w-full rounded-lg h-[7%] p-1.5 mb-4 text-black"
          placeholder="Asset Name"
        />
        <input
          type="number"
          v-model="formData.price"
          class="bg-accent w-full rounded-lg h-[7%] p-1.5 mb-4 text-black"
          placeholder="Asset Price"
        />
        <h1 class="text-xl font-normal pb-6 mt-3">~Asset Specs~</h1>
        <input
          type="text"
          v-model="formData.mileage"
          class="bg-accent w-full rounded-lg h-[7%] p-1.5 mb-4 text-black"
          placeholder="Mileage"
        />
        <input
          type="text"
          v-model="formData.location"
          class="bg-accent w-full rounded-lg h-[7%] p-1.5 mb-4 text-black"
          placeholder="Location of Exchange"
        />
        <input
          type="text"
          v-model="formData.registeredProvince"
          class="bg-accent w-full rounded-lg h-[7%] p-1.5 mb-4 text-black"
          placeholder="Registered At"
        />
        <input
          type="text"
          v-model="formData.manufacturingDate"
          class="bg-accent w-full rounded-lg h-[7%] p-1.5 mb-4 text-black"
          placeholder="Manufacturing Date"
        />
        <input
          type="text"
          v-model="formData.enginePower"
          class="bg-accent w-full rounded-lg h-[7%] p-1.5 mb-4 text-black"
          placeholder="Engine Power"
        />
        <div class="w-full h-full flex flex-col justify-center flex-1">
          <button
            type="submit"
            class="order-btn flex align-middle justify-center bg-green p-3 rounded-lg text-black font-bold text-2xl hover:cursor-pointer mt-4"
          >
            Create Order
          </button>
        </div>
      </div>
    </div>
  </form>
</template>
<script lang="js">
import { endPoints } from "@/constants/apiEndpoints";
import store from "@/store";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      formData: {
        model: "",
        price: "",
        mileage: "",
        location: "",
        registeredProvince: "",
        manufacturingDate: "",
        enginePower: "",
        // Add more fields for other asset details
      },
      selectedImage: null, // Store the selected image file
      selectedImageURL: null, // Store the URL of the selected image for display
      imageSelected: false
    };
  },
  computed: {
    user() {
      if (store.getters.getUsername == null) {
        return "Guest";
      } else {
        return store.getters.getUsername;
      }
    },
  },
  methods: {
    handleImageUpload(event ) {
      // Store the selected image file
      this.selectedImage = event.target.files[0];

      // Convert the selected image to a data URL
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedImage);
      reader.onload = () => {
        // Set the URL of the selected image for display
        this.selectedImageURL = reader.result;
      };
      this.imageSelected = true;
    },
    async submitForm() {
      if(this.user === "Guest") {
        alert("Please login to continue");
        return;
      }
      // Create a FormData object
      const formData = new FormData();

      // Check if an image is selected
      if (this.selectedImage) {
        // Append the selected image file
        formData.append("assetImage", this.selectedImage);
      }
      formData.append("model", this.formData.model);
      formData.append("price", this.formData.price);
      formData.append("mileage", this.formData.mileage);
      formData.append("location", this.formData.location);
      formData.append("registeredProvince", this.formData.registeredProvince);
      formData.append("manufacturingDate", this.formData.manufacturingDate);
      formData.append("enginePower", this.formData.enginePower);
      // Submit the form data to the backend
      // You can use axios or fetch to make the POST request
      // Example with axios
      const token = store.getters.getToken;
      await axios
        .post(`${endPoints.assets}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // Handle the response from the backend
          console.log("Response from backend:", response.data);
        })
        .catch((error) => {
          // Handle errors
          console.error("Error:", error);
        });
    },
  },
});
</script>
<style lang=""></style>
