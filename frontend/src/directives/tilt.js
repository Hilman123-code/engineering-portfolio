import VanillaTilt from "vanilla-tilt";

export default {
    mounted(el) {
        VanillaTilt.init(el, {
            max: 8,
            speed: 400,
            glare: true,
            "max-glare": 0.18,
            scale: 1.03,
            perspective: 1200,
            gyroscope: false
        });
    },

    unmounted(el) {
        if (el.vanillaTilt) {
            el.vanillaTilt.destroy();
        }
    }
}