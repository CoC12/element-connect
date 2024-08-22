document.addEventListener('DOMContentLoaded', () => {
    const menuDialogContainer = document.querySelector('.js-menu-dialog__container');
    const openTriggerNodeList = document.querySelectorAll('.js-menu-dialog__open-trigger');
    const closeTriggerNodeList = document.querySelectorAll('.js-menu-dialog__close-trigger');

    openTriggerNodeList.forEach(triggerElement => {
        triggerElement.addEventListener('click', () => {
            menuDialogContainer.style.display = 'block';
        });
    });

    closeTriggerNodeList.forEach(triggerElement => {
        triggerElement.addEventListener('click', () => {
            menuDialogContainer.style.display = 'none';
        });
    });
});
