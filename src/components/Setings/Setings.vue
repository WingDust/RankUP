<template lang="html">
<div>
<setings-filmpath></setings-filmpath>
</div>
</template>

<script>
import SetingsFilmPath from '@/components/Setings/Setings01FilmPath.vue'
export default {
    name:'Setings',
    components:{
        'setings-filmpath':SetingsFilmPath
    },
    mounted:function(){
    }
}
</script>

<style lang="css" scoped>
</style>
