import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImExit } from "react-icons/im";
import { TiDelete } from "react-icons/ti";
import { RiAdminFill } from "react-icons/ri";
import { HiClipboardDocumentList } from "react-icons/hi2";
import spinnerLoadImg from "../../assets/img/spinner.svg";
// import backImg from "../../assets/img/backround8.jpg";
import backImg from "../../assets/img/data_new1.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";


const DataSearch = () => {
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [adminModal, setAdminModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [spinnerLoad, setSpinnerLoad] = useState(false);
  const data = useSelector((state) => state.data);
  const [dataInput1, setDataInput1] = useState("");
  const [dataInput2, setDataInput2] = useState("");
  const [dataInput3, setDataInput3] = useState("");
  const [dataInput4, setDataInput4] = useState("");
  const [dataInput5, setDataInput5] = useState("");
  const [dataInput6, setDataInput6] = useState("");
  const [dataInput7, setDataInput7] = useState("");
  const [dataInput8, setDataInput8] = useState("");
  const [dataInput9, setDataInput9] = useState("");
  // const [dataInput10, setDataInput10] = useState("");
  // const [dataInputName, setDataInputName] = useState("");
  
  console.log(data);

  
  const location = useLocation();
  const userName = location.state?.name || "Белгисиз"; // Маалыматты алуу
  console.log(userName, "UsNAaty");
  
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
  const handleKeyDownAdmin = (e) => {
    if (e.key === "Enter") {
      goLoad();
    }
  };

  const handleChange = (e) => {
    setDataInputName(e.target.value);
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

  function goLoadOwn() {
      setTimeout(() => {
        nav("/dataOwn", { state: { name: userName } });
      }, 1000);
  }

  // const getApi = async () => {
  //   let res = await axios(
  //     `https://api.openweathermap.org/data/2.5/weather?q=Dubai&units=metric&appid=6b4c292e3e049dbf64d6c2441cc77864&lang=ru`
  //     // `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=6b4c292e3e049dbf64d6c2441cc77864&lang=ru`
  //     // `https://jsonplaceholder.typicode.com/users`
  //     // `http://16.171.146.76/search/id/?q=3`
  //     // `http://16.171.146.76/search/id/?q=${inputValuePin}`
  //     // `http://13.60.234.99/search/id/?q=${inputValuePin}`
  //   );
  //   let { data } = await res;
  //   console.log(res);
  //   dispatch({ type: "GET", payload: data.results.users });
  // };

  // const addData = () => {
  //   if (
  //     dataInput1.trim() === "" ||
  //     dataInput2.trim() === "" ||
  //     dataInput3.trim() === "" ||
  //     dataInput4.trim() === "" ||
  //     dataInput5.trim() === "" ||
  //     dataInput6.trim() === "" ||
  //     dataInput7.trim() === "" ||
  //     dataInput8.trim() === "" ||
  //     dataInput9.trim() === "" 
  //     // dataInput10.trim() === "" 
  //   ) {
  //     warning();
  //     return;
  //   } else {
  //     const now = new Date(); // Учурдагы дата жана убакытты алуу
  //     const formattedDate = `${now.getDate().toString().padStart(2, "0")}.${(now.getMonth() + 1)
  //       .toString()
  //       .padStart(2, "0")}.${now.getFullYear()}`;
  //     const formattedTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes()
  //       .toString()
  //       .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
  
  //     const newData = {
  //       id: data.length ? data[data.length - 1].id + 1 : 1,
  //       dataInput1,
  //       dataInput2,
  //       dataInput3,
  //       dataInput4,
  //       dataInput5,
  //       dataInput6,
  //       dataInput7,
  //       dataInput8,
  //       dataInput9,
  //       // dataInput10,
  //       timestamp: `${formattedDate} ${formattedTime}`, // Убакытты кошуу
  //       dataInputName
  //     };
  //     dispatch({ type: "ADD_DATA", payload: newData });
  //     localStorage.setItem("data", JSON.stringify([...data, newData]));
  //     success();
  //     setDataInput1("");
  //     setDataInput2("");
  //     setDataInput3("");
  //     setDataInput4("");
  //     setDataInput5("");
  //     setDataInput6("");
  //     setDataInput7("");
  //     setDataInput8("");
  //     setDataInput9("");
  //     // setDataInput10("");
  //     // setDataInputName("");
  //   }
  // };

  const addData = () => {
    if (
      dataInput1.trim() === "" ||
      dataInput2.trim() === "" ||
      dataInput3.trim() === "" ||
      dataInput4.trim() === "" ||
      dataInput5.trim() === "" ||
      dataInput6.trim() === "" ||
      dataInput7.trim() === "" ||
      dataInput8.trim() === "" ||
      dataInput9.trim() === "" 
    ) {
      warning();
      return;
    } else {
      const now = new Date(); // Учурдагы дата жана убакытты алуу
      const formattedDate = `${now.getDate().toString().padStart(2, "0")}.${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}.${now.getFullYear()}`; // Күн, ай, жыл форматында
  
      const newData = {
        id: data.length ? data[data.length - 1].id + 1 : 1,
        dataInput1,
        dataInput2,
        dataInput3,
        dataInput4,
        dataInput5,
        dataInput6,
        dataInput7,
        dataInput8,
        dataInput9,
        timestamp: formattedDate, // Убакытсыз, күн, ай, жыл гана
        dataInputName,
      };
      dispatch({ type: "ADD_DATA", payload: newData });
      localStorage.setItem("data", JSON.stringify([...data, newData]));
      success();
      setDataInput1("");
      setDataInput2("");
      setDataInput3("");
      setDataInput4("");
      setDataInput5("");
      setDataInput6("");
      setDataInput7("");
      setDataInput8("");
      setDataInput9("");
    }
  };
  

  useEffect(() => {
    // getApi();
  }, []);
  return (
    <>
    <div
      style={{
        background: `url(${backImg}) no-repeat center/cover`,
      }}
      id="dataSearch"
    >
      <div className="container">
      <div className="">
        <button onClick={() => goLoadOwn()} className="btn-employee">
        <HiClipboardDocumentList/>
        </button>
      </div>
        <div className="dataSearch">
         <div className="dateInput">
          <div className="table-container">
          <table className="styled-table-horizontal">
            <thead>
        <tr>
            <th>Кызматкер</th>
            <th>Справки</th>
            <th>Пост ЦПГУ</th>
            <th>Треб Мил</th>
            <th>Влитие Карт</th>
            <th>Актуал</th>
            <th>АКТ СУД РЕЕСТ</th>
            <th>Пост ПРЕКР</th>
            <th>Пост Объявление</th>
            <th>Истребование</th>
           {/* <th>Маалымат 10</th>  */}
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>
            {/* <input onChange={(e) => setDataInputName(e.target.value)} value={dataInputName} type="text" className="table-input"/> */}
            {/* <input  onChange={handleChange} value={dataInputName} type="text" className="table-input"/> */}
            {<h5>{dataInputName}</h5>}
          </th>
            {/* <h2>{userName}</h2> */}
          <th>












            <input onChange={(e) => setDataInput1(e.target.value)} value={dataInput1} name="dataInput1" id="dataInput1" type="text" className="table-input"/>
          </th>
          <th>
            <input onChange={(e) => setDataInput2(e.target.value)} value={dataInput2} name="dataInput2" id="dataInput2" type="text" className="table-input"/>
          </th>
          <th>
            <input onChange={(e) => setDataInput3(e.target.value)} value={dataInput3} name="dataInput3" id="dataInput3" type="text" className="table-input"/>
          </th>
          <th>
            <input onChange={(e) => setDataInput4(e.target.value)} value={dataInput4} name="dataInput4" id="dataInput4" type="text" className="table-input"/>
          </th>
          <th>
            <input onChange={(e) => setDataInput5(e.target.value)} value={dataInput5} name="dataInput5" id="dataInput5" type="text" className="table-input"/>
          </th>
          <th>
            <input onChange={(e) => setDataInput6(e.target.value)} value={dataInput6} name="dataInput6" id="dataInput6" type="text" className="table-input"/>
          </th>
          <th>
            <input onChange={(e) => setDataInput7(e.target.value)} value={dataInput7} name="dataInput7" id="dataInput7" type="text" className="table-input"/>
          </th>
          <th>
            <input onChange={(e) => setDataInput8(e.target.value)} value={dataInput8} name="dataInput8" id="dataInput8" type="text" className="table-input"/>
          </th>
          <th>
            <input onChange={(e) => setDataInput9(e.target.value)} value={dataInput9} name="dataInput9" id="dataInput9" type="text" className="table-input"/>
          </th>
          {/* <th>
            <input onChange={(e) => setDataInput10(e.target.value)} value={dataInput10} type="text" className="table-input"/>
          </th> */}
        </tr>
      </tbody>
    </table>
  </div>
  
  <div className="saveBtn">
    <button onClick={addData}>Сактоо</button>
  </div>













        </div>
        </div>
      </div>
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
            <button onClick={() => goLoad()}>Войти</button>
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
      <div className="exit">
        <button onClick={() => setModal(!modal)} className="btn-exit">
          <ImExit />
        </button>
         <button onClick={() => setAdminModal(true)} className="btn-admin">
          <RiAdminFill />
        </button>
      </div>
      {modal ? (
        <div className="modal">
          <h2>Вы уверены что хотите выйти?</h2>
          <div className="modal-btn">
            <button onClick={() => setModal(false)}>Нет</button>
            <button onClick={() => exit()}>Да</button>
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
    </>
  );
};

export default DataSearch;
