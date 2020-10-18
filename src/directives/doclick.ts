/** @format */

export default {
  beforeMount(el: any, binding: any) {
    const documentHandler = (e: any) => {
      if (!el.contains(e.target)) {
        binding.value.apply(e);
      }
    };
    el.emfeDocumentClick = documentHandler;
    document.addEventListener('click', documentHandler);
  },
  beforeUnmount(el: any) {
    document.removeEventListener('click', el.emfeDocumentClick);
    delete el.emfeDocumentClick;
  },
};