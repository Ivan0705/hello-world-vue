<template>
    <div class="app">
        <navbar/>
        <router-view>
        </router-view>
    </div>
</template>

<script>
    import UserPage from "./pages/UserPage";
    import Navbar from "./components/Navbar";

    export default {
        name: 'new-app',
        components: {Navbar, UserPage}
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .app {
        padding: 20px;
    }
</style>
