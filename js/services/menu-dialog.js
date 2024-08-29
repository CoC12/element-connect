document.addEventListener('DOMContentLoaded', () => {
    const openTriggerNodeList = document.querySelectorAll('.js-dialog__open-trigger');
    const closeTriggerNodeList = document.querySelectorAll('.js-dialog__close-trigger');

    openTriggerNodeList.forEach(triggerElement => {
        triggerElement.addEventListener('click', () => {
            const targetClass = triggerElement.dataset.dialogTarget;
            const menuDialogContainer = document.getElementById(targetClass);
            menuDialogContainer.classList.add('p-game__dialog-open');
        });
    });

    closeTriggerNodeList.forEach(triggerElement => {
        triggerElement.addEventListener('click', () => {
            const targetClass = triggerElement.dataset.dialogTarget;
            const menuDialogContainer = document.getElementById(targetClass);
            menuDialogContainer.classList.remove('p-game__dialog-open');
        });
    });
});
