<template>
    <div>
        <div class="tab-wrap">
            <div class="tab-btn">
                <button v-on:click="component = 'form-one'" :class="(component=='form-one') ? 'active' : ''">Show form one</button>
                <button v-on:click="component = 'form-two'" :class="(component=='form-two') ? 'active' : ''">Show form two</button>
                <button v-on:click="component = 'form-helper'" :class="(component=='form-helper') ? 'active' : ''">Show form Helper</button>
            </div>
            <div class="tab-content">
                <keep-alive>
                    <component v-bind:is="component"></component>
                </keep-alive>
            </div>
        </div>
    </div>
</template>

<script>
// Imports
import formOne from './components/formOne.vue';
import formTwo from './components/formTwo.vue';
import formHelper from './components/formHelper.vue';

export default {
    components: {
        'form-one': formOne,
        'form-two': formTwo,
        'form-helper': formHelper
    },
    data () {
        return {
            component: 'form-one'
        }
    },
    methods: {
        handleSubmit: function(){
            alert('thanks for submitting');
        }
    }
}
</script>

<style scoped>
body{
    margin: 0;
    font-family: 'Nunito SemiBold';
}
.tab-wrap {
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
}
.tab-content {
    border: 1px solid;
}
button {
    border: unset;
    border-right: 1px solid;
    background: #e0e0e0;
    padding: 5px 10px;
}
button.active {
    background: #000000;
    color: white;
}
.tab-btn {
    display: flex;
}
</style>
