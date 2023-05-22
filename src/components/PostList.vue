<template>
    <div v-if="posts.length>0">
        <transition-group name="user-list">
            <PostItem v-for="post in posts" :key="post.id" :post="post" @remove="$emit('remove', post)"/>
        </transition-group>
    </div>
    <h2 style="color: red" v-else>
        Список пользователей пуст!
    </h2>
</template>

<script>
    import PostItem from "./PostItem";

    export default {
        name: 'PostList',
        components: {PostItem},
        props: {
            posts: {
                type: Array,
                required: true
            }
        },

    }
</script>

<style scoped>

</style>
