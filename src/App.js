import "./App.css";
import { useState } from "react";
import Lists from "./components/Lists";
import Form from "./components/Form";
import ToastPopup from "./components/ToastPopup";

const initialPocketData = localStorage.getItem("pocketData")
  ? JSON.parse(localStorage.getItem("pocketData"))
  : [];

function App() {
  const [pocketData, setPocketData] = useState(initialPocketData);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);

  const [toast, setToast] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastType, setToastType] = useState("");

  const handleSaveSubmit = (e) => {
    e.preventDefault();

    // 새로운 거래 데이터
    let newPocket = {
      id: Date.now(),
      title: title,
      amount: parseFloat(amount),
    };

    // 원래 있던 거래에 새로운 거래 더해주기
    setPocketData((prev) => [...prev, newPocket]);
    localStorage.setItem(
      "pocketData",
      JSON.stringify([...pocketData, newPocket])
    );

    // 입력란에 있던 내용 초기화
    setTitle("");
    setAmount("");

    e.target.blur();

    setToast(true);
    setToastType("add");
    setToastTitle("지출이 저장되었습니다.");
  };

  const handleRemoveClick = () => {
    setPocketData([]);
    localStorage.setItem("pocketData", JSON.stringify([]));
    setToast(true);
    setToastType("remove");
    setToastTitle("모두 삭제되었습니다.");
  };

  // 리스트의 금액 합계 계산
  const calculateTotalAmount = () => {
    let totalAmount = 0;

    // 각 항목의 금액을 합산
    pocketData.forEach((item) => {
      totalAmount += item.amount;
    });

    return totalAmount;
  };

  // 총 금액 계산
  const totalAmount = calculateTotalAmount();

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-blue-100">
      {toast && (
        <ToastPopup
          setToast={setToast}
          toastTitle={toastTitle}
          toastType={toastType}
        />
      )}
      <h1 className="mb-4 text-2xl">예산 계산기</h1>
      <div className="w-full p-6 m-4 bg-white rounded shadow md:w-3/4 md:max-w-lg lg:w-3/4 lg:max-w-lg">
        <Form
          handleSaveSubmit={handleSaveSubmit}
          title={title}
          setTitle={setTitle}
          amount={amount}
          setAmount={setAmount}
        />
        <Lists pocketData={pocketData} setPocketData={setPocketData} />
        <div className="flex justify-between mt-4">
          <button
            onClick={handleRemoveClick}
            className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-200"
          >
            모두 삭제
          </button>
        </div>
      </div>
      <div>
        <h2 className="mb-4 text-xl">
          총 지출: {totalAmount.toLocaleString()}원
        </h2>
      </div>
    </div>
  );
}

export default App;
