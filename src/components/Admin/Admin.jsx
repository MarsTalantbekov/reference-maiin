import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { color } from "chart.js/helpers";
import "./Admin.css";

const Admin = () => {
  const [valueName, setValueName] = useState("");
  const [valuePin, setValuePin] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const [editId, setEditId] = useState(null);
  const [userss, setUserss] = useState([]);
  const dispatch = useDispatch();
  const nav = useNavigate();

  // 🔹 Загрузка пользователей с сервера при рендере
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:3004/users");
        const data = await res.json();
        console.log("Полученные пользователи:", data); // 🔍 Выводим данные в консоль
        setUserss(data); // Обновляем состояние
      } catch (err) {
        console.error("Ошибка при загрузке пользователей:", err);
      }
    };
  
    fetchUsers();
  }, []);
  

  

  const error = () => {
    toast.error("Такой участник уже существует!", {
      position: "top-right",
      autoClose: 5000,
    });
  };

  const warning = () => {
    toast.warning("Заполните пустые ячейки!", {
      position: "top-right",
      autoClose: 5000,
    });
  };

  const success = () => {
    toast.success("Участник успешно добавлен!", {
      position: "top-right",
      autoClose: 5000,
    });
  };


  // 🔹 Функция для добавления или редактирования пользователей
  const addUserss = async () => {
    if (valueName.trim() === "" || valuePin.trim() === "" || valuePassword.trim() === "") {
      warning();
      return;
    }
  
    if (editId) {
      // 🔹 Обновление пользователя
      try {
        const res = await fetch(`http://localhost:3004/users/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: valueName.trim(),
            pin: valuePin.trim(),
            password: valuePassword.trim(),
          }),
        });
  
        if (res.ok) {
          setUserss(
            userss.map((user) =>
              user.id === editId
                ? { ...user, name: valueName, pin: valuePin, password: valuePassword }
                : user
            )
          );
          setEditId(null);
          setValueName("");
          setValuePin("");
          setValuePassword("");
          success();
        }
      } catch (err) {
        console.error("Ошибка при обновлении пользователя:", err);
      }
    } else {
      // 🔹 Добавление нового пользователя
      const uniqueEmail = `user_${Date.now()}@example.com`;
      const newUser = {
        name: valueName.trim(),
        pin: valuePin.trim(),
        password: valuePassword.trim(),
        email: uniqueEmail,
      };
  
      try {
        const res = await fetch("http://localhost:3004/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });
  
        if (res.ok) {
          const createdUser = await res.json();
          setUserss([...userss, createdUser]);
          setValueName("");
          setValuePin("");
          setValuePassword("");
          success();
        } else {
          error();
        }
      } catch (err) {
        console.error("Ошибка при добавлении пользователя:", err);
      }
    }
  };
  
  
  
  
  

  // 🔹 Функция для удаления пользователя с сервера
  const del = async (user) => {
    try {
      const res = await fetch(`http://localhost:3004/users/${user.id}`, {
        method: "DELETE",
      });
  
      if (res.ok) {
        setUserss(userss.filter((u) => u.id !== user.id)); // Удаляем без перезагрузки
      }
    } catch (err) {
      console.error("Ошибка при удалении пользователя:", err);
    }
  };

  const edit = (item, event) => {
    event.preventDefault(); // 🔹 Останавливаем обновление страницы
    setValueName(item.name);
    setValuePin(item.pin);
    setValuePassword(item.password);
    setEditId(item.id);
  };
  
  
  
  

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addUserss();
    }
  };

  return (
    <section id="admin">
      <div className="container">
        <div className="user-back">
          <button onClick={() => nav("/")} style={{ cursor: "pointer" }}>
            <RiArrowGoBackFill />
          </button>
        </div>
        <h1>Пользователи</h1>
        <div className="admin">
          <input
            type="text"
            onChange={(e) => setValueName(e.target.value)}
            placeholder="Имя Фамилия"
            value={valueName}
            onKeyDown={handleKeyDown}
          />
          <input
            type="text"
            onChange={(e) => setValuePin(e.target.value)}
            placeholder="ИНН"
            value={valuePin}
            onKeyDown={handleKeyDown}
            disabled={editId !== null}
          />
          <input
            type="text"
            onChange={(e) => setValuePassword(e.target.value)}
            placeholder="Пароль"
            value={valuePassword}
            onKeyDown={handleKeyDown}
          />
          <button
            className="btn-add-change"
            style={{ background: editId ? "red" : "green" }}
            onClick={addUserss}
          >
            {editId ? "Обновить" : "Добавить"}
          </button>
        </div>

          <div className="data-list">
          <form action="" className="admin-list__form">
              <div className="admin-list__labels">
                <label htmlFor="">ФИО</label>
                <label htmlFor="">ИНН</label>
                <label htmlFor="">Пароль</label>
                <label htmlFor="">Action</label>
                <label htmlFor="">Удалить</label>
               
              </div>
              <div className="admin-list__labelsSecond">
              {userss.length > 0 ? (
                userss.map((user) => (
                  
                  <p key={user.id}>
                    <span>{user.name} </span>
                    <span>{user.pin}</span>
                    <span>{user.password}</span>  
                    <span>
                      <button 
                        className="btn-data__admin" 
                        onClick={(event) => edit(user, event)}
                        >
                          Изменить
                      </button>
                    </span>
                    <span>
                      <button 
                        className="btn-data__admin delete-btn"
                        onClick={() => del(user)}
                        >
                          Удалить
                      </button>
                    </span>
                  </p>
                  
                ))
                
              ) : (
                <p>Пользователи не найдены</p>
              )}
              </div>
            </form>
          </div>

        <ToastContainer />
      </div>
    </section>
  );
};

export default Admin;



// {userss.length > 0 ? (
//   userss.map((user) => (
//     <p key={user.id}>
//       {user.name} - {user.pin} - {user.password}
//     </p>
//   ))
// ) : (
//   <p>Пользователи не найдены</p>
// )}