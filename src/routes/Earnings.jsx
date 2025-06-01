import React, { useState } from "react";
import SideNavBar from "../components/SideNavBar";
import { BASE_URL } from "../config";

const Earnings = () => {
  const [totalEarnings, setTotalEarnings] = useState(125000); // Example default
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const handleWithdraw = async () => {
  if (!phoneNumber || !withdrawAmount) {
    alert("Please enter both phone number and amount.");
    return;
  }

  if (Number(withdrawAmount) > totalEarnings) {
    alert("You cannot withdraw more than your total earnings.");
    return;
  }

  setIsWithdrawing(true);

  try {
    const response = await fetch(`${BASE_URL}/disburse-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Number(withdrawAmount),
        phoneNumber: phoneNumber,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || "Withdrawal failed.");
    }

    alert(`XAF ${withdrawAmount} will be sent to ${phoneNumber}`);
    setTotalEarnings((prev) => prev - Number(withdrawAmount));
    setWithdrawAmount("");
    setPhoneNumber("");
  } catch (error) {
    console.error("Withdrawal Error:", error);
    alert(error.message);
  } finally {
    setIsWithdrawing(false);
  }
};

  return (
    <div className="flex flex-col lg:flex-row w-screen min-h-screen bg-gray-50">
    <SideNavBar/>
    <div className="w-full mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Earnings</h1>

      {/* Total Earnings */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-gray-700">Total Earnings</p>
        <h2 className="text-3xl font-semibold text-blue-600">XAF {totalEarnings.toLocaleString()}</h2>
      </div>

      {/* Withdraw Section */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            placeholder="e.g., 6XXXXXXXX"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            disabled={isWithdrawing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount to Withdraw (XAF)</label>
          <input
            type="number"
            placeholder="e.g., 10000"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            disabled={isWithdrawing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            min="0"
            step="1"
          />
        </div>

        <button
          onClick={handleWithdraw}
          disabled={isWithdrawing}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition disabled:opacity-50"
        >
          {isWithdrawing ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
              ) : (
                "Withdraw"
              )}
        </button>
      </div>
    </div>
    </div>
  );
};

export default Earnings;
