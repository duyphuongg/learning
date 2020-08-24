<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-body__logo text-center">
                    <span>
                        <div id="floatingBarsG" style="transform: scale(.6);">
                            <div class="blockG" id="rotateG_01"></div>
                            <div class="blockG" id="rotateG_02"></div>
                            <div class="blockG" id="rotateG_03"></div>
                            <div class="blockG" id="rotateG_04"></div>
                            <div class="blockG" id="rotateG_05"></div>
                            <div class="blockG" id="rotateG_06"></div>
                            <div class="blockG" id="rotateG_07"></div>
                            <div class="blockG" id="rotateG_08"></div>
                        </div>
                    </span>
                    <div class="modal-body__content modal-pad-30 mar-b-35">
                        <p class="title">{{title}}</p>
                        <p class="desc">{{desc}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'title',
            'desc',
        ],
        data() {
        },
        created : function(){
        },
        methods: {
        }
    }
</script>

<style scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
}
.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}
.modal-container {
    width: 350px;
    margin: 0px auto;
    margin-bottom: 20%;
    padding: 40px 40px 30px;
    background-color: #ffffff;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
}
p.title {
    font-weight: 600;
    font-size: 18px;
    margin: 15px 0 5px;
}
#floatingBarsG {
  position: relative;
  width: 70px;
  height: 87px;
  margin: auto;
}

.blockG {
  position: absolute;
  background-color: rgb(255, 255, 255);
  width: 11px;
  height: 27px;
  border-radius: 9px 9px 0 0;
  -o-border-radius: 9px 9px 0 0;
  -ms-border-radius: 9px 9px 0 0;
  -webkit-border-radius: 9px 9px 0 0;
  -moz-border-radius: 9px 9px 0 0;
  transform: scale(0.4);
  -o-transform: scale(0.4);
  -ms-transform: scale(0.4);
  -webkit-transform: scale(0.4);
  -moz-transform: scale(0.4);
  animation-name: fadeG;
  -o-animation-name: fadeG;
  -ms-animation-name: fadeG;
  -webkit-animation-name: fadeG;
  -moz-animation-name: fadeG;
  animation-duration: 1.2s;
  -o-animation-duration: 1.2s;
  -ms-animation-duration: 1.2s;
  -webkit-animation-duration: 1.2s;
  -moz-animation-duration: 1.2s;
  animation-iteration-count: infinite;
  -o-animation-iteration-count: infinite;
  -ms-animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  animation-direction: normal;
  -o-animation-direction: normal;
  -ms-animation-direction: normal;
  -webkit-animation-direction: normal;
  -moz-animation-direction: normal;
}

#rotateG_01 {
  left: 0;
  top: 32px;
  animation-delay: 0.45s;
  -o-animation-delay: 0.45s;
  -ms-animation-delay: 0.45s;
  -webkit-animation-delay: 0.45s;
  -moz-animation-delay: 0.45s;
  transform: rotate(-90deg);
  -o-transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
  -webkit-transform: rotate(-90deg);
  -moz-transform: rotate(-90deg);
}

#rotateG_02 {
  left: 9px;
  top: 11px;
  animation-delay: 0.6s;
  -o-animation-delay: 0.6s;
  -ms-animation-delay: 0.6s;
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
}

#rotateG_03 {
  left: 29px;
  top: 3px;
  animation-delay: 0.75s;
  -o-animation-delay: 0.75s;
  -ms-animation-delay: 0.75s;
  -webkit-animation-delay: 0.75s;
  -moz-animation-delay: 0.75s;
  transform: rotate(0deg);
  -o-transform: rotate(0deg);
  -ms-transform: rotate(0deg);
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
}

#rotateG_04 {
  right: 9px;
  top: 11px;
  animation-delay: 0.9s;
  -o-animation-delay: 0.9s;
  -ms-animation-delay: 0.9s;
  -webkit-animation-delay: 0.9s;
  -moz-animation-delay: 0.9s;
  transform: rotate(45deg);
  -o-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
}

#rotateG_05 {
  right: 0;
  top: 32px;
  animation-delay: 1.05s;
  -o-animation-delay: 1.05s;
  -ms-animation-delay: 1.05s;
  -webkit-animation-delay: 1.05s;
  -moz-animation-delay: 1.05s;
  transform: rotate(90deg);
  -o-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
}

#rotateG_06 {
  right: 9px;
  bottom: 8px;
  animation-delay: 1.2s;
  -o-animation-delay: 1.2s;
  -ms-animation-delay: 1.2s;
  -webkit-animation-delay: 1.2s;
  -moz-animation-delay: 1.2s;
  transform: rotate(135deg);
  -o-transform: rotate(135deg);
  -ms-transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
  -moz-transform: rotate(135deg);
}

#rotateG_07 {
  bottom: 0;
  left: 29px;
  animation-delay: 1.35s;
  -o-animation-delay: 1.35s;
  -ms-animation-delay: 1.35s;
  -webkit-animation-delay: 1.35s;
  -moz-animation-delay: 1.35s;
  transform: rotate(180deg);
  -o-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
}

#rotateG_08 {
  left: 9px;
  bottom: 8px;
  animation-delay: 1.5s;
  -o-animation-delay: 1.5s;
  -ms-animation-delay: 1.5s;
  -webkit-animation-delay: 1.5s;
  -moz-animation-delay: 1.5s;
  transform: rotate(-135deg);
  -o-transform: rotate(-135deg);
  -ms-transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
  -moz-transform: rotate(-135deg);
}

@keyframes fadeG {
  0% {
    background-color: #FF881B;
  }

  100% {
    background-color: rgb(255, 255, 255);
  }
}

@-o-keyframes fadeG {
  0% {
    background-color: #FF881B;
  }

  100% {
    background-color: rgb(255, 255, 255);
  }
}

@-ms-keyframes fadeG {
  0% {
    background-color: #FF881B;
  }

  100% {
    background-color: rgb(255, 255, 255);
  }
}

@-webkit-keyframes fadeG {
  0% {
    background-color: #FF881B;
  }

  100% {
    background-color: rgb(255, 255, 255);
  }
}

@-moz-keyframes fadeG {
  0% {
    background-color: #FF881B;
  }

  100% {
    background-color: rgb(255, 255, 255);
  }
}
</style>