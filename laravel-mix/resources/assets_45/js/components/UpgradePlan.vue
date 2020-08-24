<template>
    <div class="upgrade-plan">
        <p v-html="upgrade_text"></p>
        <a class="button button--primary" href="/pricing">{{ btn_text }}</a>
    </div>
</template>

<script>
export default {
    props: [
        'upgrade_text',
        'btn_text_prop'
    ],
    data() {
        return {
            btn_text: this.btn_text_prop || 'Upgrade To Access'
        }
    },
}
</script>

<style scoped>
.upgrade-plan {
    box-shadow: 0 0 11px 0 rgba(0, 0, 0, 0.15);
    background-color: #ffffff;
    display: none;
    flex-direction: column;
    width: 220px;
    position: absolute;
    padding: 10px;
    font-size: 11px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    text-align: center;
}

.upgrade-plan .button--primary{
    color: #FFFFFF;
    background-color: #FF881B;
    border: unset;
    font-weight: 600;
    padding: 11px 25px;
}

.upgrade-plan .button--primary:hover{
    background-color: #ee6b0d;
}
</style>