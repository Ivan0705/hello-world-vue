export const VIntersection = {
    mounted(el, binding) {
        console.log(el, binding);
        let options = {
            rootMargin: "0px",
            threshold: 1.0,
        };

        const callback = (entries) => {
            if (entries[0].isIntersecting) {
                binding.value();
            }
        };

        const observer = new IntersectionObserver(callback, options);
        observer.observe(el)
    },
    name: 'intersection'
};
