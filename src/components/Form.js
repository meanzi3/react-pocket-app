import React from "react";

export default function Form({
  handleSubmit,
  title,
  setTitle,
  amount,
  setAmount,
}) {
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col pt-2 justify-between"
    >
      <div className="flex mb-4 justify-between">
        <div className="w-full flex flex-col mr-4">
          <label htmlFor="title" className="mb-1">
            지출 항목
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full px-3 py-2 text-gray-500 border rounded shadow"
            placeholder="예) 렌트비"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="w-full flex flex-col">
          <label htmlFor="amount" className="mb-1">
            비용
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            className="w-full px-3 py-2 text-gray-500 border rounded shadow"
            placeholder="비용"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
      </div>
      <input
        value="입력"
        type="submit"
        className="w-20 p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-200"
      />
    </form>
  );
}
