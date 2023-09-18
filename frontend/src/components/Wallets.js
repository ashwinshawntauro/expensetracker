import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

function Wallets() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/date')
      .then(response => response.json())
      .then(data => {
        // Assuming the data is an array of objects with "date" and "total" properties
        const dates = data.map(item => item._id);
        const totals = data.map(item => item.total); 

        setChartData({
          labels: dates,
          datasets: [
            {
              data: totals,
              backgroundColor: '#352F44',
              borderColor: '#352F44',
              borderRadius:'5',
            }
          ]
        });
      });
  }, []);

  const options = {
    responsive: true,
    plugins:{
      legend: {
        display: false
      },
      title:{
        display:"false"
      }
    },
    elements:{
      line:{
        tension:0.4
      }
    },
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
  };

  return (
    <div>
      {chartData && <Line data={chartData} options={options} />}
    </div>
  )
}

export default Wallets;
