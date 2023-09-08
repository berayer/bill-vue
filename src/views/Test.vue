<template>
  <n-button class="absolute" @click="createPdf">预览</n-button>
  <iframe class="h-screen w-screen" :src="url" />
</template>

<script setup lang="ts">
import '@/fonts/SimSun-normal.js'
import '@/fonts/SimSun-bold.js'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

const url = ref('')

async function createPdf() {
  const doc = new jsPDF()
  doc.setFont('SimSun')
  doc.setFontSize(14)
  doc.text('2023年8月对账单', doc.internal.pageSize.getWidth() / 2, 10, { align: 'center' })
  doc.setFontSize(12)
  doc.text('B0546 皇朝家具定制有限公司', doc.internal.pageSize.getWidth() / 2, 20, {
    align: 'center'
  })

  doc.setFontSize(10)
  autoTable(doc, {
    head: [['序号', '业务日期', '订单号', '描述', '扣款金额', '汇款金额', '结余', '备注']],
    body: getDa(50),
    startY: 30,
    styles: {
      font: 'SimSun',
      lineWidth: 0.1,
      lineColor: '#000000',
      fontSize: 10
    },
    headStyles: {
      halign: 'center',
      fillColor: undefined,
      textColor: '#000000',
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { halign: 'center' },
      1: { halign: 'center', cellWidth: 21 },
      2: { halign: 'center', cellWidth: 40 },
      3: { cellWidth: 40 },
      4: { halign: 'center' },
      5: { halign: 'center' },
      6: { halign: 'center' }
    }
  })

  // const headers = ['序号', '性别', '爱好']
  // doc.table(10, 30, getDa(50), headers, {
  //   autoSize: true,
  //   printHeaders: true,
  //   cellStart: (a, b) => {
  //     console.log(a)
  //   }
  // })

  const dataUrl = doc.output('datauristring', { filename: '啊啊啊.pdf' })
  url.value = dataUrl
}

function getDa(s: number) {
  const ds = []
  for (let i = 0; i < s; i++) {
    ds.push([
      `${i + 1}`,
      '2023-09-01',
      'B02342300034_T10_01',
      '财务审核自动扣款',
      '3000.00',
      '4000.00',
      '-1000.00',
      ''
    ])
  }
  return ds
}
</script>
