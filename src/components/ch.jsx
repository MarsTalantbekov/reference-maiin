<tbody>
{filteredData.length > 0 ? (
  filteredData.map((el, idx) => (
    <tr key={idx}>
      <th>
        <h2>{el.dataInputName}</h2> {/* Колдонуучунун аты */}
      </th>
      <th>
        <h2>{parseInt(el.dataInput1) || 0}</h2> {/* Маалымат 1 */}
      </th>
      <th>
        <h2>{parseInt(el.dataInput2) || 0}</h2> {/* Маалымат 2 */}
      </th>
      <th>
        <h2>{parseInt(el.dataInput3) || 0}</h2> {/* Маалымат 3 */}
      </th>
      <th>
        <h2>{parseInt(el.dataInput4) || 0}</h2> {/* Маалымат 4 */}
      </th>
      <th>
        <h2>{parseInt(el.dataInput5) || 0}</h2> {/* Маалымат 5 */}
      </th>
      <th>
        <h2>{parseInt(el.dataInput6) || 0}</h2> {/* Маалымат 6 */}
      </th>
      <th>
        <h2>{parseInt(el.dataInput7) || 0}</h2> {/* Маалымат 7 */}
      </th>
      <th>
        <h2>{parseInt(el.dataInput8) || 0}</h2> {/* Маалымат 8 */}
      </th>
      <th>
        <h2>{parseInt(el.dataInput9) || 0}</h2> {/* Маалымат 9 */}
      </th>
      <th>
        <h2>{parseInt(el.dataInput10) || 0}</h2> {/* Маалымат 10 */}
      </th>
      <th>
        <h4>{el.timestamp}</h4> {/* Убакыт */}
      </th>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="12" style={{ textAlign: "center" }}>
      Маалымат табылган жок
    </td>
  </tr>
)}
              </tbody>





import React, { useEffect, useState } from 'react';
import backImg from "../../assets/img/home_new1.webp";
import { useDispatch, useSelector } from 'react-redux';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(ChartDataLabels);
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export const DataAll = () => {
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [showChart, setShowChart] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [userDataChart, setUserDataChart] = useState([]);

  const [startDate, setStartDate] = useState("");  
const [endDate, setEndDate] = useState("");
const [filteredData, setFilteredData] = useState(data);
const handleStartDateChange = (e) => setStartDate(e.target.value);  
const handleEndDateChange = (e) => setEndDate(e.target.value);
const handleFilterData = () => {  
  if (!startDate || !endDate) {
    alert("Башталган жана бүткөн даталарды киргизиңиз!");
    return;
  }
  const filtered = data.filter((el) => {
    const entryDate = new Date(el.timestamp);  
    const start = new Date(startDate);  
    const end = new Date(endDate);  
    return entryDate >= start && entryDate <= end;  
  });
  setFilteredData(filtered);  
};






  const totalM1 = data.reduce((acc, el) => {
    return (acc += +el.dataInput1);
  }, 0);
  const totalM2 = data.reduce((acc, el) => {
    return (acc += +el.dataInput2);
  }, 0);
  const totalM3 = data.reduce((acc, el) => {
    return (acc += +el.dataInput3);
  }, 0);
  const totalM4 = data.reduce((acc, el) => {
    return (acc += +el.dataInput4);
  }, 0);
  const totalM5 = data.reduce((acc, el) => {
    return (acc += +el.dataInput5);
  }, 0);
  const totalM6 = data.reduce((acc, el) => {
    return (acc += +el.dataInput6);
  }, 0);
  const totalM7 = data.reduce((acc, el) => {
    return (acc += +el.dataInput7);
  }, 0);
  const totalM8 = data.reduce((acc, el) => {
    return (acc += +el.dataInput8);
  }, 0);
  const totalM9 = data.reduce((acc, el) => {
    return (acc += +el.dataInput9);
  }, 0);
  const totalM10 = data.reduce((acc, el) => {
    return (acc += +el.dataInput10);
  }, 0);

  useEffect(() => {
    if (filteredData.length > 0) {
      // Жаңы диаграмманы чагылдыруу үчүн chartData'ны жаңыртыңыз
    }
    if (data && data.length > 0) {
      // Түпнуска маалыматтар
      const labels = [
        "Маалымат 1",
        "Маалымат 2",
        "Маалымат 3",
        "Маалымат 4",
        "Маалымат 5",
        "Маалымат 6",
        "Маалымат 7",
        "Маалымат 8",
        "Маалымат 9",
        "Маалымат 10",
      ];
      const dataValues = [
        data.reduce((sum, item) => sum + (parseInt(item.dataInput1) || 0), 0),
        data.reduce((sum, item) => sum + (parseInt(item.dataInput2) || 0), 0),
        data.reduce((sum, item) => sum + (parseInt(item.dataInput3) || 0), 0),
        data.reduce((sum, item) => sum + (parseInt(item.dataInput4) || 0), 0),
        data.reduce((sum, item) => sum + (parseInt(item.dataInput5) || 0), 0),
        data.reduce((sum, item) => sum + (parseInt(item.dataInput6) || 0), 0),
        data.reduce((sum, item) => sum + (parseInt(item.dataInput7) || 0), 0),
        data.reduce((sum, item) => sum + (parseInt(item.dataInput8) || 0), 0),
        data.reduce((sum, item) => sum + (parseInt(item.dataInput9) || 0), 0),
        data.reduce((sum, item) => sum + (parseInt(item.dataInput10) || 0), 0),
      ];
      setChartData({
        labels,
        datasets: [
          {
            label: "Маалыматтар",
            data: dataValues,
            backgroundColor: [
              "rgba(255, 99, 132, 0.8)",
              "rgba(54, 162, 235, 0.8)",
              "rgba(255, 206, 86, 0.8)",
              "rgba(75, 192, 192, 0.8)",
              "rgba(153, 102, 255, 0.8)",
              "rgba(255, 159, 64, 0.8)",
              "rgba(199, 199, 199, 0.8)",
              "rgba(83, 102, 255, 0.8)",
              "rgba(255, 144, 86, 0.8)",
              "rgba(102, 255, 179, 0.8)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(199, 199, 199, 1)",
              "rgba(83, 102, 255, 1)",
              "rgba(255, 144, 86, 1)",
              "rgba(102, 255, 179, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
      // Колдонуучулар үчүн жыйынтыктарды жыйноо
      const userMap = data.reduce((acc, item) => {
        const userName = item.dataInputName;
        // Маалыматтарды топтоо
        const userData = [
          item.dataInput1,
          item.dataInput2,
          item.dataInput3,
          item.dataInput4,
          item.dataInput5,
          item.dataInput6,
          item.dataInput7,
          item.dataInput8,
          item.dataInput9,
          item.dataInput10,
        ];
        // Колдонуучунун аты боюнча топтоо
        if (!acc[userName]) {
          acc[userName] = Array(10).fill(0);  // Маалымат 1ден 10го чейин эсепке алууну баштоо
        }
        userData.forEach((value, index) => {
          if (value) {
            acc[userName][index] += parseInt(value); // Маалыматтарды жыйноо (кошуу)
          }
        });
        return acc;
      }, {});

      // Ар бир колдонуучу үчүн диаграмманы түзүү
      const userCharts = Object.keys(userMap).map(userName => {
        return {
          userName,
          chart: {
            labels: [
              "Маалымат 1",
              "Маалымат 2",
              "Маалымат 3",
              "Маалымат 4",
              "Маалымат 5",
              "Маалымат 6",
              "Маалымат 7",
              "Маалымат 8",
              "Маалымат 9",
              "Маалымат 10",
            ],
            datasets: [
              {
                label: `${userName} жыйынтыктары`,
                data: userMap[userName],
                backgroundColor: "rgba(75, 192, 192, 0.8)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          },
        };
      });
      setUserDataChart(userCharts); // Бардык колдонуучулардын диаграммаларын сактоо
    }
  }, [data, filteredData]);
  const barOptions = {
    plugins: {
      legend: {
        display: true, // Легенданы көрсөтүү
      },
      datalabels: {
        anchor: "end",
        align: "end",
        color: "black",
        formatter: (value) => value, // Ар бир тилкенин санын көрсөтүү
        font: {
          size: 14,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "black", // X огу үчүн тексттин түсү
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "black", // Y огу үчүн тексттин түсү
        },
      },
    },
  };
  
  return (
    <div
      style={{
        // background: `url(${backImg}) no-repeat center/cover`,
      }}
      id="dataAll"
    >
      <div className="container">
        <div className="dataAll">
        <div className="data-choose">  
  <input type="date" value={startDate} onChange={handleStartDateChange} />  
  <input type="date" value={endDate} onChange={handleEndDateChange} />  
  <button onClick={handleFilterData}>Издөө</button>  
</div>



          <div className="dateInput">
            <div className="table-container">
              <table className="styled-table-horizontal">
                <thead>
                  <tr>
                    <th>Кызматкер</th>
                    <th>Маалымат 1</th>
                    <th>Маалымат 2</th>
                    <th>Маалымат 3</th>
                    <th>Маалымат 4</th>
                    <th>Маалымат 5</th>
                    <th>Маалымат 6</th>
                    <th>Маалымат 7</th>
                    <th>Маалымат 8</th>
                    <th>Маалымат 9</th>
                    <th>Маалымат 10</th>
                    <th>Убакыт</th>
                  </tr>
                </thead>
                {/* <tbody>
                  {data.length > 0 ? (
                    data.map((el, idx) => (
                      <tr key={idx}>
                        <th>
                          <h2>{el.dataInputName}</h2>
                        </th>
                        <th>
                          <h2>{parseInt(el.dataInput1) || 0}</h2>
                        </th>
                        <th>
                          <h2>{parseInt(el.dataInput2) || 0}</h2>
                        </th>
                        <th>
                          <h2>{parseInt(el.dataInput3) || 0}</h2>
                        </th>
                        <th>
                          <h2>{parseInt(el.dataInput4) || 0}</h2>
                        </th>
                        <th>
                          <h2>{parseInt(el.dataInput5) || 0}</h2>
                        </th>
                        <th>
                          <h2>{parseInt(el.dataInput6) || 0}</h2>
                        </th>
                        <th>
                          <h2>{parseInt(el.dataInput7) || 0}</h2>
                        </th>
                        <th>
                          <h2>{parseInt(el.dataInput8) || 0}</h2>
                        </th>
                        <th>
                          <h2>{parseInt(el.dataInput9) || 0}</h2>
                        </th>
                        <th>
                          <h2>{parseInt(el.dataInput10) || 0}</h2>
                        </th>
                        <th>
                          <h4>{el.timestamp}</h4>
                        </th>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="11">Маалымат табылган жок</td>
                    </tr>
                  )}
                </tbody> */}
             <tbody>
  {filteredData && filteredData.length > 0 ? (
    filteredData.map((el, idx) => (
      <tr key={idx}>
        <td>
          <h2>{el.dataInputName || "Аты жок"}</h2>
        </td>
        <td>
          <h2>{parseInt(el.dataInput1) || 0}</h2>
        </td>
        <td>
          <h2>{parseInt(el.dataInput2) || 0}</h2>
        </td>
        <td>
          <h2>{parseInt(el.dataInput3) || 0}</h2>
        </td>
        <td>
          <h2>{parseInt(el.dataInput4) || 0}</h2>
        </td>
        <td>
          <h2>{parseInt(el.dataInput5) || 0}</h2>
        </td>
        <td>
          <h2>{parseInt(el.dataInput6) || 0}</h2>
        </td>
        <td>
          <h2>{parseInt(el.dataInput7) || 0}</h2>
        </td>
        <td>
          <h2>{parseInt(el.dataInput8) || 0}</h2>
        </td>
        <td>
          <h2>{parseInt(el.dataInput9) || 0}</h2>
        </td>
        <td>
          <h2>{parseInt(el.dataInput10) || 0}</h2>
        </td>
        <td>
          <h4>{el.timestamp || "Белгиленген эмес"}</h4>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="12" style={{ textAlign: "center" }}>
        Маалымат табылган жок
      </td>
    </tr>
  )}
</tbody>


                <tbody>
                <tr style={{
                  background: "#19556d",
                  color: "white"
                }}>
                        <th>
                          <h2>Баары</h2>
                        </th>
                        <th>
                          <h2>{totalM1}</h2>
                        </th>
                        <th>
                          <h2>{totalM2}</h2>
                        </th>
                        <th>
                          <h2>{totalM3}</h2>
                        </th>
                        <th>
                          <h2>{totalM4}</h2>
                        </th>
                        <th>
                          <h2>{totalM5}</h2>
                        </th>
                        <th>
                          <h2>{totalM6}</h2>
                        </th>
                        <th>
                          <h2>{totalM7}</h2>
                        </th>
                        <th>
                          <h2>{totalM8}</h2>
                        </th>
                        <th>
                          <h2>{totalM9}</h2>
                        </th>
                        <th>
                          <h2>{totalM10}</h2>
                        </th>
                        <th>
                          <h2></h2>
                        </th>
                      </tr>
                </tbody>
              </table>
            </div>
              </div>
          <div className="data-diogram saveBtn">
            <button
              onClick={() => {
                if (data && data.length > 0) {
                  setShowChart(true);
                } else {
                  alert("Диаграмма түзүү үчүн маалымат жок!");
                }
              }}
            >
              Диограмма түзүү
            </button>
          </div>
          {showChart && chartData && (
            <div style={{ marginTop: "20px" }}>
              <div style={{ width: "700px", height: "700px", margin: "0 auto" }}>
                <Pie data={chartData} />
              </div>
              <div style={{ width: "1300px", height: "1000px", margin: "20px auto" }}>
                <Bar data={chartData} />
              </div>
              {userDataChart.map((userChart, idx) => (
               <div key={idx} style={{ width: "1200px", height: "1000px", margin: "-20px auto" }}>
                  <h3>{userChart.userName} үчүн диаграмма</h3>
                  <Bar data={userChart.chart} options={barOptions} />
               </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

