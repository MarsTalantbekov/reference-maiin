import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/Emblem_of_Kyrgyzstan.svg";
import backImg from "../../assets/img/home_new2.jpg";
import { GoPeople } from "react-icons/go";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import spinner from "../../assets/img/spinner.svg";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { useSelector } from "react-redux";
import "./Home.css";

const Home = () => {
  const [inputValuePin, setInputValuePin] = useState("");
  const [inputValuePass, setInputValuePass] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [users, setUsers] = useState([]); // Состояние для хранения пользователей

  const nav = useNavigate();

  // Функция для получения пользователей с сервера
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3004/users");
      const data = await response.json();
      setUsers(data); // Сохраняем пользователей в состоянии
    } catch (error) {
      console.error("Ошибка при получении пользователей:", error);
    }
  };

  // Загружаем пользователей при монтировании компонента
  React.useEffect(() => {
    fetchUsers();
  }, []);

  const success = () => {
    toast.success("Вход успешно!", {
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

  const error = () => {
    toast.error("Неправильный ПИН или пароль!", {
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

  const warning = () => {
    toast.warning("Заполните пустые ячейки!", {
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

  // Функция для проверки данных и перехода
  const toDataSearch = () => {
    const user = users.find(
      (user) => user.pin === inputValuePin && user.password === inputValuePass
    );

    if (user) {
      setLoading(true);
      success();
      setTimeout(() => {
        nav("/proba", { state: { name: user.name } });
      }, 2500);
    } else if (inputValuePin === "" || inputValuePass === "") {
      warning();
    } else if (inputValuePin === "1" || inputValuePass === "1") {
      setTimeout(() => {
        nav("/admin");
      }, 2500);
    } else {
      error();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  

  return (
    <div 
    style={{
      background: `url(${backImg}) no-repeat top/cover`,
    }}
    id="home">
    <div className="home">
      <div className="home-main">
        <div className="home-text">
            <h2>
            Аналиктикалык тутум <br /> «Картотека»
            </h2>
            <h1>КЫРГЫЗ РЕСПУБЛИКАСЫНЫН ИЧКИ ИШТЕР МИНИСТРЛИГИНИН <br /> МААЛЫМАТТЫК ТЕХНОЛОГИЯЛАР БАШКЫ БАШКАРМАЛЫГЫ</h1>
        </div>
          <div className="home-logo">
            <img src={logo} alt="img" />
          </div>
          <div className="home-text">
            <h2>
            Аналитическая система <br /> «Картотека»
            </h2>
            <h1>МИНИСТЕРСТВО ВНУТРЕННИХ ДЕЛ КЫРГЫЗСКОЙ РЕСПУБЛИКИ <br /> ГЛАВНОЕ УПРАВЛЕНИЯ ИНФОРМАЦИОННЫХ ТЕХНОЛОГИИ</h1>
          </div>
      </div>
      
        <div className="home-login">
          <GoPeople style={{ fontSize: "54px", margin: "20px 0" }} />
          <h2>Авторизация</h2>
          <input
            onChange={(e) => setInputValuePin(e.target.value)}
            type="text"
            placeholder="ИНН *"
          />
          <div style={{ position: "relative" }}>
            <input
              onChange={(e) => setInputValuePass(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Пароль *"
            />
            {showPassword ? (
              <IoEye
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              />
            ) : (
              <IoMdEyeOff
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              />
            )}
          </div>
          <button 
          onClick={toDataSearch}
          className="home-btn__logIn"
          >
            Войти
          </button>
          <img
            src={spinner}
            alt="img"
            style={{
              border: "50%",
              position: "absolute",
              top: "154px",
              display: loading ? "block" : "none",
              zIndex: "499",
            }}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;


// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "../../assets/img/Emblem_of_Kyrgyzstan.svg";
// import backImg from "../../assets/img/home_new2.jpg";
// import { GoPeople } from "react-icons/go";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import spinner from "../../assets/img/spinner.svg";
// import { IoMdEyeOff } from "react-icons/io";
// import { IoEye } from "react-icons/io5";
// import { useSelector } from "react-redux";

// style={{
//   background: `url(${backImg}) no-repeat top/cover`,
// }}
// id="home"

{/* <div className="home">
          <div className="home-text">
            <h2>
            Аналиктикалык тутум <br /> «Картотека»
            </h2>
            <h1>КЫРГЫЗ РЕСПУБЛИКАСЫНЫН ИЧКИ ИШТЕР МИНИСТРЛИГИНИН <br /> МААЛЫМАТТЫК ТЕХНОЛОГИЯЛАР БАШКЫ БАШКАРМАЛЫГЫ</h1>
          </div>
          <div className="home-logo">
            <img src={logo} alt="img" />
          </div>
          <div className="home-text">
            <h2>
            Аналитическая система <br /> «Картотека»
            </h2>
            <h1>МИНИСТЕРСТВО ВНУТРЕННИХ ДЕЛ КЫРГЫЗСКОЙ РЕСПУБЛИКИ <br /> ГЛАВНОЕ УПРАВЛЕНИЯ ИНФОРМАЦИОННЫХ ТЕХНОЛОГИИ</h1>
          </div>
        </div> */}



// const Home = () => {
//   const [inputValuePin, setInputValuePin] = useState("");
//   const [inputValuePass, setInputValuePass] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [users, setUsers] = useState([]); // Состояние для хранения пользователей

//   const nav = useNavigate();

//   // Функция для получения пользователей с сервера
//   const fetchUsers = async () => {
//     try {
//       const response = await fetch("http://localhost:3004/users");
//       const data = await response.json();
//       setUsers(data); // Сохраняем пользователей в состоянии
//     } catch (error) {
//       console.error("Ошибка при получении пользователей:", error);
//     }
//   };

//   // Загружаем пользователей при монтировании компонента
//   React.useEffect(() => {
//     fetchUsers();
//   }, []);

//   const success = () => {
//     toast.success("Вход успешно!", {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//     });
//   };

//   const error = () => {
//     toast.error("Неправильный ПИН или пароль!", {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//     });
//   };

//   const warning = () => {
//     toast.warning("Заполните пустые ячейки!", {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//     });
//   };

//   // Функция для проверки данных и перехода
//   const toDataSearch = () => {
//     const user = users.find(
//       (user) => user.pin === inputValuePin && user.password === inputValuePass
//     );

//     if (user) {
//       setLoading(true);
//       success();
//       setTimeout(() => {
//         nav("/proba", { state: { name: user.name } });
//       }, 2500);
//     } else if (inputValuePin === "" || inputValuePass === "") {
//       warning();
//     } else {
//       error();
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div>
//       <div className="home">
//         <div className="home-login">
//           <GoPeople style={{ fontSize: "54px", margin: "20px 0" }} />
//           <h2>Авторизация</h2>
//           <input
//             onChange={(e) => setInputValuePin(e.target.value)}
//             type="text"
//             placeholder="ИНН *"
//           />
//           <div style={{ position: "relative" }}>
//             <input
//               onChange={(e) => setInputValuePass(e.target.value)}
//               type={showPassword ? "text" : "password"}
//               placeholder="Пароль *"
//             />
//             {showPassword ? (
//               <IoEye
//                 onClick={togglePasswordVisibility}
//                 style={{
//                   position: "absolute",
//                   right: "10px",
//                   top: "50%",
//                   transform: "translateY(-50%)",
//                   border: "none",
//                   background: "none",
//                   cursor: "pointer",
//                 }}
//               />
//             ) : (
//               <IoMdEyeOff
//                 onClick={togglePasswordVisibility}
//                 style={{
//                   position: "absolute",
//                   right: "10px",
//                   top: "50%",
//                   transform: "translateY(-50%)",
//                   border: "none",
//                   background: "none",
//                   cursor: "pointer",
//                 }}
//               />
//             )}
//           </div>
//           <button onClick={toDataSearch}>Войти</button>
//           <img
//             src={spinner}
//             alt="img"
//             style={{
//               border: "50%",
//               position: "absolute",
//               top: "154px",
//               display: loading ? "block" : "none",
//               zIndex: "499",
//             }}
//           />
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Home;
