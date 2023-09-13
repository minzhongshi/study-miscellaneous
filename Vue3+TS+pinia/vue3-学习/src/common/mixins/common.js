export default {
    data(){
        return {

        }
    },
    methods:{},
    computed:{},
    filters:{},
    beforeCreate() {
        console.log("mixins--beforeCreate")
    },
    created() {
        console.log("mixins--created")
    },
    beforeMount() {
        console.log("mixins--beforeMount")
    },
    mounted() {
        console.log("mixins--mounted")
    }
}