import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, PointElement} from "chart.js";
import { useEffect } from "react";

ChartJS.register(BarElement, CategoryScale, LinearScale, PointElement)

const ChartComponent = ({data}) =>{

    const formatTime = (timeString) => {
        const time = new Date(timeString);
        return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      };
      
    const labels = data.map((item) => formatTime(item.date));
    const temperatureData = data.map((item) => item.temperature);
    const humidityData = data.map((item) => item.humidity);
    const Data = {
        labels: labels,
        datasets: [
          {
            label: 'Temperature',
            data: temperatureData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'Humidity',
            data: humidityData,
            backgroundColor: 'rgba(192, 75, 192, 0.2)',
            borderColor: 'rgba(192, 75, 192, 1)',
            borderWidth: 1,
          },
        ],
    }

    const options = {
        plugins: {
            legend: true
        },
        scales: {
            y:{
                min: 0,
                max: 40
            }
        }
    }
    return(
        <div className="flex flex-col ">
            <Bar data={Data} options={options}></Bar>
            <div className="px-10 my-2 mt-10 flex items-center justify-between w-[33%]">
                <div className="bg-[#23CFCF] w-[10px] h-[2px]"></div>
                <p className="text-[12px]">Temperature</p>
            </div>
            <div className="px-10 my-2 flex items-center justify-between w-[30%]">
                <div className="bg-[#E892E6] w-[10px] h-[2px]"></div>
                <p className="text-[12px]">Humidity</p>
            </div>
        </div>
    )
}

export default ChartComponent;