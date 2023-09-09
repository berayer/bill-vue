<template>
  <div class="absolute left-1/2">
    <n-button @click="click(sg)">预览</n-button>
    <n-button @click="sginShow = true">签字</n-button>
  </div>

  <n-modal v-model:show="sginShow" preset="card" :style="{ width: '700px' }" title="请在下面区域签字" :on-after-enter="openSign">
    <div class="flex justify-center">
      <canvas id="lad" ref="sgin" width="600" height="350" style="height: 350px; width: 600px; border: 2px dashed #c9c9c9" />
    </div>

    <div class="mt-4 flex w-full justify-between px-8">
      <div class="space-x-2">
        <n-button type="primary" @click="handleClear">重置</n-button>
        <n-button type="warning" @click="handleUndo">撤销</n-button>
      </div>

      <div class="space-x-2">
        <n-button @click="sginShow = false">取消</n-button>
        <n-button type="info" @click="sginSubmit">确认</n-button>
      </div>
    </div>
  </n-modal>
  <iframe class="h-screen w-screen" :src="url" />
</template>

<script setup lang="ts">
import { createBillPdf } from '@/utils/billUtil'
import SmoothSignature from 'smooth-signature'
import mock from '@/mock/bill.json'

const sginShow = ref(false)
const url = ref('')
const sgin = ref<HTMLCanvasElement | null>(null)
const canvasins = ref<SmoothSignature | null>(null)
const sg = ref('')

const openSign = () => {
  canvasins.value = new SmoothSignature(sgin.value!, {
    width: 600,
    height: 350,
    bgColor: '#fff',
    minWidth: 3,
    maxWidth: 10,
    scale: 2
  })
}

function handleClear() {
  canvasins.value?.clear()
}

function handleUndo() {
  canvasins.value?.undo()
}

function sginSubmit() {
  const isEmpty = canvasins.value?.isEmpty()
  if (isEmpty) {
    window.$message.error('签名不能为空')
    return
  }
  const pngUrl = canvasins.value?.getPNG()
  sg.value = pngUrl!
  // console.log(sg.value)
  sginShow.value = false
  click(sg.value)
}

const click = (sgin?: string) => {
  url.value = createBillPdf({
    title: '2023年8月对账单',
    dealerNo: 'B0546 皇朝家具定制有限公司',
    data: getDa(),
    sgin: sgin,
    user: 'B0241老板'
  })
}

function getDa() {
  const ds: Array<string[]> = []
  mock.forEach((item) => {
    ds.push([item[0], item[1], item[2], item[3], item[4], item[5], (Number.parseFloat(item[6]) - 118630.13).toFixed(2), ''])
  })
  return ds
}
</script>
