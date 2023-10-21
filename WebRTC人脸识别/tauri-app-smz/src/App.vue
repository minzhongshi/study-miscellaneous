<template>
  <div>
    <video autoplay controls ref="video" src=""></video>
    <canvas width="400" height="400" ref="canvas"></canvas>
    <button @click="openVideo">开启摄像头</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import * as faceapi from 'face-api.js';
const video = ref<HTMLVideoElement>()
const canvas = ref<HTMLCanvasElement>()


const models = './models';
(async () => {
  await Promise.all([
    faceapi.loadAgeGenderModel(models), //加载训练模型
    faceapi.loadFaceDetectionModel(models),//加载训练模型
    faceapi.loadFaceExpressionModel(models),//加载训练模型
    faceapi.loadTinyFaceDetectorModel(models),//加载训练模型
    faceapi.loadFaceRecognitionModel(models)//加载训练模型
  ])
})()

const openVideo = () => {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(async s => {
    video.value!.srcObject = s
  })

  const context = canvas.value?.getContext('2d')
  setInterval(async ()=>{
    context?.drawImage(video.value as any, 0, 0, 400, 400);
    //获取分析人脸的数据
    const detections = await faceapi.detectAllFaces(video.value as any, new faceapi.TinyFaceDetectorOptions())

    const resizedDetections = faceapi.resizeResults(detections, {width:400,height:400});
    //将人脸边框绘制到canvas上
    faceapi.draw.drawDetections(canvas.value as any, resizedDetections)
  },100)
}

</script>

<style lang="less" scoped>

</style>
