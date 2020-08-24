<template>
  <div class="loading-product">
      <loading/>
      <p class="loading-product__text">Selecting products...</p>
  </div>
</template>

<script>
import Loading from './../Loadding'
 
export default {
    data() {
        return {
            
        }
    },
    components: {
        'loading' : Loading
    }
}
</script>

<style scoped>
.loading-product{
    position: relative;
    display: flex;
    justify-content: center;
    min-height: 150px;
    align-items: flex-end;
    padding: 20px;
}
.loading-product .loading-product__text{
    margin-left: 25px;
}
.loadding#floatingBarsG {
    position: absolute;
    width: 70px;
    height: 87px;
    margin: auto;
    left: 50%;
    top: 40px;
    -webkit-transform: scale(0.6) translate(-50%, -50%);
    transform: scale(0.6) translate(-50%, -50%);
}

@keyframes fadeG {
  0% {
    background-color: #f63665;
  }

  100% {
    background-color: rgb(255, 255, 255);
  }
}

@-o-keyframes fadeG {
  0% {
    background-color: #f63665;
  }

  100% {
    background-color: rgb(255, 255, 255);
  }
}

@-ms-keyframes fadeG {
  0% {
    background-color: #f63665;
  }

  100% {
    background-color: rgb(255, 255, 255);
  }
}

@-webkit-keyframes fadeG {
  0% {
    background-color: #f63665;
  }

  100% {
    background-color: rgb(255, 255, 255);
  }
}

@-moz-keyframes fadeG {
  0% {
    background-color: #f63665;
  }

  100% {
    background-color: rgb(255, 255, 255);
  }
}
</style>