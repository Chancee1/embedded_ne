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
  const lastItem = data.filter((item, index, arr) => index === arr.length - 1).pop();


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
    <div className='w-[80%] flex items-center justify-around m-14'>
      <div className='w-[60%] h-[60%]'>
      <h1 className='font-bold text-[20px] my-4'>Temperature and Humidity Data</h1>
      {data.length > 0 ? (
        <ChartComponent data={data}/>
      ) : (
        <p>Loading data...</p>
      )}
      </div>
      <div>
        {lastItem?.temperature > 30 ? <div className='text-[13px] font-bold'>🥵♨️ It is hot! You can remove your pullovers</div> : <div className='text-[13px] font-bold'>🥶❄️ It is cold! Put on your pullovers</div>
        
        }
      </div>
    </div>
  );
};

export default App;