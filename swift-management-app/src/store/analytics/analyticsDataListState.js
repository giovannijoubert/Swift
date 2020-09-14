const chartColors = ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E']

export default {
  currentOrders: {
    series: [{
      name: 'Orders',
      data: [28, 40, 36, 52, 38, 60, 55]
    }],
    analyticsData: {
      count: 23
    }
  },
  topItems: [{
      id: 1,
      name: 'Hawaian',
      ratio: 50,
      growthPerc: '5'
    },
    {
      id: 3,
      name: 'Quattro',
      ratio: 8,
      growthPerc: '-2'
    },
    {
      id: 2,
      name: 'Regina',
      ratio: 19,
      growthPerc: '1'
    },
    {
      id: 4,
      name: 'BBQ Chicken',
      ratio: 27,
      growthPerc: '-5'
    },
  ],
  customerCount: {
    series: [{
        name: 'Check-in',
        data: [31, 40, 28, 51, 42, 109, 100]
      }, {
        name: 'Check-out',
        data: [-11, -32, -45, -32, -34, -52, -41]
      },
      {
        name: 'Available',
        data: [20, 28, 11, 21, 20, 50, 20]
      }
    ],
    chartOptions: {
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      colors: chartColors,
      xaxis: {
        type: 'datetime',
        categories: ["2018-09-19T00:00:00", "2018-09-19T01:30:00", "2018-09-19T02:30:00",
          "2018-09-19T03:30:00", "2018-09-19T04:30:00", "2018-09-19T05:30:00",
          "2018-09-19T06:30:00"
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },

      }
    }
  },



  menuDistribution: {
    series: [144, 55, 80],
    chartOptions: {
      labels: ['Pizza', 'Pasta', 'Drinks'],
      colors: chartColors,
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }
  },
  goalOverviewRadialBar: {
    analyticsData: {
      completed: 197,
      goal: 240
    },
    series: [82],
    chartOptions: {
      plotOptions: {
        radialBar: {
          size: 110,
          startAngle: -150,
          endAngle: 150,
          hollow: {
            size: '77%',
          },
          track: {
            background: "#bfc5cc",
            strokeWidth: '50%',
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              offsetY: 18,
              color: '#99a2ac',
              fontSize: '4rem'
            }
          }
        }
      },
      colors: ['#ff6361'],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#ffa600'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        },
      },
      stroke: {
        lineCap: 'round'
      },
      chart: {
        sparkline: {
          enabled: true,
        },
        dropShadow: {
          enabled: true,
          blur: 3,
          left: 1,
          top: 1,
          opacity: 0.1
        },
      },
    }
  },
  revenueData: {
    analyticsData: {
      thisMonth: 86589,
      lastMonth: 73683
    },
    series: [{
        name: "This Month",
        data: [45000, 47000, 44800, 47500, 45500, 48000, 46500, 48600]
      },
      {
        name: "Last Month",
        data: [46000, 48000, 45500, 46600, 44500, 46500, 45000, 47000]
      }
    ],
    chartOptions: {
      chart: {
        toolbar: {
          show: true
        },
        dropShadow: {
          enabled: true,
          top: 5,
          left: 0,
          blur: 4,
          opacity: 0.10,
        },
      },
      stroke: {
        curve: 'smooth',
        dashArray: [0, 8],
        width: [4, 2],
      },
      grid: {
        borderColor: '#e7e7e7',
      },
      legend: {
        show: false,
      },
      colors: ['#F97794', '#b8c2cc'],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          inverseColors: false,
          gradientToColors: ['#7367F0', '#b8c2cc'],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        },
      },
      markers: {
        size: 0,
        hover: {
          size: 5
        }
      },
      xaxis: {
        labels: {
          style: {
            cssClass: 'text-grey fill-current',
          }
        },
        axisTicks: {
          show: false,
        },
        categories: ['01', '05', '09', '13', '17', '21', '26', '31'],
        axisBorder: {
          show: false,
        },
      },
      yaxis: {
        tickAmount: 5,
        labels: {
          style: {
            cssClass: 'text-grey fill-current',
          },
          formatter: function (val) {
            return val > 999 ? (val / 1000).toFixed(1) + 'k' : val;
          }
        }
      },
      tooltip: {
        x: {
          show: false
        }
      }
    }
  },
  avgOrderPrice: {
    series: [{
      name: "Average Price",
      data: [50, 52, 54, 49, 55, 50, 52, 54, 49]
    }],
    chartOptions: {
      chart: {
        zoom: {
          enabled: true
        }
      },
      colors: chartColors,
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      }
    }
  },
  topSellingItems: [{
    id: 1,
    name: 'Hawaian',
    totalIncome: 5510,
    ratio: 60,
    growthPerc: '5'
  },
  {
    id: 3,
    name: 'Quattro',
    totalIncome: 2820,
    ratio: 55,
    growthPerc: '-2'
  },
  {
    id: 2,
    name: 'Regina',
    totalIncome: 1992,
    ratio: 10,
    growthPerc: '1'
  },
  {
    id: 4,
    name: 'BBQ Chicken',
    totalIncome: 1500,
    ratio: 9,
    growthPerc: '-5'
  },
],
incomeByMenu: {
  series: [{
          name: 'Pizza',
          data: [440, 550, 570, 560, 610, 580, 630, 600, 660]
      }, {
          name: 'Pasta',
          data: [760, 850, 1010, 980, 870, 1050, 910, 1140, 940]
      }, {
          name: 'Drinks',
          data: [350, 410, 360, 260, 450, 480, 520, 530, 410]
  }],
  chartOptions: {
      colors: chartColors,
      plotOptions: {
          bar: {
              horizontal: false,
              endingShape: 'rounded',
              columnWidth: '55%',
          },
      },
      dataLabels: {
          enabled: false
      },
      stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
      },

      xaxis: {
          categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      },
      yaxis: {
          title: {
              text: 'ZAR (Rands)'
          }
      },
      fill: {
          opacity: 1

      },
      tooltip: {
          y: {
              formatter: function(val) {
                  return "R " + val
              }
          }
      }
  }
},
}