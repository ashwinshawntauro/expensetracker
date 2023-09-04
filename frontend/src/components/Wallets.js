import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

function Wallets() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/walletsChart')
      .then(response => response.json())
      .then(data => {
        // Assuming the data is an array of objects with "_api", "cash", and "bank" properties
        const dates = data.map(item => item.date);
        const cash = data.map(item => item.cash);
        const bank = data.map(item => item.bank);

        setChartData({
          labels: dates,
          datasets: [
            {
              label: 'Cash',
              fill: true,
              data: cash,
            },
            {
              label: 'Bank',
              fill: true,
              data: bank,
            }
          ]
        });
      });
  }, []);

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          display: false
        }
      }
    },
    plugins: {
      filler: {
        propagate: false,
      },
      title: {
        display: true,
        text: "Wallets"
      }
    },
    interaction: {
      intersect: false,
    },
    elements:{
      line:{
          tension:0.4
      }
    }
  };

  return (
    <div>
      {chartData && <Line data={chartData} options={options} />}
    </div>
  )
}

export default Wallets;
