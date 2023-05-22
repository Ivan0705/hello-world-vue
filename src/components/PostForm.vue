<template>
    <div>
        <form @submit.prevent>
            <h1>Создание поста: </h1>
            <my-input v-model="post.title" v-model:title="post.title" type="text" placeholder="Название"/>
            <my-input v-model="post.body" v-model:body="post.body" type="text" placeholder="Описание"/>
            <my-button v-on:click="addPost" class="btn">Создать</my-button>
        </form>
    </div>
</template>

<script>
    import MyButton from "./UI/MyButton";
    import MyInput from "./UI/MyInput";

    export default {
        name: 'PostForm',
        components: {MyInput, MyButton},
        data() {
            return {
                post: {
                    title: '',
                    body: '',
                }
            }
        },
        methods: {
            addPost() {
                this.post.id = Date.now();

                this.$emit('create', this.post);
                this.post = {
                    title: '',
                    body: '',
                };
            },
        }

    }

</script>

<style scoped>
    .btn {
        margin-top: 15px;
        align-self: flex-end;
        padding: 10px 15px;
        background: none;
        color: teal;
        border: solid 2px teal;
    }
</style>
