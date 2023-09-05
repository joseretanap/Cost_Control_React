import CostControl from "./CostControl"
import NewBudget from "./NewBudget"

const Header = ({ budget, setBudget, isValidBudget, setIsValidBudget, expenses, setExpenses }) => {
  return (
    <header>
      <h1>Cost Control</h1>

      {isValidBudget ? (
        <CostControl 
          expenses={expenses}
          setExpenses={setExpenses}
          budget={budget}
          setBudget={setBudget}
          setIsValidBudget={setIsValidBudget}
        /> ) : 
        ( <NewBudget
          budget={budget}
          setBudget={setBudget}
          setIsValidBudget={setIsValidBudget}
        /> )

      }
    </header>
  )
}

export default Header