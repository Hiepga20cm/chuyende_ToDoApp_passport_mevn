<template>
  <h3 v-if="user">Hello, {{ user.first_name }}</h3>
</template>

<script>
import axios from axios
export default {
  name: "Home",
  data(){
    return{
        user: null
    }
  },
  async created() {
        const response = await axios.get('user');

        this.user = response.data;
  },
};
</script>
