import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function Cat_pie2() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/income')
      .then(response => response.json())
      .then(data => {
        // Assuming the data is an array of objects with "category" and "total" properties
        const categories = data.map(item => item._id);
        const totals = data.map(item => item.total);

        setChartData({
          labels: categories,
          datasets: [
            {
                data: totals,
            }
          ]
        });
      });
  }, []);

  const options = {
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Income'
      }
    },
    responsive: true
  }

  return (
    <div>
      {chartData && <Doughnut data={chartData} options={options} />}
    </div>
  )
}

export default Cat_pie2;
