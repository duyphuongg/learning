<template>
    <div class="search">
        <ul>
            <li v-for="(user, index) in searchKeyWord" :key="index">
                <div>
                    <p>{{user.name}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'searchKeyWord'
    ])
  }
}
</script>
