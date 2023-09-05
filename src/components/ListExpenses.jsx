import Expense from "./Expense"

const ListExpenses = ({ expenses, setExpenseEdit, deletedExpense, filter, expensesFiltered }) => {
    return (
        <div className="listado-gastos contenedor">

            {filter ? (
                <>
                    <h2>{expensesFiltered.length ? "Expenses" : "You don't have expenses in this category"}</h2>
                    {
                        expensesFiltered.map(expense => (
                            <Expense
                                key={expense.id}
                                expense={expense}
                                setExpenseEdit={setExpenseEdit}
                                deletedExpense={deletedExpense}
                            />
                        ))
                    }
                </>
            ) : (
                <>
                    <h2>{expenses.length ? "Expenses" : "You don't have expenses"}</h2>
                    {
                        expenses.map(expense => (
                            <Expense
                                key={expense.id}
                                expense={expense}
                                setExpenseEdit={setExpenseEdit}
                                deletedExpense={deletedExpense}
                            />
                        ))
                    }
                </>


            )}


        </div>
    )
}

export default ListExpenses