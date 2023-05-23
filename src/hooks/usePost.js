import axios from "axios";
import {onMounted, ref} from 'vue';

export function usePost(limit) {
    let posts = ref([]);
    let totalPages = ref(1);
    let isPostLoadTotalPages = ref(true);

    const fetching = () => {
        try {
            setTimeout(async () => {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _limit: limit,
                        _page: 0
                    }
                });
                posts.value = response.data;
                isPostLoadTotalPages.value = false;
                totalPages.value = Math.ceil(response.headers['X-Total-Count'.toLowerCase()] / limit)
            }, 300)
        } catch (e) {
            alert('Ошибка: ' + e)
        }
    };

    onMounted(fetching);
    return {
        posts,
        totalPages,
        isPostLoadTotalPages
    }
}
