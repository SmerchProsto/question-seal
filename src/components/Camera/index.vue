<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Props {
    setHeaderPreview: () => void;
}

const props = defineProps<Props>();

const videoElement = ref<HTMLVideoElement | null>(null);
let mediaStream: MediaStream | null = null;
onMounted(() => {
  navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoElement.value) videoElement.value.srcObject = stream;
        mediaStream = stream;
      })
      .catch(err => console.error("Error accessing camera: ", err));
});

onUnmounted(() => {
  if (mediaStream) {
    mediaStream.getTracks().forEach(track => track.stop());
  }
});
</script>

<template>
    <section class="camera">
        <h2 class="hidden">Камера проверки</h2>
        <div class="camera-wrapper">
            <video ref="videoElement" autoplay></video>
        </div>
        <button class="camera-close" @click="props.setHeaderPreview">
            X
        </button>
    </section>
</template>

<style scoped>
.camera {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2;
  background-color: #333333;
}

.camera-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.camera-wrapper::before {
  content: '';
  position: absolute;
  width: 25%;
  height: 40vw;
  max-height: 60vh;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  border: 0.5vw solid rgba(255, 0, 0, 0.5);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.camera-wrapper::after {
  content: 'Убедитесь, что все важные элементы головы: рога, тентакли и т.д. внутри овала';
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20vw;
  text-align: center;
  color: #ffffff;
  font-size: 1.2em;
}

@media (max-width: 1200px) {
  .camera-wrapper::after {
    font-size: 1em;
  }
}

@media (max-width: 992px) {
  .camera-wrapper::after {
    font-size: 0.9em;
  }
}

@media (max-width: 768px) {
  .camera-wrapper::after {
    font-size: 0.8em;
  }
}

@media (max-width: 576px) {
  .camera-wrapper::after {
    font-size: 0.7em;
  }
}

.camera-wrapper video {
  width: 100%;
  height: 100%;
}

.camera-close {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 3;
  background-color: transparent;
  color: rgba(255, 0, 0, 0.5);
  border-radius: 50%;
  font-size: 2em;
  border: none;
  outline: none;
  cursor: pointer;
}
</style>