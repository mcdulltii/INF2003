<template>
  <div>
      <card style="height: 60px; margin-bottom:25px">
          <div class="row" style="margin-left: 30%">
            <img
            class="avatar border-white"
            src="@/assets/img/faces/face-2.jpg"
            alt="..."
            style="transform: scale(0.65);margin-top: calc((0.5 - 1) * 30px);margin-bottom: calc((0.5 - 1) * 20px);"
          />
          <router-link :to="{ path: '/createpost' }">
            <textarea style="width: 150%">Create Post</textarea>
          </router-link>
          </div>
        </card>
        <router-link v-for="item in items" :to="{ path: '/indivpost' }" :key="item.post_id">
        <Post-Card v-bind="item"></Post-Card>
        </router-link>
    </div>
</template>
<script>
  import axios from 'axios';
  import PostCard from "./Posts/PostCard.vue";
  export default {
    data () {
      return {
        items: []
      }
    },
    mounted () {
      axios.get('/posts/0')
        .then(response => {
          if(response.status = 200) {
            this.items = response.data;
          }
        })
        .catch(error => {
            console.log(error);
        });
    },
    components: {
      PostCard,
    },
  };
  </script>