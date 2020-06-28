export default {
    install(Vue, options) {
        Vue.prototype.JSONob = function(data) {
            return JSON.parse(JSON.stringify(data))
        }
    }
}

