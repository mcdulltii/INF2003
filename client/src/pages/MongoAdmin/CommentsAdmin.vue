<template>
    <div>
        <div>
            <div>
                <label>post_id: </label> <input type="text" id="post-id-input">
            </div>
            <div>
                <label>comment_message: </label> <input type="text" id="comment-message-input">
            </div>
            <div>
                <button id="save-button" v-on:click="onSaveClick(current_id)">Save</button>
            </div>
        </div>
        <br>
        <div>
            <input type="text" id="key-input" placeholder="Key">
            <input type="text" id="value-input" placeholder="Value">
            <button id="search-button" v-on:click="onSearchClick()">Search</button>
        </div>
        <br>
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
                            <tr><button v-on:click="onEditClick(item._id)">Edit</button></tr>
                            <tr><button v-on:click="onDeleteClick(item._id)">Delete</button></tr>
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
            current_page: 0,
            current_id: null, // id of post being edited
            current_search_key: null,
            current_search_value: null
        };
    },
    mounted() {
        this.reloadTable(this.current_page);
        this.current_id = null;
    },
    methods: {
        onPaginationClick: function (pageNum) {
            // subtract 1 from pageNum because pagination starts at 1 but api starts at 0
            pageNum = pageNum - 1;
            console.log(pageNum);
            this.reloadTable(pageNum);
            this.clearInputs();
            
            this.current_id = null;
            this.current_page = pageNum;
        },
        onEditClick: function (id) {
            console.log('id');

            // get comment from tableData
            var comment = this.tableData.find(item => item._id === id);
            console.log(comment);

            // set inputs to comment values
            document.getElementById('post-id-input').value = comment.post_id;
            document.getElementById('comment-message-input').value = comment.comment_message;

            document.getElementById('post-id-input').focus();

            // set current_id to comment id
            this.current_id = id;
        },
        onDeleteClick: function (id) {
            console.log(id);
            if (confirm('Are you sure you want to delete this comment?')) {
                // call api to delete comment
                fetch('/comments/delete/' + id, {method: 'POST'})
                    .then(response => response.json())
                    .catch(error => {
                        console.log(error);
                    });

                // call api to get new comments and update table
                this.reloadTable(this.current_page);
            }
        },
        onSaveClick: function (id) {
            // if current_id is null, then we are adding a new comment
            if (id === null) {
                this.addComment();
            } else {
                this.updateComment(id);
            }
        },
        addComment: function () {
            // get values from inputs
            var post_id = document.getElementById('post-id-input').value;
            var comment_message = document.getElementById('comment-message-input').value;

            // create new comment object
            var newComment = {
                post_id: post_id,
                comment_message: comment_message
            };

            // call api to add new post
            fetch('/comments/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newComment)
            })
                .then(response => response.json())
                .catch(error => {
                    console.log(error);
                });

            // call api to get new comment and update table
            this.reloadTable(this.current_page);

            // clear inputs
            this.clearInputs();
        },
        updateComment: function (id) {
            // get values from inputs
            var post_id = document.getElementById('post-id-input').value;
            var comment_message = document.getElementById('comment-message-input').value;

            // create new comment object
            var updatedComment = {
                post_id: post_id,
                comment_message: comment_message
            };

            // call api to update comment
            fetch('/comments/update/' + id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedComment)
            })
                .then(response => response.json())
                .catch(error => {
                    console.log(error);
                });

            // call api to get new comment and update table
            this.reloadTable(this.current_page);
        },
        onSearchClick: function () {
            // get key and value from inputs
            var key = document.getElementById('key-input').value;
            var value = document.getElementById('value-input').value;

            // call api to search for comments
            this.searchComments(key, value, '0');

            this.current_search_key = key;
            this.current_search_value = value;
        },
        reloadTable: function (page) {
            // if current_search_key and current_search_value are not null, then get comments by search
            // else get all comments
            if (this.current_search_key !== null && this.current_search_value !== null) {
                this.searchComments(this.current_search_key, this.current_search_value, page);
            } else {
                fetch('/comments/' + page)
                    .then(response => response.json())
                    .then(data => {
                        this.tableData = data.comments;
                        // remove _v from tableData
                        this.tableData.forEach(item => delete item.__v);
                        this.pageCount = data.num_pages;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        searchComments: function (key, value, page) {
            fetch('/comments/search/' + key + '/' + value + '/' + page)
                .then(response => response.json())
                .then(data => {
                    this.tableData = data.comments;
                    // remove _v from tableData
                    this.tableData.forEach(item => delete item.__v);
                    this.pageCount = data.num_pages;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        clearInputs: function () {
            document.getElementById('post-id-input').value = '';
            document.getElementById('comment-message-input').value = '';            
        }
    }
};
</script>

<style>
</style>