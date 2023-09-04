import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

function Exp_bar() {
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
              label: 'Amount',
              data: totals,
              backgroundColor: '#352F44',
              borderRadius:'5'
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
  };

  return (
    <div>
      {chartData && <Bar data={chartData} options={options} />}
    </div>
  )
}

export default Exp_bar;
