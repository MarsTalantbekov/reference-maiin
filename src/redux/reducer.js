const URL = ('http://localhost:3004/posts')
let dataInput1 = document.querySelector('#dataInput1')
let dataList = document.querySelector('.data-list')
const initialState = {
  userss: JSON.parse(localStorage.getItem("userss")) || [],
  people: JSON.parse(localStorage.getItem("people")) || [],
  data: JSON.parse(localStorage.getItem("data")) || [], // localStorage'дан жүктөө
};

export const Reducer = (state = initialState, action) => {



  switch (action.type) {
    case "ADD_USERSS":
      const updatedUsers = [...state.userss, action.payload];
      localStorage.setItem("userss", JSON.stringify(updatedUsers));
      return {
        ...state,
        userss: updatedUsers,
      };
    case "ADD_DATA":
      const addData = [...state.data, action.payload];
      localStorage.setItem("data", JSON.stringify(addData));
      return {
        ...state,
        data: addData,
      };
    case "UPDATE_DATA":
      const updatedData = state.data.map((item) =>
        item.id === action.payload.id
          ? { ...item, ...action.payload.updates }
          : item
      );
      localStorage.setItem("data", JSON.stringify(updatedData));
      return {
        ...state,
        data: updatedData,
      };
    //     case "ADD_DATA":
    // const addData = Array.isArray(state.data)
    //   ? [...state.data, action.payload]
    //   : [action.payload]; // Массив эмес болсо, жаңы массив түзүңүз
    // localStorage.setItem("data", JSON.stringify(addData));
    // return {
    //   ...state,
    //   data: addData,
    // };
        case "LOAD_DATA":
    return {
      ...state,
      data: action.payload,
    };
    case "UPDATE_USERSS":
      localStorage.setItem("userss", JSON.stringify(action.payload));
      return {
        ...state,
        userss: action.payload,
      };
    case "DELETE":
      let del = state.userss.filter((el) => el.id !== action.payload);
      localStorage.setItem("userss", JSON.stringify(del));
      return {
        ...state,
        userss: del,
      };
    case "GET":
      localStorage.setItem("people", JSON.stringify(action.payload)); // Сохраняем в localStorage
      return { ...state, people: action.payload };
    default:
      return state;
  }


};
