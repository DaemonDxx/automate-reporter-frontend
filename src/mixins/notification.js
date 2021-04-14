export const NotificationMixin = {
    methods: {
        showError(message) {
            this.$notify({
                title: 'Операция завершилась неудачей',
                text: message,
                type: 'error',
            })
        },

        showSuccess(message) {
            this.$notify({
                text: message,
                type: 'success',
            })
        }
    }
}