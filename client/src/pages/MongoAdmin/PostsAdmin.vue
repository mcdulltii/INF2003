<template>
    <div>
        <div>
            <div>
                <label>post_title: </label> <input type="text" id="post-title-input">
            </div>
            <div>
                <label>post_url: </label> <input type="text" id="post-url-input">
            </div>
            <div>
                <label>flair-text: </label> <input type="text" id="flair-text-input">
            </div>
            <div>
                <label>post_datetime: </label> <input type="text" id="post-datetime-input">
            </div>
            <div>
                <button id="save-button" v-on:click="onSaveClick(current_id)">Save</button>
            </div>
        </div>
        <div class="table-container">
            <table class="table">
                <thead>
                    <tr>
                        <th v-for="(value, key) in tableData[0]">{{ key }}</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in tableData" :key="index">
                        <td v-for="(value, index) in item" :key="index">{{ value }}</td>
                        <td>
                            <tr><button v-on:click="onEditClick(item.post_id)">Edit</button></tr>
                            <tr><button v-on:click="onDeleteClick(item.post_id)">Delete</button></tr>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
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

export default {
    components: {
        Paginate
    },
    data() {
        return {
            tableData: [],
            pageCount: 20,
            current_page: 1,
            current_id: null // id of post being edited
        };
    },
    mounted() {
        this.reloadTable(this.current_page);
    },
    methods: {
        onPaginationClick: function (pageNum) {
            console.log(pageNum);
            this.reloadTable(pageNum);
            this.clearInputs();
            
            this.current_id = null;
            this.current_page = pageNum;

        },
        onEditClick: function (id) {
            console.log(id);
            // get post from tableData
            var post = this.tableData.find(item => item.post_id === id);
            console.log(post);

            // set inputs to post's current values
            document.getElementById('post-title-input').value = post.post_title;
            document.getElementById('post-url-input').value = post.post_url;
            document.getElementById('flair-text-input').value = post.flair_text;
            document.getElementById('post-datetime-input').value = post.post_datetime;

            document.getElementById('post-title-input').focus();

            // set current_id to post's id
            this.current_id = id;
        },
        onDeleteClick: function (id) {
            console.log(id);
            if (confirm('Are you sure you want to delete this post?')) {
                // call api to delete post
                fetch('/posts/delete/' + id, {method: 'POST'})
                    .then(response => response.json())
                    .catch(error => {
                        console.log(error);
                    });

                // call api to get new posts and update table
                this.reloadTable(this.current_page);
            }
        },
        onSaveClick: function (id) {
            // if current_id is null, then we are adding a new post
            if (id === null) {
                this.addPost();
            } else {
                this.updatePost(id);
            }
        },
        addPost: function() {
            // get new values from inputs and trim whitespace
            var new_post_title = document.getElementById('post-title-input').value.trim();
            var new_post_url = document.getElementById('post-url-input').value.trim();
            var new_flair_text = document.getElementById('flair-text-input').value.trim();
            var new_post_datetime = document.getElementById('post-datetime-input').value.trim();

            // if post_datetime is empty, set it to null
            if (new_post_datetime === '') {
                new_post_datetime = null;
            }

            // call api to add post
            fetch('/posts/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        post_title: new_post_title,
                        post_url: new_post_url,
                        flair_text: new_flair_text,
                        post_datetime: new_post_datetime
                    })
                })
                .then(response => response.json())
                .catch(error => {
                    console.log(error);
                });

            // call api to get new posts and update table
            this.reloadTable(this.current_page);

            this.clearInputs();
        },
        updatePost: function (id) {
            // get new values from inputs
            var new_post_title = document.getElementById('post-title-input').value;
            var new_post_url = document.getElementById('post-url-input').value;
            var new_flair_text = document.getElementById('flair-text-input').value;
            var new_post_datetime = document.getElementById('post-datetime-input').value;

            // call api to update post
            fetch('/posts/update/' + id, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        post_title: new_post_title,
                        post_url: new_post_url,
                        flair_text: new_flair_text,
                        post_datetime: new_post_datetime
                    })
                })
                .then(response => response.json())
                .catch(error => {
                    console.log(error);
                });

            // call api to get new posts and update table
            this.reloadTable(this.current_page);
        },
        reloadTable: function (page) {
            fetch('/posts/' + page)
                .then(response => response.json())
                .then(data => {
                    this.tableData = data.posts;
                    // remove _v from tableData
                    this.tableData.forEach(item => delete item.__v);
                    this.pageCount = data.num_pages;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        clearInputs: function () {
            document.getElementById('post-title-input').value = '';
            document.getElementById('post-url-input').value = '';
            document.getElementById('flair-text-input').value = '';
            document.getElementById('post-datetime-input').value = '';
        }
    }
};
</script>

<style>
</style>