<template>
  <div>
      <card style="height: 60px; margin-bottom:25px">
          <div class="row" style="margin-left: 30%">
            <img
            class="avatar border-white"
            src="@/assets/img/faces/face-2.jpg"
            alt="..."
            
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
        current_page: 0,
      }
    },
    mounted () {
      this.reloadPosts(this.current_page);
    },
    methods: {
      onPaginationClick: function (pageNum) {
            pageNum = pageNum - 1;
            console.log(pageNum);
            this.reloadPosts(pageNum);
            
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