import { useState } from "react";

function AnnuityCalculator() {
    const [amount, setAmount] = useState(3000000);
    const [interest, setInterest] = useState(1.5);
    const [years, setYears] = useState(30);
    const [annuity, setAnnuity] = useState(0);

    function calculateAnnuity(years = 30, interest = 1.5, amount = 2000000) {
        // Get monthly interes
        const i = interest / 100 / 12;

        let pow = i + 1;
        const n = years * 12;

        pow = Math.pow(pow, -n);
        const annuity = (i / (1 - pow)) * amount;
        return annuity;
    }

    function calculateAnnuityHandler() {
        const annuityCalculated = calculateAnnuity(years, interest, amount);
        setAnnuity(Math.round(annuityCalculated));
    }

    function formatAmount(amount) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className="container my-5">
            <h2 className="text-center my-2">Calculate annuity</h2>
            <div className="form-group">
                <label>Years ({years})</label>
                <input
                    type="range"
                    step="1"
                    max="30"
                    min="5"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Interest ({interest}%)</label>
                <input
                    type="range"
                    step="0.1"
                    max="20"
                    min="0.1"
                    value={interest}
                    className="form-control"
                    onChange={(e) => setInterest(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Loan Amount ({formatAmount(amount)})</label>
                <input
                    type="range"
                    step="100000"
                    max="10000000"
                    min="100000"
                    value={amount}
                    className="form-control"
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <button
                onClick={calculateAnnuityHandler}
                className="btn btn-block btn-lg btn-primary"
            >
                Calculate
            </button>
            {annuity > 0 && (
                <div className="my-5">
                    <h2 className="text-center mb-2">Calculated annuity</h2>
                    <h2 className="text-center text-danger">
                        {formatAmount(annuity)} kr
                    </h2>
                </div>
            )}
        </div>
    );
}
export default AnnuityCalculator;
