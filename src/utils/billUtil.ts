import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

export type BillPpdfData = {
  title: string
  dealerNo: string
  data: Array<string[]>
  sgin?: string
  user?: string
}

export const createBillPdf = (bd: BillPpdfData) => {
  const doc = new jsPDF()
  // 设置字体
  doc.setFont('SimSun')
  // 顶部大标题
  doc.setFontSize(14)
  doc.text(bd.title, doc.internal.pageSize.getWidth() / 2, 10, { align: 'center' })
  // 二级标题
  doc.setFontSize(12)
  doc.text(bd.dealerNo, doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' })
  // 内容使用10号字体
  doc.setFontSize(10)

  const state = {
    y: 20,
    page: 1
  }

  autoTable(doc, {
    head: [['序号', '业务日期', '订单号', '描述', '扣款金额', '汇款金额', '结余', '备注']],
    body: bd.data,
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
      2: { halign: 'left', cellWidth: 38 },
      3: { cellWidth: 40 },
      4: { halign: 'right' },
      5: { halign: 'right' },
      6: { halign: 'right' }
    },
    didDrawPage: (data) => {
      state.y = data.cursor!.y
      state.page = data.pageNumber
    }
  })

  if (state.y > 270) {
    doc.addPage()
    state.y = 0
  }

  doc.text('日期: ' + getDateStr(), 10, state.y + 10, {})
  doc.text('确认: ', 130, state.y + 10, {})

  if (bd.user) {
    doc.text(bd.user, 140, state.y + 10)
  }

  if (bd.sgin && !bd.user) {
    // console.log(bd.sgin)
    doc.addImage(bd.sgin, 'png', 140, state.y + 5, 35, 20, undefined, 'FAST')
  }

  return doc.output('datauristring', { filename: `${bd.title}.pdf` })
}

/**
 * 获取当前日期字符串 yyyy-MM-dd HH:mm:ss
 */
function getDateStr() {
  const d = new Date()
  return `${pd2(d.getFullYear())}-${pd2(d.getMonth())}-${pd2(d.getDay())} ${pd2(d.getHours())}:${pd2(d.getMinutes())}:${pd2(d.getSeconds())}`
}

/**
 * 返回一个两位数的字符数字
 * @param n
 */
function pd2(n: number) {
  return n.toString().padStart(2, '0')
}
