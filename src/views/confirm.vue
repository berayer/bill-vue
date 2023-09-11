<template>
  <div v-if="state.loading">{{ state.showText }}</div>
  <div v-else>
    <n-scrollbar class="h-screen">
      <iframe :src="state.pdfUrl" class="w-full" style="height: calc(100vh - 75px)" />
      <div class="flex items-center justify-center space-x-2 bg-gray-100" style="height: 75px">
        <n-button type="info" @click="state.sginShow = true">签字确认</n-button>
        <n-button type="primary" @click="save"> 保存</n-button>
      </div>
    </n-scrollbar>

    <n-modal v-model:show="state.sginShow" preset="card" :style="{ width: '700px' }" title="请在下面区域签字" :on-after-enter="openSign">
      <div class="flex justify-center">
        <canvas id="lad" ref="sginRef" width="600" height="350" style="height: 350px; width: 600px; border: 2px dashed #c9c9c9" />
      </div>

      <div class="mt-4 flex w-full justify-between px-8">
        <div class="space-x-2">
          <n-button type="primary" @click="handleClear">重置</n-button>
          <n-button type="warning" @click="handleUndo">撤销</n-button>
        </div>

        <div class="space-x-2">
          <n-button @click="state.sginShow = false">取消</n-button>
          <n-button type="info" @click="sginSubmit">确认</n-button>
        </div>
      </div>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { createBillPdf } from '@/utils/billUtil'
import type { BillPpdfData } from '@/utils/billUtil'
import SmoothSignature from 'smooth-signature'
import { useRoute } from 'vue-router'

const state = reactive({
  loading: true,
  showText: '正在生成PDF...',
  pdfUrl: '',
  sginShow: false,
  sginValue: ''
})
const billData = ref<any>()
const sginRef = ref<HTMLCanvasElement | null>(null)
const canvasins = ref<SmoothSignature | null>(null)
const route = useRoute()

axios
  .get('/v2/bill', {
    params: route.query
  })
  .then((res) => {
    if (res.data.code == 200) {
      billData.value = res.data.data
      if (res.data.data.details) {
        state.pdfUrl = createBillPdf(genData())
        state.loading = false
      } else {
        state.showText = '没有对账单需要确认'
      }
    } else {
      state.showText = res.data.msg
    }
  })
  .catch((err) => {
    console.log(err)
    window.$message.error('发生错误,请稍后尝试')
    state.showText = '失败'
  })

// '序号', '业务日期', '订单号', '描述', '扣款金额', '汇款金额', '结余', '备注'
function genData(sgin?: string): BillPpdfData {
  const d = billData.value
  const arr = d.details as Array<any>
  const ds: Array<string[]> = []
  arr.forEach((e) => {
    ds.push([
      `${e.id}`,
      `${e.businessDate}`.slice(0, 10),
      `${e.orderNo || ''}`,
      `${e.summary || ''}`,
      `${e.withDraw ? e.withDraw.toFixed(2) : ''}`,
      `${e.deposit ? e.deposit.toFixed(2) : ''}`,
      `${e.amt || ''}`,
      ''
    ])
  })
  return {
    title: '2023年8月对账单',
    dealerNo: `${d.dealerNo} ${d.dealerName}`,
    data: ds,
    sgin
  }
}

const openSign = () => {
  canvasins.value = new SmoothSignature(sginRef.value!, {
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
  state.sginShow = false
  state.sginValue = pngUrl!
  state.pdfUrl = createBillPdf(genData(pngUrl))
}

function save() {
  if (state.sginValue) {
    window.$message.success('保存成功')
  } else {
    window.$message.warning('请先确认')
  }
}
</script>
