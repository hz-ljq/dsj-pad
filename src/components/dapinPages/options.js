let data = {
  'chart': [{
    month: '1月',
    value: 138,
    ratio: 14.89
  }, {
    month: '2月',
    value: 114,
    ratio: 79.49
  }, {
    month: '3月',
    value: 714,
    ratio: 75.8
  }, {
    month: '4月',
    value: 442,
    ratio: 19.8
  }, {
    month: '5月',
    value: 622,
    ratio: 44.5
  }, {
    month: '6月',
    value: 528,
    ratio: 87.3
  }]
}

let xAxisMonth = [];
let barData = [];
let lineData = [];
for (let i = 0; i < data.chart.length; i++) {
  xAxisMonth.push(data.chart[i].month);
  barData.push({
    'name': xAxisMonth[i],
    'value': data.chart[i].value
  });
  lineData.push({
    'name': xAxisMonth[i],
    'value': data.chart[i].ratio
  });
}

let options = {
  pie1: {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      x: 'left',
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [{
      name: '访问来源',
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: 'center'
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: '30',
            fontWeight: 'bold'
          }
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [{
        value: 335,
        name: '直接访问'
      }, {
        value: 310,
        name: '邮件营销'
      }, {
        value: 234,
        name: '联盟广告'
      }, {
        value: 135,
        name: '视频广告'
      }, {
        value: 1548,
        name: '搜索引擎'
      }]
    }]
  },
  pie2: {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      x: 'left',
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [{
      name: '访问来源',
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: 'center'
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: '30',
            fontWeight: 'bold'
          }
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [{
        value: 335,
        name: '直接访问'
      }, {
        value: 310,
        name: '邮件营销'
      }, {
        value: 234,
        name: '联盟广告'
      }, {
        value: 135,
        name: '视频广告'
      }, {
        value: 1548,
        name: '搜索引擎'
      }]
    }]
  },
  bar1: {
    title: {
      text: '世界人口总量',
      subtext: '数据来自网络'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['2011年', '2012年']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
    },
    series: [{
      name: '2011年',
      type: 'bar',
      data: [18203, 23489, 29034, 104970, 131744, 630230]
    }]
  },
  bar2: {
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisTick: {
        alignWithLabel: true
      }
    }],
    yAxis: [{
      type: 'value'
    }],
    series: [{
      name: '直接访问',
      type: 'bar',
      barWidth: '60%',
      data: [10, 52, 200, 334, 390, 330, 220]
    }]
  },
  radar: {
    title: {
      text: '基础雷达图'
    },
    tooltip: {},
    legend: {
      data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
    },
    radar: {
      // shape: 'circle',
      name: {
        textStyle: {
          color: '#fff',
          backgroundColor: '#999',
          borderRadius: 3,
          padding: [3, 5]
        }
      },
      indicator: [{
        name: '销售（sales）',
        max: 6500
      }, {
        name: '管理（Administration）',
        max: 16000
      }, {
        name: '信息技术（Information Techology）',
        max: 30000
      }, {
        name: '客服（Customer Support）',
        max: 38000
      }, {
        name: '研发（Development）',
        max: 52000
      }, {
        name: '市场（Marketing）',
        max: 25000
      }]
    },
    series: [{
      name: '预算 vs 开销（Budget vs spending）',
      type: 'radar',
      // areaStyle: {normal: {}},
      data: [{
        value: [4300, 10000, 28000, 35000, 50000, 19000],
        name: '预算分配（Allocated Budget）'
      }]
    }]
  },
  'pictorial-bar': {
    backgroundColor: '#020d22',
    title: '',
    grid: {
      top: '24%',
      left: '7%',
      bottom: '6%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none'
      }
      // formatter: function(params) {
      //   return params[0]['data'].name + '<br/>' + '训练人次: ' + params[1]['data'].value + '<br/>' + '合格率: ' + params[0]['data'].value;
      // }
    },
    xAxis: [{
      type: 'category',
      show: false,
      data: ['3月', '4月', '5月', '6月', '7月', '8月'],
      axisLabel: {
        textStyle: {
          color: '#b6b5ab'
        }
      }
    }, {
      type: 'category',
      position: 'bottom',
      data: xAxisMonth,
      boundaryGap: true,
      // offset: 40,
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        textStyle: {
          color: '#b6b5ab'
        }
      }
    }],
    yAxis: [{
      show: true,
      offset: 52,
      splitLine: {
        show: false,
        lineStyle: {
          color: 'rgba(255,255,255,0.2)'
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: true
      },
      axisLabel: {
        show: true,
        color: '#b6b5ab'
      }
    }, {
      show: false,
      type: 'value',
      name: '合格率(%)',
      nameTextStyle: {
        color: '#ccc'
      },
      axisLabel: {
        color: '#ccc'
      },
      splitLine: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    }],
    color: ['#e54035'],
    series: [{
      name: '训练人次',
      type: 'pictorialBar',
      xAxisIndex: 1,
      barCategoryGap: '-80%',
      // barCategoryGap: '-5%',
      symbol: `path://d='M150 50 L130 130 L170 130  Z'`,
      itemStyle: {
        normal: {
          color: function(params) {
            let colorList = [
              'rgba(13,177,205,0.8)', 'rgba(29,103,182,0.6)',
              'rgba(13,177,205,0.8)', 'rgba(29,103,182,0.6)',
              'rgba(13,177,205,0.8)', 'rgba(29,103,182,0.6)'
            ];
            return colorList[params.dataIndex];
          }
        },
        emphasis: {
          opacity: 1
        }
      },
      data: barData
    }]
  },
  line1: {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line'
    }]
  },
  line2: {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line'
    }]
  }
}

export default options;
