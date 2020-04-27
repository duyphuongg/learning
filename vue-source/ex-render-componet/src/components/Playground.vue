<template>
    <div>
        <h1>Welcome to the component playground</h1>
        <select name="" id="" v-model="selectedComponent">
            <option v-for="(component, index) in componentList" :key="index" :value="component.component">{{component.label}}</option>
        </select>
        <div class="dynamic-component">
            <h4>Preview</h4>
            <keep-alive>
                <component :is="selectedComponent"/>
            </keep-alive>
        </div>
        <div class="btn-group">
            <button>Add+</button>
            <button>Clear</button>
        </div>
        <div>

        </div>
    </div>
</template>

<script>
import SimpleButton from '../components/SimpleButton'
import SimpleCard from '../components/SimpleCard'
import SimpleSwitch from '../components/SimpleSwitch'

export default {
    data () {
        return {
            componentList: [
                {
                    component: SimpleButton,
                    label: 'A button'
                },
                {
                    component: SimpleCard,
                    label: 'A card'
                },
                {
                    component: SimpleSwitch,
                    label: 'A switch'
                }
            ],
            selectedComponent: null,
            arrComponent : []
        }
    }
}
</script>

<style scoped>
.dynamic-component{
    border: 1px dashed red;
    display: inline-block;
    padding: 1em;
}
</style>