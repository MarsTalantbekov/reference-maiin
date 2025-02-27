import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../../redux/actions";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { RiArrowGoBackFill } from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";
import "./DataOwn.css";

const DataOwn = () => {
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({});
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const URL = "http://localhost:3004/posts";
  const [dataLabels, setDataLabels] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const nav = useNavigate();
  

  const location = useLocation();
  const userName = location.state?.name || "Белгисиз"; // Маалыматты алуу
  console.log(userName, "UsNAaty OWN");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const labels = {
    dataWorker: "Кызматкер",
    dataReference: "Справки",
    dataPost: "Пост ЦПГУ",
    dataTreb: "Треб Мил",
    dataCard: "Влитие Карт",
    dataActual: "Актуал",
    dataReest: "АКТ СУД РЕЕСТ",
    dataPrekr: "Пост ПРЕКР",
    dataAdt: "Пост Объявление",
    dataIstreb: "Истребование",
  };

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

  const handleEdit = (item) => {
    if (!item) {
      console.error("Error: The item is undefined.");
      return;
    }

    console.log("Editing item:", item); // Для проверки, что объект корректно передан
    setEditItem(item); // Сохраняем редактируемый объект
    setFormData({ ...item }); // Заполняем форму значениями из объекта
  };

  const handleChange = (e) => {
    const { name, value } = e.target; // Получаем имя и значение поля
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Обновляем только то поле, которое изменилось
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // предотвращаем стандартное поведение, например, отправку формы
  
      // Проверка, изменились ли данные
      const hasChanges = Object.keys(formData).some(
        (key) => formData[key] !== editItem[key]
      );
  
     
  
      // Если данные изменены и мы не в процессе сохранения, сохраняем
      if (hasChanges && !isSaving) {
        handleSave();
      }
    }
  };
  
  // Функция сохранения
  const handleSave = async () => {
    if (!editItem || !editItem.id) {
      toast.error("Ошибка: Отсутствует элемент для редактирования.");
      return;
    }
  
    // Проверка, изменились ли данные
    const hasChanges = Object.keys(formData).some(
      (key) => formData[key] !== editItem[key]
    );
  
    if (!hasChanges) {
      toast.error("Данные не изменились!"); // Показываем ошибку, если данных нет
      return;
    }
  
    try {
      setIsSaving(true); // Устанавливаем флаг начала сохранения
  
      const response = await fetch(`${URL}/${editItem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error(`Ошибка сохранения данных: ${response.status}`);
      }
  
      const updatedPost = await response.json();
  
      // Обновляем состояние с новыми данными
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        )
      );
  
      setEditItem(null); // Закрываем модальное окно
  
      // Уведомление об успешном сохранении
      toast.success("Данные успешно сохранены!");
    } catch (error) {
      // Уведомление об ошибке при сохранении
      console.error("Ошибка обновления данных:", error);
      toast.error("Ошибка при сохранении данных!");
    } finally {
      setIsSaving(false); // Сбрасываем флаг после завершения процесса
    }
  };
  
  
  
  

  // Добавляем обработчик в useEffect для модального окна
  useEffect(() => {
    if (editItem) {
      window.addEventListener("keydown", handleKeyDown);
  
      // Очистка обработчика при удалении editItem
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [editItem]);


  


  // const totalPostsM1 = posts.reduce((acc, post) => acc + Number(post.dataInput1 || 0), 0);
  // const totalPostsM2 = posts.reduce((acc, post) => acc + Number(post.dataInput2 || 0), 0);
  // const totalPostsM3 = posts.reduce((acc, post) => acc + Number(post.dataInput3 || 0), 0);
  // const totalPostsM4 = posts.reduce((acc, post) => acc + Number(post.dataInput4 || 0), 0);
  // const totalPostsM5 = posts.reduce((acc, post) => acc + Number(post.dataInput5 || 0), 0);
  // const totalPostsM6 = posts.reduce((acc, post) => acc + Number(post.dataInput6 || 0), 0);
  // const totalPostsM7 = posts.reduce((acc, post) => acc + Number(post.dataInput7 || 0), 0);
  // const totalPostsM8 = posts.reduce((acc, post) => acc + Number(post.dataInput8 || 0), 0);
  // const totalPostsM9 = posts.reduce((acc, post) => acc + Number(post.dataInput9 || 0), 0);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div id="dataOwn">
      <div className="container">
        <div className="user-back">
          <button onClick={() => nav("/proba")} style={{ cursor: "pointer" }}>
            <RiArrowGoBackFill />
          </button>
        </div>
        <div className="dataOwn">
          <div className="data-list">
            <form action="" className="data-list__form">
              <div className="list-form__labels">
                <label htmlFor="">Кызматкер</label>
                <label htmlFor="">Справки</label>
                <label htmlFor="">Пост ЦПГУ</label>
                <label htmlFor="">Треб Мил</label>
                <label htmlFor="">Влитие Карт</label>
                <label htmlFor="">Актуал</label>
                <label htmlFor="">АКТ СУД РЕЕСТ</label>
                <label htmlFor="">Пост ПРЕКР</label>
                <label htmlFor="">Пост Объявление</label>
                <label htmlFor="">Истребование</label>
                <label htmlFor="">Убакыт</label>
                <label htmlFor="">Action</label>
              </div>
              <div className="list-form__labelsSecond">
                {posts && posts.length > 0 ? (
                  posts.map((post) => (
                    <div className={`user-item item${post.id}`} key={post.id}>
                      {Object.keys(post).map(
                        (key) =>
                          key !== "id" && (
                            <p key={`${post.id}-${key}`}>
                              <span>{post[key]} </span>
                            </p>
                          )
                      )}
                      {/* Добавляем кнопку в конец каждого списка */}
                      <div className="btn-list">
                        <button
                          type="button"
                          className="list-button"
                          onClick={() => handleEdit(post)}
                        >
                          Изменить
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Нет данных для отображения</p>
                )}
              </div>

              <div className="data-all__labels">
                <label htmlFor="">Баары</label>
                <label htmlFor="">{totals.dataReference}</label>
                <label htmlFor="">{totals.dataPost}</label>
                <label htmlFor="">{totals.dataTreb}</label>
                <label htmlFor="">{totals.dataCard}</label>
                <label htmlFor="">{totals.dataActual}</label>
                <label htmlFor="">{totals.dataReest}</label>
                <label htmlFor="">{totals.dataPrekr}</label>
                <label htmlFor="">{totals.dataAdt}</label>
                <label htmlFor="">{totals.dataIstreb}</label>
                <label htmlFor=""></label>
                <label htmlFor=""></label>
              </div>
            </form>
          </div>

          {editItem && (
            <div className="modalOwn">
              <h1>Маалымат өзгөртүү</h1>
              <div className="table-container">
                <table className="styled-table-horizontal">
                  <thead>
                    <tr>
                      <th>Справки</th>
                      <th>Пост ЦПГУ</th>
                      <th>Треб Мил</th>
                      <th>Влитие Карт</th>
                      <th>Актуал</th>
                      <th>АКТ СУД РЕЕСТ</th>
                      <th>Пост ПРЕКР</th>
                      <th>Пост Объявление</th>
                      <th>Истребование</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>
                        <input
                          className="modalOwnInput"
                          name="dataReference"
                          value={formData.dataReference || ""}
                          onKeyDown={handleKeyDown}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              dataReference: e.target.value,
                            })
                          }
                        />
                      </th>
                      <th>
                        <input
                          className="modalOwnInput"
                          name="dataPost"
                          value={formData.dataPost || ""}
                          onKeyDown={handleKeyDown}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              dataPost: e.target.value,
                            })
                          }
                        />
                      </th>
                      <th>
                        <input
                          className="modalOwnInput"
                          name="dataTreb"
                          value={formData.dataTreb || ""}
                          onKeyDown={handleKeyDown}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              dataTreb: e.target.value,
                            })
                          }
                        />
                      </th>
                      <th>
                        <input
                          className="modalOwnInput"
                          name="dataCard"
                          value={formData.dataCard || ""}
                          onKeyDown={handleKeyDown}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              dataCard: e.target.value,
                            })
                          }
                        />
                      </th>
                      <th>
                        <input
                          className="modalOwnInput"
                          name="dataActual"
                          value={formData.dataActual || ""}
                          onKeyDown={handleKeyDown}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              dataActual: e.target.value,
                            })
                          }
                        />
                      </th>
                      <th>
                        <input
                          className="modalOwnInput"
                          name="dataReest"
                          value={formData.dataReest || ""}
                          onKeyDown={handleKeyDown}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              dataReest: e.target.value,
                            })
                          }
                        />
                      </th>
                      <th>
                        <input
                          className="modalOwnInput"
                          name="dataPrekr"
                          value={formData.dataPrekr || ""}
                          onKeyDown={handleKeyDown}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              dataPrekr: e.target.value,
                            })
                          }
                        />
                      </th>
                      <th>
                        <input
                          className="modalOwnInput"
                          name="dataAdt"
                          value={formData.dataAdt || ""}
                          onKeyDown={handleKeyDown}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              dataAdt: e.target.value,
                            })
                          }
                        />
                      </th>
                      <th>
                        <input
                          className="modalOwnInput"
                          name="dataIstreb"
                          // onKeyDown={handleKeyDownAdmin}
                          value={formData.dataIstreb || ""}
                          onKeyDown={handleKeyDown}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              dataIstreb: e.target.value,
                            })
                          }
                        />
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="modal-btns">
                <button 
                className="btn-own-save" 
                onClick={handleSave}
                >
                  Сактоо
                </button>

                <button 
                className="btn-own-close" 
                onClick={() => setEditItem(null)}>
                  Жабуу
                  </button>

              </div>
            </div>
          )}

          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default DataOwn;