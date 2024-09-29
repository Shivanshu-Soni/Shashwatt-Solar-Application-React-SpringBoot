import React, { useState } from "react";

function ElectricitySavingsCalculator() {
  const [billAmount, setBillAmount] = useState(0);
  const [monthlySavings, setMonthlySavings] = useState(0);

  const calculateSavings = () => {
    const averagePerUnitCharges = 13;
    // const unitsPerDayFrom1KWUnit = 5;
    const unitCost = 50000;

    const monthlyUnitConsumption = billAmount / averagePerUnitCharges;
    // const monthlyElectricityGenerated = unitsPerDayFrom1KWUnit * 30;

    let adjustedUnitCost = unitCost;

    if (monthlyUnitConsumption < 45 && monthlyUnitConsumption > 13) {
      adjustedUnitCost = 50000;
      // } else if (monthlyElectricityGenerated > monthlyUnitConsumption * 2) {
      //   adjustedUnitCost = 250000;
    } else if (monthlyUnitConsumption > 45 && monthlyUnitConsumption < 150) {
      adjustedUnitCost = 85000;
    } else if (monthlyUnitConsumption > 150 && monthlyUnitConsumption < 300) {
      adjustedUnitCost = 170000;
    } else {
      if (monthlyUnitConsumption > 13) adjustedUnitCost = 285000;
    }
    const yearlyInstallationCost = adjustedUnitCost / 25;
    const monthlyInstallationCost = yearlyInstallationCost / 12;
    const yearlySavings = billAmount * 12 - monthlyInstallationCost * 12;
    const monthlySavings = yearlySavings / 12;

    setMonthlySavings(monthlySavings);
  };

  return (
    <div>
      <h1>Electricity Savings Calculator</h1>
      <label>Enter Electricity bill: </label>
      <input
        type="number"
        value={billAmount}
        onChange={(e) => setBillAmount(e.target.value)}
      />
      <button onClick={calculateSavings}>Calculate Savings</button>
      {<p>Monthly Savings: {monthlySavings} Rs</p>}
    </div>
  );
}

export default ElectricitySavingsCalculator;
