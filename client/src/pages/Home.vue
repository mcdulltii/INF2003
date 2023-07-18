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
        <router-link v-for="item in items" :to="{ path: '/indivpost/' + item.post_id }" :key="item.post_id">
        <Post-Card v-bind="item"></Post-Card>
        </router-link>
        <div class="pagination-wrapper">
            <paginate :page-count="pageCount" :click-handler="onPaginationClick" :prev-text="'Prev'" :next-text="'Next'"
                :container-class="'pagination'">
            </paginate>
        </div>
    </div>
</template>
<script>
  import Paginate from 'vuejs-paginate';
  import '@/assets/css/mongo-admin.css';
  import '@/assets/css/pagination.css';
  import axios from 'axios';
  import PostCard from "./Posts/PostCard.vue";
  export default {
    data () {
      return {
        items: [],
        pageCount: 20,
        current_page: 1,
      }
    },
    mounted () {
      this.reloadPosts(this.current_page);
    },
    methods: {
      onPaginationClick: function (pageNum) {
            console.log(pageNum);
            this.reloadTable(pageNum);
            this.clearInputs();
            
            this.current_id = null;
            this.current_page = pageNum;

        },
        reloadPosts: function (page) {
            fetch('/posts/' + page)
                .then(response => response.json())
                .then(data => {
                    this.items = data.posts;
                    // remove _v from tableData
                    this.items.forEach(item => delete item.__v);
                    this.pageCount = data.num_pages;
                })
                .catch(error => {
                    console.log(error);
                });
        },
    },
    components: {
      PostCard,
      Paginate
    },
  };
  </script>