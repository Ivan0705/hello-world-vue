<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input v-model="searchQuery" placeholder="Поиск..." v-focus></my-input>
        <div class="app__btns">
            <my-button @click="show">Создать пользователя</my-button>
        </div>
        <my-select v-model="selectedSort" :options="sortOptions"></my-select>
        <my-dialog v-model:show="dialogVisible">
            <post-form/>
        </my-dialog>
        <PostList :posts="sortedAndSearchedPosts" v-if="!isPostLoading"/>
        <div v-else>Идёт загрузка...</div>
    </div>
</template>

<script>
    import MyInput from "../components/UI/MyInput";
    import MySelect from "../components/UI/MySelect";
    import MyButton from "../components/UI/MyButton";
    import MyDialog from "../components/UI/MyDialog";
    import PostList from "../components/PostList";
    import PostForm from "../components/PostForm";
    import {usePost} from "../hooks/usePost";
    import {useSortedAndSearchedPosts} from "../hooks/useSortedAndSearchedPosts";
    import {useSortedPosts} from "../hooks/useSortedPosts";



    export default {
        name: 'PostPageCompositionAPI',
        components: {MyInput, MySelect, MyButton, MyDialog, PostList, PostForm},
        data() {
            return {
                dialogVisible: false,
                sortOptions: [
                    {value: 'title', name: 'По названию'},
                    {value: 'body', name: 'По содержимому'}
                ],
            }
        },
        setup(props) {
            const {posts, totalPages, isPostLoadtotalPagesing} = usePost(10);
            const {sortedPosts, selectedSort} = useSortedPosts(posts);
            const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts);

            return {
                posts,
                totalPages,
                isPostLoadtotalPagesing,
                sortedPosts,
                selectedSort,
                searchQuery,
                sortedAndSearchedPosts
            }
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

    .observer {
        height: 30px;
        background: green;
    }
</style>
