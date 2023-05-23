import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
        isPostLoading: false,
        selectedSort: '',
        sortOptions: [
            {value: 'title', name: 'По названию'},
            {value: 'body', name: 'По содержимому'}
        ],
        searchQuery: '',
        page: 1,
        limit: 10,
        totalPages: 0,
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, bool) {
            state.isPostLoading = bool;
        },
        setPage(state, page) {
            state.page = page;
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery
        },
    },
    actions: {
        async fetchPosts({state, commit}) {
            try {
                commit("setLoading", true);
                setTimeout(async () => {
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _limit: state.limit,
                            _page: state.page
                        }
                    });
                    commit('setPosts', response.data);
                    commit("setLoading", false);
                    commit("setTotalPages", Math.ceil(response.headers['X-Total-Count'.toLowerCase()] / state.limit));
                }, 300)
            } catch (e) {
                alert('Ошибка: ' + e)
            }
        },
        async loadMorePosts({state, commit}) {
            try {
                commit('setPage', state.page += 1);

                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _limit: state.limit,
                        _page: state.page
                    }
                });
                commit('setPosts', [...state.posts, ...response.data]);
                commit("setLoading", false);
                commit('setTotalPages', Math.ceil(response.headers['X-Total-Count'.toLowerCase()] / state.limit))
            } catch (e) {
                alert('Ошибка: ' + e)
            }
        },
    },
    namespaced: true
};
