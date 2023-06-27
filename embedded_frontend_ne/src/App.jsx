import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChartComponent from './components/chart';

const App = () => {
  const [data, setData] = useState([]);

  const startDataRefresh = () => {
    fetchData(); // Initial fetch
  
    setInterval(() => {
      fetchData();
    }, 3000); // Fetch every 3 seconds
  };
  
  useEffect(() => {
    startDataRefresh();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/data');
      setData(response.data);
      const chartData = createChartData();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <div className='w-[80%] flex flex-col items-center justify-center m-14'>
      <h1 className='font-bold text-[20px] my-4'>Temperature and Humidity Data</h1>
      {data.length > 0 ? (
        <ChartComponent data={data}/>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default App;