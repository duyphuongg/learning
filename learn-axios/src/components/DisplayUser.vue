<template>
    <div class="list-user" v-if="listUser">
        <h4>List User</h4>
        <ul>
            <li v-for="(user, index) in listUser" :key="index">{{user.employee_name}}</li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      listUser: null
    }
  },
  created () {
    this.getListUser()
  },
  mounted () {
    // axios.get('http://dummy.restapiexample.com/api/v1/employees')
    //   .then((response) => {
    //     console.log('response', response.data.data)
    //     this.listUser = response.data.data
    //   })
    //   .catch((err) => console.log(err))
  },
  methods: {
    getListUser: async function () {
      let res = await axios.get('http://dummy.restapiexample.com/api/v1/employees')
      this.listUser = res.data
    }
  }
}
</script>

<style>

</style>
