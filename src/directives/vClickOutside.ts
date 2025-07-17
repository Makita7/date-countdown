import type { DirectiveBinding, ObjectDirective } from 'vue';

type ClickOutsideElement = HTMLElement & {
    _clickOutsideHandler?: (event: MouseEvent) => void;
};

export const vClickOutside: ObjectDirective = {
    mounted(el: ClickOutsideElement, binding: DirectiveBinding) {

        setTimeout(() => {
        el._clickOutsideHandler = (event: MouseEvent) => {
            const target = event.target as Node;
            if (!(el === event.target || el.contains(target))) {
                binding.value(event);
            }
        };
        document.addEventListener('click', el._clickOutsideHandler);
        }, 0);
    },

    unmounted(el: ClickOutsideElement) {
        document.removeEventListener('click', el._clickOutsideHandler!);
        delete el._clickOutsideHandler;
    },
};
