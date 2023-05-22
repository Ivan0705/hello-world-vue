<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input :model-value="searchQuery"
                  @update:model-value="setSearchQuery"
                  placeholder="Поиск..." v-focus/>

        <div class="app__btns">
            <my-button @click="show">Создать пользователя</my-button>
        </div>
        <my-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions"></my-select>
        <my-dialog v-model:show="dialogVisible" :update:show="show">
            <post-form @create="addPost"/>
        </my-dialog>
        <post-list
                :posts="sortedAndSearchedPosts"
                @remove="remove"
                v-if="!isPostLoading"/>
        <div v-else>Идёт загрузка...</div>
        <div v-intersection='loadMorePosts' class="observer"></div>
    </div>
</template>

<script>

    import MyInput from "../components/UI/MyInput";
    import MySelect from "../components/UI/MySelect";
    import MyButton from "../components/UI/MyButton";
    import MyDialog from "../components/UI/MyDialog";
    import PostList from "../components/PostList";
    import PostForm from "../components/PostForm";
    import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'

    export default {
        name: 'user-page',
        components: {MyInput, MySelect, MyButton, MyDialog, PostList, PostForm},
        data() {
            return {
                dialogVisible: false
            }
        },
        methods: {
            ...mapMutations({
                setPosts: 'post/setPosts',
                setPage: 'post/setPage',
                setSearchQuery: 'post/setSearchQuery',
                setSelectedSort:'post/setSelectedSort'
            }),
            ...mapActions({
                loadMorePosts: 'post/loadMorePosts',
                fetchPosts: 'post/fetchPosts'
            }),

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
            async changePage(pageNumber) {
                this.page = pageNumber;
                this.fetchPosts();
            }
        },
        mounted() {
            this.fetchPosts();
        },
        computed: {
            ...mapState({
                posts: state => state.post.posts,
                isPostLoading: state => state.post.isPostLoading,
                selectedSort: state => state.post.selectedSort,
                sortOptions: state => state.post.sortOptions,
                searchQuery: state => state.post.searchQuery,
                page: state => state.post.page,
                limit: state => state.post.limit,
                totalPages: state => state.post.totalPages,
            }),
            ...mapGetters({
                sortedPosts: 'post/sortedPosts',
                sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
            }),

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

    .current-page {
        border: 2px solid teal;
    }

    .observer {
        height: 30px;
        background: green;
    }
</style>
