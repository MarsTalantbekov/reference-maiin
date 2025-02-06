import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./proba.css";
import { ImExit } from "react-icons/im";
import { TiDelete } from "react-icons/ti";
import { RiAdminFill } from "react-icons/ri";
import { RiArrowGoBackFill } from "react-icons/ri";
import { HiClipboardDocumentList } from "react-icons/hi2";
import spinnerLoadImg from "../../assets/img/spinner.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Proba = () => {
    const [pass, setPass] = useState("");
    const [adminModal, setAdminModal] = useState(false);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [load, setLoad] = useState(false);
    const [spinnerLoad, setSpinnerLoad] = useState(false);
    const [posts, setPosts] = useState([]);
    const [formData, setFormData] = useState({
        dataWorker: "",
        dataReference: "",
        dataPost: "",
        dataTreb: "",
        dataCard: "",
        dataActual: "",
        dataReest: "",
        dataPrekr: "",
        dataAdt: "",
        dataIstreb: "",
    });

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

    const URL = "http://localhost:3004/posts";

    // Fetch all posts
    useEffect(() => {
        getPosts();
    }, []);


      const getPosts = async () => {
        try {
            const response = await fetch(URL);
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    // Add a new post
    const setPost = async (postObj) => {
        try {
            await fetch(URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(postObj),
            });
            getPosts();
        } catch (error) {
            console.error("Error adding post:", error);
        }
    };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Получаем текущую дату и время
    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, "0")}.${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}.${now.getFullYear()}`; // Формат: дд.мм.гггг
    const formattedTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes()
        .toString()
        .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`; // Формат: чч:мм:сс
    const timestamp = `${formattedDate} ${formattedTime}`; // Полный временной штамп

    const submittedData = {
      ...formData, // Копируем данные формы
      timestamp,   // Добавляем временную метку
  };


    // Проверяем, что все поля кроме dataWorker заполнены
    const { dataWorker, ...restFormData } = formData;
    const isFormValid = Object.values(restFormData).every((value) => value.trim() !== "");

    if (!isFormValid) {
        warning(); // Уведомление о незаполненной форме
        return;
    }

    // Обновляем данные формы
    const updatedFormData = { 
        ...formData, 
        dataWorker: dataInputName, 
        timestamp 
    };

    try {
        // Отправляем данные на сервер
        const response = await fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedFormData),
        });

        // Логируем статус ответа и тело ответа от сервера
        console.log('Ответ от сервера (status):', response.status);
        const responseBody = await response.json();
        console.log('Ответ от сервера (body):', responseBody);

        if (response.status === 201) {
            // Логируем успешный ответ
            toast.success("Данные успешно добавлены!", { position: "top-center" });

            setFormData({
                dataWorker: "",
                dataReference: "",
                dataPost: "",
                dataTreb: "",
                dataCard: "",
                dataActual: "",
                dataReest: "",
                dataPrekr: "",
                dataAdt: "",
                dataIstreb: "",
            });
        } else {
            // Обрабатываем ошибку, если ответ не 201
            toast.error("Ошибка при добавлении данных!", { position: "top-center" });
        }
    } catch (error) {
        // Логируем ошибку, если произошла ошибка при отправке
        console.error("Ошибка:", error);
        toast.error("Ошибка при добавлении данных!", { position: "top-center" });
    }
};
  
  

    const handleKeyDownAdmin = (e) => {
        if (e.key === "Enter") {
          goLoad();
        }
      };

    function goLoad() {
        if (adminPassword === pass) {
          setLoad(true);
          setTimeout(() => {
            nav("/dataAll");
          }, 2000);
          setLoad(true);
        } else if (pass === "") {
          warning();
        } else {
          error();
        }
      }

    const location = useLocation();
    const userName = location.state?.name || "Белгисиз"; 

    const [dataInputName, setDataInputName] = useState(userName);

      const nav = useNavigate();
      const dispatch = useDispatch();
      const adminPassword = "123";

      const warning = () => {
          toast.warning("Заполните пустые ячейки!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        };


      const success = () => {
          toast.success("Данные успешно добавлено!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        };

       const error = () => {
          toast.error("Неправильный пароль!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        };


    const exit = () => {
        setTimeout(() => {
          nav("/");
        }, 1500);
        setSpinnerLoad(true);
        setModal(false);
      };

      function goLoad() {
        if (adminPassword === pass) {
          setLoad(true);
          setTimeout(() => {
            nav("/dataAll");
          }, 2000);
          setLoad(true);
        } else if (pass === "") {
          warning();
        } else {
          error();
        }
      }

      const handleChange = (e) => {
        setDataInputName(e.target.value);
      };

      function goLoadOwn() {
        setTimeout(() => {
          nav("/dataOwn", { state: { name: userName } });
        }, 1000);
    }



    
    


    return (
        <div className="proba-form">
           <div className="user-back">
                    <button onClick={() => nav("/")} style={{ cursor: "pointer" }}>
                      <RiArrowGoBackFill />
                    </button>
                  </div>
           <form onSubmit={handleSubmit}>
                {Object.keys(formData).map((key) => (
                    <div className="formElem" key={key}>
                        <label className="label-for__form" htmlFor={key}>{labels[key]}</label>
                        {key === "dataWorker" ? (
                          <div className="dataWorker__title">
                            <h5 className="dataWorker">{dataInputName}{formData[key]}</h5>  
                          </div>
                        ) : (
                            <input
                                className="input-for__form"
                                type="text"
                                name={key}
                                id={key}
                                value={formData[key]}
                                onChange={(e) =>
                                    setFormData({ ...formData, [key]: e.target.value })
                                }
                            />
                        )}
                    </div>
                ))}
               
               <input className="input-btn" type="submit" value="Добавить" />
            </form>
            

            <button onClick={() => goLoadOwn()} className="btn-employee">
                  <HiClipboardDocumentList/>
                </button>

                <button onClick={() => setModal(!modal)} className="btn-exit">
                  <ImExit />
                </button>
                <button onClick={() => setAdminModal(true)} className="btn-admin">
                  <RiAdminFill />
                </button>
            {adminModal ? (
                    <div className="data-admin-all">
                      <div className="data-admin">
                        <TiDelete onClick={() => setAdminModal(false)} className="rem" />
                        <input
                          onChange={(e) => setPass(e.target.value)}
                          type="password"
                          placeholder="Пароль..."
                          onKeyDown={handleKeyDownAdmin}
                        />
                        <button className="btn-go__dataOwn" onClick={() => goLoad()}>Войти</button>
                        <img
                          src={spinnerLoadImg}
                          alt="img"
                          style={{
                            border: "50%",
                            position: "absolute",
                            top: "100px",
                            display: load ? "block" : "none",
                            zIndex: "499",
                          }}
                        />
                      </div>
                    </div>
            ) : null}


            {modal ? (
                <div className="modal">
                <h2>Вы уверены что хотите выйти?</h2>
                <div className="modal-btn">
                    <button className="modal-btn__ques" onClick={() => setModal(false)}>Нет</button>
                    <button className="modal-btn__ques" onClick={() => exit()}>Да</button>
                </div>
                </div>
            ) : null}
            
            
            <img
                    src={spinnerLoadImg}
                    alt="img"
                    style={{
                      border: "50%",
                      position: "absolute",
                      top: "270px",
                      left: "46%",
                      display: spinnerLoad ? "block" : "none",
                      zIndex: "499",
                      margin: "0 auto",
                    }}
                    />
            <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                    className=""
                  >
                    <img
                      src={spinnerLoadImg}
                      alt="img"
                      style={{
                        border: "50%",
                        position: "absolute",
                        top: "160px",
                        display: loading ? "block" : "none",
                        zIndex: "499",
                      }}
                    />
                    <ToastContainer />
                  </div>
        </div>
    );
};

export default Proba;
