import { useState, useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import ListExpenses from './components/ListExpenses'
import Filters from './components/Filters'
import { generateId } from "./helpers"
import IconNewExpense from './img/nuevo-gasto.svg'




function App() {

  const [budget, setBudget] = useState(Number(localStorage.getItem("budget")) ?? 0)
  const [isValidBudget, setIsValidBudget] = useState(false)
  const [modal, setModal] = useState(false)
  const [animateModal, setAnimateModal] = useState(false)
  const [expenses, setExpenses] = useState(localStorage.getItem("expenses") ? JSON.parse(localStorage.getItem("expenses")) : [])
  const [expenseEdit, setExpenseEdit] = useState({})
  const [filter, setFilter] = useState("")
  const [expensesFiltered, setExpensesFiltered] = useState([])


  useEffect(() => {
    if (Object.keys(expenseEdit).length > 0) {
      setModal(true)

      setTimeout(() => {
        setAnimateModal(true)
      }, 500);
    }
  }, [expenseEdit])

  useEffect(() => {
    localStorage.setItem("budget", budget ?? 0)
  }, [budget])

  useEffect(() => {
    const budgetLS = Number(localStorage.getItem("budget")) ?? 0

    if (budgetLS > 0) {
      setIsValidBudget(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses) ?? [])
  }, [expenses])

  useEffect(() => {
    if (filter) {
      const expensesFiltered = expenses.filter(expense => expense.category === filter)
      setExpensesFiltered(expensesFiltered)
    }
  }, [filter])
  


  const handleNewExpense = () => {
    setModal(true)
    setExpenseEdit({})

    setTimeout(() => {
      setAnimateModal(true)
    }, 500);
  }

  const saveExpense = expense => {
    if (expense.id) {
      //Update expense
      const expenseUpdated = expenses.map(expenseState => expenseState.id === expense.id ? expense : expenseState)
      setExpenses(expenseUpdated)
      setExpenseEdit({})
    } else {
      //Create expense
      expense.id = generateId()
      expense.date = Date.now()
      setExpenses([...expenses, expense])
    }
    setAnimateModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500);
  }

  const deletedExpense = id => {
    const expensesUpdated = expenses.filter(expense => expense.id !== id)
    setExpenses(expensesUpdated)
  }

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        budget={budget}
        setExpenses={setExpenses}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
        expenses={expenses}
      />

      {isValidBudget && (
        <>
          <main>
            <Filters filter={filter} setFilter={setFilter} />

            <ListExpenses
              expenses={expenses}
              setExpenseEdit={setExpenseEdit}
              deletedExpense={deletedExpense}
              filter={filter}
              expensesFiltered={expensesFiltered}
            />
          </main>
          <div className="nuevo-gasto">
            <img src={IconNewExpense} alt="Icon new expense" onClick={handleNewExpense} />
          </div>
        </>

      )}

      {modal && <Modal setModal={setModal} setAnimateModal={setAnimateModal} saveExpense={saveExpense} animateModal={animateModal} expenseEdit={expenseEdit} setExpenseEdit={setExpenseEdit} />}

    </div>
  )
}

export default App
