import {CHART_COLORS} from "../globals/styles";
import {CHART_OPTIONS, CURRENCY} from "../globals/constants";

export const createReportChart = (state, getters, options) => {
  const chartData = prepareChartData(state, getters, options)
  switch (options.case) {
    case 'PROJECT_SELECTED':
      return {
        totalTitle: 'Project total',
        total: chartData.total,
        currency: CURRENCY,
        options: CHART_OPTIONS,
        data: chartData.data
      }
    case 'GATEWAY_SELECTED':
      return {
        totalTitle: 'Gateway total',
        total: chartData.total,
        currency: CURRENCY,
        options: CHART_OPTIONS,
        data: chartData.data
      }
  }
}
export const createReportList = (state, getters, options) => {
  switch (options.case) {
    case 'ALL_SELECTED':
      const listAllData = prepareAllListData(state, getters)
      return {
        single: false,
        currency: CURRENCY,
        total: listAllData.total,
        list: listAllData.list
      }
    case 'PROJECT_SELECTED':
    case 'GATEWAY_SELECTED':
      const listData = prepareListData(state, getters, options)
      return {
        single: false,
        currency: CURRENCY,
        list: listData.list
      }
    case 'BOTH_SELECTED':
      const singleListData = prepareSingleListData(state)
      return {
        single: true,
        total: singleListData.total,
        currency: CURRENCY,
        data: singleListData.data,
      }
  }
}

const prepareSingleListData = (state) => {
  const dataListCopy = [...state.reportResults]
  // if we need to return data for single table
  let dataList = []
  let total = 0
  dataListCopy.forEach((transaction) => {
    total += transaction.amount * 100
    dataList.push({
      date: transaction.created,
      transactionId: transaction.paymentId,
      amount: `${transaction.amount} ${CURRENCY}`
    })
  })
  return {
    total: `${total / 100}`,
    data: {
      headers: ['Date', 'Transaction ID', 'Amount'],
      dataList
    },
  }
}

const prepareAllListData = (state, getters) => {

  let total = 0
  let dataList = new Map()
  const dataListCopy = [...state.reportResults]
  dataListCopy.forEach(transaction => {
    const readyToSumAmount = transaction.amount * 100
    total += readyToSumAmount
    if (dataList.has(transaction.projectId)) {
      // if there is such project already update total and dataList
      const tempDataFromMap = dataList.get(transaction.projectId)
      dataList.set(transaction.projectId, {
        title: tempDataFromMap.title,
        // Have used complex expression to avoid duplicate iteration through Map
        total: tempDataFromMap.total + readyToSumAmount,
        data: {
          headers: ['Date', 'Gateway', 'Transaction ID', 'Amount'],
          dataList: [...tempDataFromMap.data.dataList, {
            date: transaction.created,
            gateway: getters.getGatewayById(transaction.gatewayId).name,
            transactionId: transaction.paymentId,
            amount: `${transaction.amount} ${CURRENCY}`
          }]
        },
      })
    } else {
      // if there is no such project add to Map
      dataList.set(transaction.projectId, {
        title: getters.getProjectById(transaction.projectId).name,
        total: transaction.amount,
        data: {
          headers: ['Date', 'Gateway', 'Transaction ID', 'Amount'],
          dataList: [{
            date: transaction.created,
            gateway: getters.getGatewayById(transaction.gatewayId).name,
            transactionId: transaction.paymentId,
            amount: `${transaction.amount} ${CURRENCY}`
          }]
        },
      })
    }
  })
  const arrayFromMap = prepareArrayForListData(dataList)
  return {
    total: `${total / 100}`,
    list: arrayFromMap
  }
}

const prepareListData = (state, getters, options) => {
  let idToSearch, idInnerData, dataGetterFuncName
  if (options.case === 'PROJECT_SELECTED') {
    idToSearch = 'projectId'
    idInnerData = 'gatewayId'
    dataGetterFuncName = 'getGatewayById'
  } else {
    idToSearch = 'gatewayId'
    idInnerData = 'projectId'
    dataGetterFuncName = 'getProjectById'
  }

  let dataList = new Map()
  const dataListCopy = [...state.reportResults]
  dataListCopy.forEach(transaction => {
    // recheck for errors from BE
    if (transaction[idToSearch] === options[idToSearch]) {
      const readyToSumAmount = transaction.amount * 100
      if (dataList.has(transaction[idInnerData])) {
        // if there is such project already update total and dataList
        const tempDataFromMap = dataList.get(transaction[idInnerData])
        dataList.set(transaction[idInnerData], {
          title: tempDataFromMap.title,
          total: tempDataFromMap.total + readyToSumAmount,
          data: {
            headers: ['Date', 'Transaction ID', 'Amount'],
            dataList: [...tempDataFromMap.data.dataList, {
              date: transaction.created,
              transactionId: transaction.paymentId,
              amount: `${transaction.amount} ${CURRENCY}`
            }]
          },
        })
      } else {
        // if there is no such project add to Map
        dataList.set(transaction[idInnerData], {
          title: getters[dataGetterFuncName](transaction[idInnerData]).name,
          total: readyToSumAmount,
          data: {
            headers: ['Date', 'Transaction ID', 'Amount'],
            dataList: [{
              date: transaction.created,
              transactionId: transaction.paymentId,
              amount: `${transaction.amount} ${CURRENCY}`
            }]
          },
        })
      }
    }
  })
  const arrayFromMap = prepareArrayForListData(dataList)

  return {
    list: arrayFromMap
  }
}

// DRY array preparation for UI in lists
const prepareArrayForListData = (mapList) => {
  const arrayFromMap = Array.from(mapList.values())
  // prepare for UI: make totals of datalist a string with correct
  arrayFromMap.forEach(item => {
    item.total = ((item.total / 100).toFixed(2)).toString()
  })
  arrayFromMap.sort((a, b) => {
    return a.title.localeCompare(b.title)
  })
  return arrayFromMap
}


const prepareChartData = (state, getters, options) => {
  let idToSearch, idInnerData
  if (options.case === 'PROJECT_SELECTED') {
    idToSearch = 'projectId'
    idInnerData = 'gatewayId'
  } else {
    idToSearch = 'gatewayId'
    idInnerData = 'projectId'
  }

  const dataListCopy = [...state.reportResults]
  // define data we want to save
  let total, backGroundColorIndex
  let labels = [], backgroundColors = [], dataInPercentage = []
  /*
datalist is a Map of gateways/projects with id as key and total sum as value
*/
  const dataList = new Map()
  total = 0
  dataListCopy.forEach((transaction) => {
    const readyToSumAmount = transaction.amount * 100
    if (transaction[idToSearch] === options[idToSearch]) {
      total += readyToSumAmount
      if (dataList.has(transaction[idInnerData])) {
        dataList.set(transaction[idInnerData], dataList.get(transaction[idInnerData]) + readyToSumAmount)
      } else {
        dataList.set(transaction[idInnerData], readyToSumAmount)
      }
    }
  })
  // color index is 0
  backGroundColorIndex = 0
  dataList.forEach((value, key) => {
    const valueInPrecentage = Math.round((value / total) * 100)
    if (options.case === 'PROJECT_SELECTED') {
      const currentGateway = getters.getGatewayById(key)
      labels.push(currentGateway.name)
      dataInPercentage.push(valueInPrecentage)
    } else {
      const currentProject = getters.getProjectById(key)
      labels.push(currentProject.name)
      dataInPercentage.push(valueInPrecentage)
    }
    // if we do not have any color for index start from beginning
    if (backGroundColorIndex > CHART_COLORS.length - 1) backGroundColorIndex = backGroundColorIndex % (CHART_COLORS.length - 1)
    backgroundColors.push(CHART_COLORS[backGroundColorIndex])
    backGroundColorIndex++
  })
  total = total / 100
  return {
    data: {
      labels: labels,
      datasets: [
        {
          backgroundColor: backgroundColors,
          data: dataInPercentage
        }
      ]
    },
    total: total.toString(),
  }
}