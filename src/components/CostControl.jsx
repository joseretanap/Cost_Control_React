import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"


const CostControl = ({ expenses, budget, setExpenses, setBudget, setIsValidBudget }) => {

    const [porcentage, setPorcentage] = useState(0)
    const [available, setAvailable] = useState(0)
    const [spent, setSpent] = useState(0)

    useEffect(() => {
        const totalSpent = expenses.reduce((total, expense) => expense.amount + total, 0)
        const totalAvailable = budget - totalSpent

        //Calculete the porcentage of spended money
        const newPorcentage = (( (budget - totalAvailable) / budget ) * 100).toFixed(2)

        setSpent(totalSpent)
        setAvailable(totalAvailable)
        setTimeout(() => {
            setPorcentage(newPorcentage)  
        }, 1200);
    }, [expenses])


    const formatCurrency = (amount) => {
        return amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleRestartApp = () => {
        const result = confirm("Do you want restart the app?")

        if (result) {
           setExpenses([]) 
           setBudget(0)
           setIsValidBudget(false)
        }
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar 
                    value={porcentage} 
                    styles={buildStyles({
                        pathColor: porcentage > 100 ? "#DC2626" : "#3B82F6",
                        trailColor: "#F5F5F5",
                        textColor: porcentage > 100 ? "#DC2626" : "#3B82F6",
                    })}
                    text={`${porcentage}% Spent`}
                />
            </div>
            <div className="contenido-presupuesto">
                <button className="reset-app" type="button" onClick={handleRestartApp}>Restart APP</button>
                <p>
                    <span>Budget: </span> {formatCurrency(budget)}
                </p>

                <p className={`${available < 0 ? "negativo" : ""}`}>
                    <span>Available: </span> {formatCurrency(available)}
                </p>

                <p>
                    <span>Spent: </span> {formatCurrency(spent)}
                </p>
            </div>
        </div>
    )
}

export default CostControl