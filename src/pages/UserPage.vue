<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input v-model="searchQuery" placeholder="Поиск..." v-focus></my-input>
        <div class="app__btns">
            <my-button @click="show">Создать пользователя</my-button>
        </div>
        <my-select v-model="selectedSort" :options="sortOptions"></my-select>
        <my-dialog v-model:show="dialogVisible" :update:show="show">
            <post-form @create="addPost"/>
        </my-dialog>
        <PostList :posts="sortedAndSearchedPosts" @remove="remove" v-if="!isPostLoading"/>
        <div v-else>Идёт загрузка...</div>
        <div class="observer"></div>
        <div class="page__wrapper">
            <div
                    class="page"
                    v-for="pageNumber in totalPages"
                    :key="pageNumber"
                    @click="changePage(pageNumber)"
                    :class="{'current-page':page===pageNumber}"
            > {{pageNumber}}
            </div>
        </div>
    </div>
</template>

<script>
    import MyInput from "../components/UI/MyInput";
    import MySelect from "../components/UI/MySelect";
    import MyButton from "../components/UI/MyButton";
    import MyDialog from "../components/UI/MyDialog";
    import PostList from "../components/PostList";
    import PostForm from "../components/PostForm";
    import axios from 'axios';

    export default {
        name: 'user-page',
        components: {MyInput, MySelect, MyButton, MyDialog, PostList, PostForm},
        data() {
            return {
                posts: [],
                dialogVisible: false,
                isPostLoading: false,
                selectedSort: '',
                sortOptions: [
                    {value: 'title', name: 'По названию'},
                    {value: 'body', name: 'По содержимому'}
                ],
                searchQuery: '',
                page: 0,
                limit: 10,
                totalPages: 0,
            }
        },
        methods: {
            addPost(post) {
                this.posts.push(post);
                this.dialogVisible = false;
            },
            remove(post) {
                this.posts = this.posts.filter(p =>
                    p.id !== post.id
                )
            },
            show() {
                this.dialogVisible = true;
            },
            async fetchPosts() {
                try {
                    this.isPostLoading = true;
                    setTimeout(async () => {
                        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                            params: {
                                _limit: this.limit,
                                _page: this.page
                            }
                        });
                        this.posts = response.data;
                        this.isPostLoading = false;
                        this.totalPages = Math.ceil(response.headers['X-Total-Count'.toLowerCase()] / this.limit)
                    }, 300)

                } catch (e) {
                    alert('Ошибка: ' + e)
                }
            },
            async changePage(pageNumber) {
                this.page = pageNumber;
                this.fetchPosts();
            }
        },
        mounted() {
            this.fetchPosts();
        },
        computed: {
            sortedPosts() {
                return [...this.posts].sort((a, b) => a[this.sortedPosts]?.localeCompare(b[this.sortedPosts]))
            },
            sortedAndSearchedPosts() {
                return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
            }
        },
        watch: {
            selectedSort(newValue) {
                this.posts.sort((post1, post2) => {
                    return post1[newValue]?.localeCompare(post2[newValue]);
                });
            },

        }
    }
</script>

<style scoped>

    .app__btns {
        margin: 15px 0;
        display: flex;
        justify-content: space-between;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    .page__wrapper {
        display: flex;
        margin-top: 15px;
    }

    .page {
        border: 1px black solid;
        padding: 10px;

    }

    .observer {
        height: 30px;
        background: green;
    }
</style>
