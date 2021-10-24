import {
  CBadge,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useState } from 'react'
import BitcodeMdcWebsocket from 'src/service/websocketConnector'

export default function CurrentAutomateOrderUpdate(props) {
  const [automateOrderUpdate, setAutomateOrderUpdate] = useState([])
  const [websocketConnected, setWebsocketConnected] = useState(false)
  if (!websocketConnected) {
    BitcodeMdcWebsocket.subscribeAutomateOrder((message) => {
      let jsonBody = JSON.parse(message.body)
      // set update time
      jsonBody = {
        ...jsonBody,
        updateTime: getUpdateDateTime(),
      }
      setAutomateOrderUpdate((automateOrderUpdate) => [jsonBody, ...automateOrderUpdate])
    })
    setWebsocketConnected(true)
  }
  const AutomateOrderUpdateRows = automateOrderUpdate.map((row, index) => {
    const { automateOrder, automateOrderDecision, currentPrice, updateTime } = row
    const { createTime, buyInPrice, id, invest, size } = automateOrder
    const { decision } = automateOrderDecision
    return (
      <CTableRow key={index}>
        <CTableDataCell>{updateTime}</CTableDataCell>
        <CTableDataCell>{id}</CTableDataCell>
        <CTableDataCell>{invest.productId}</CTableDataCell>
        <CTableDataCell>{size}</CTableDataCell>
        <CTableDataCell>{buyInPrice}</CTableDataCell>
        <CTableDataCell>{currentPrice}</CTableDataCell>
        <CTableDataCell>{(currentPrice - buyInPrice).toFixed(6)}</CTableDataCell>
        <CTableDataCell>{(1 - currentPrice / buyInPrice).toFixed(6)}%</CTableDataCell>
        <CTableDataCell>{invest.gainSellRate}%</CTableDataCell>
        <CTableDataCell>
          <CBadge color="primary">{decision}</CBadge>
        </CTableDataCell>
      </CTableRow>
    )
  })
  return (
    <div>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>更新時間</CTableHeaderCell>
            <CTableHeaderCell>自動交易ID</CTableHeaderCell>
            <CTableHeaderCell>產品</CTableHeaderCell>
            <CTableHeaderCell>數量</CTableHeaderCell>
            <CTableHeaderCell>買入價錢</CTableHeaderCell>
            <CTableHeaderCell>當前價格</CTableHeaderCell>
            <CTableHeaderCell>差別金額</CTableHeaderCell>
            <CTableHeaderCell>盈/虧</CTableHeaderCell>
            <CTableHeaderCell>目標</CTableHeaderCell>
            <CTableHeaderCell>電腦决定</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody> {AutomateOrderUpdateRows}</CTableBody>
      </CTable>
    </div>
  )
}

function getUpdateDateTime() {
  const current = new Date()
  return `${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`
}
