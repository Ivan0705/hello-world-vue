<template>
    <div class="navbar">
        <div @click="$router.push('/')">Vue 3</div>
        <div class="navbar__btns">
            <my-button class="navbar__button" @click="$router.push('/')">Пользователи
            </my-button>
            <my-button class="navbar__button" @click="$router.push('/about')">О сайте
            </my-button>
            <my-button class="navbar__button" @click="$router.push('/store')">Store
            </my-button>
            <my-button class="navbar__button" @click="$router.push('/composition')">
                Composition
            </my-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Navbar'
    }
</script>

<style scoped>
    .navbar {
        height: 50px;
        background-color: silver;
        box-shadow: 2px 2px 4px gray;
        display: flex;
        align-items: center;
        padding: 0 15px;
    }

    .navbar__btns {
        margin-left: auto;
    }

    .navbar__button {
        margin-left: 20px;
        border: 2px solid teal;
        color: teal;
        padding: 7px;
    }
</style>
