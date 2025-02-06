import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pie, Bar } from 'react-chartjs-2';
import { RiArrowGoBackFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(ChartDataLabels);
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);
import './DataAll.css';

export const DataAll = () => {
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [showCharts, setShowCharts] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [userDataChart, setUserDataChart] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [posts, setPosts] = useState([]);
  const nav = useNavigate();

  const URL = 'http://localhost:3004/posts';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        setPosts(data);
        console.log('Fetched data:', data); // Проверка данных
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const calculateTotals = () => {
    const totals = {
      dataReference: 0,
      dataPost: 0,
      dataTreb: 0,
      dataCard: 0,
      dataActual: 0,
      dataReest: 0,
      dataPrekr: 0,
      dataAdt: 0,
      dataIstreb: 0,
    };

    posts.forEach((post) => {
      Object.keys(totals).forEach((key) => {
        totals[key] += Number(post[key]) || 0; // Суммируем значения, приводя их к числу
      });
    });

    return totals;
  };

  const totals = calculateTotals();

  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);

  const handleFilterData = () => {
    if (!startDate || !endDate) {
      alert('Башталган жана бүткөн даталарды киргизиңиз!');
      return;
    }

    // Дата форматтарын текшерүү
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      alert('Даталар туура форматта киргизилгенине ынаныңыз!');
      return;
    }

    if (start > end) {
      alert('Башталган дата бүткөн датадан мурда болушу керек!');
      return;
    }

    // Даталар диапазону боюнча чыпкалоо
    const filtered = data.filter((el) => {
      const entryDate = new Date(el.timestamp);
      return entryDate >= start && entryDate <= end;
    });

    if (filtered.length === 0) {
      alert('Бул диапазондо маалымат табылган жок!');
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    if (posts.length > 0) {
      const totals = calculateTotals();
      console.log('Final totals:', totals);

      const chartData = {
        labels: [
          'Справки',
          'Пост ЦПГУ',
          'Треб Мил',
          'Влитие Карт',
          'Актуал',
          'АКТ СУД РЕЕСТ',
          'Пост ПРЕКР',
          'Пост Объявление',
          'Истребование',
        ],
        datasets: [
          {
            label: `${posts.dataWorker}`,
            data: [
              totals.dataReference,
              totals.dataPost,
              totals.dataTreb,
              totals.dataCard,
              totals.dataActual,
              totals.dataReest,
              totals.dataPrekr,
              totals.dataAdt,
              totals.dataIstreb,
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)', // Красный
              'rgba(54, 162, 235, 0.6)', // Синий
              'rgba(255, 206, 86, 0.6)', // Желтый
              'rgba(75, 192, 192, 0.6)', // Зеленый
              'rgba(153, 102, 255, 0.6)', // Фиолетовый
              'rgba(255, 159, 64, 0.6)', // Оранжевый
              'rgba(99, 255, 132, 0.6)', // Светло-зеленый
              'rgba(235, 54, 162, 0.6)', // Розовый
              'rgba(86, 255, 206, 0.6)', // Бирюзовый
              'rgba(192, 75, 192, 0.6)', // Пурпурный
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(99, 255, 132, 1)',
              'rgba(235, 54, 162, 1)',
              'rgba(86, 255, 206, 1)',
              'rgba(192, 75, 192, 1)',
            ],
          },
        ],
      };

      setChartData(chartData);
    }
  }, [posts]);

  useEffect(() => {
    if (filteredData.length > 0) {
      // Обновляем диаграмму, когда данные отфильтрованы
      const totals = calculateTotals();
      console.log('Filtered totals:', totals);

      const chartData = {
        labels: [
          'Кызматкер',
          'Справки',
          'Пост ЦПГУ',
          'Треб Мил',
          'Влитие Карт',
          'Актуал',
          'АКТ СУД РЕЕСТ',
          'Пост ПРЕКР',
          'Пост Объявление',
          'Истребование',
        ],
        datasets: [
          {
            label: 'Мои данные (отфильтрованные)',
            data: [
              totals.dataReference,
              totals.dataPost,
              totals.dataTreb,
              totals.dataCard,
              totals.dataActual,
              totals.dataReest,
              totals.dataPrekr,
              totals.dataAdt,
              totals.dataIstreb,
            ],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      };

      setChartData(chartData);
    }
  }, [filteredData]);

  const handleShowCharts = () => {
    setShowCharts(!showCharts);
    console.log('Show charts:', !showCharts); // Вывод состояния
  };

  const barOptions = {
    plugins: {
      legend: {
        display: true, // Легенду показываем
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        color: 'black',
        formatter: (value) => value, // Отображаем число в графике
        font: {
          size: 14,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'black', // Цвет текста на оси X
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: 'black', // Цвет текста на оси Y
        },
      },
    },
  };

  const pieOptions = {
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        color: 'black',
        formatter: (value) => value, // Отображаем число в графике
        font: {
          size: 14,
        },
      },
    },
  };

  return (
    <div id="dataAll">
      <div className="container">
        <div className="user-back">
          <button onClick={() => nav("/proba")} style={{ cursor: "pointer", marginBottom: "20px" }}>
            <RiArrowGoBackFill />
          </button>
        </div>
        <div className="dataAll">
          <div className="data-choose">
            <input type="date" value={startDate} onChange={handleStartDateChange} />
            <input type="date" value={endDate} onChange={handleEndDateChange} />
            <button onClick={handleFilterData}>Издөө</button>
          </div>

          <div className="data-list">
            <form action="" className="data-list__form">
              <div className="list-form__labels">
                <label>Кызматкер</label>
                <label>Справки</label>
                <label>Пост ЦПГУ</label>
                <label>Треб Мил</label>
                <label>Влитие Карт</label>
                <label>Актуал</label>
                <label>АКТ СУД РЕЕСТ</label>
                <label>Пост ПРЕКР</label>
                <label>Пост Объявление</label>
                <label>Истребование</label>
                <label>Убакыт</label>
              </div>

              <div className="list-form__labelsSecond">
                {posts && posts.length > 0 ? (
                  posts.map((post) => (
                    <div className={`user-item item${post.id}`} key={post.id}>
                      {Object.keys(post).map(
                        (key) =>
                          key !== 'id' && (
                            <p key={`${post.id}-${key}`}>
                              <span>{post[key]} </span>
                            </p>
                          )
                      )}
                    </div>
                  ))
                ) : (
                  <p>Нет данных для отображения</p>
                )}
              </div>

              <div className="data-all__labels">
                <label>Баары</label>
                <label>{totals.dataReference}</label>
                <label>{totals.dataPost}</label>
                <label>{totals.dataTreb}</label>
                <label>{totals.dataCard}</label>
                <label>{totals.dataActual}</label>
                <label>{totals.dataReest}</label>
                <label>{totals.dataPrekr}</label>
                <label>{totals.dataAdt}</label>
                <label>{totals.dataIstreb}</label>
                <label></label>
              </div>
            </form>
          </div>

          <div className="data-diogram saveBtn">
            <button onClick={handleShowCharts}>Диаграмма тузуу</button>
          </div>

          {showCharts && chartData && (
            <div className="charts">
              <div className="chart pie-chart">
                <Pie data={chartData} options={pieOptions} />
              </div>
              <div className="chart bar-chart">
                <Bar data={chartData} options={barOptions} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataAll;
