import { useState, useEffect } from "react"
import Message from "./Message"
import CloseModal from '../img/cerrar.svg'



const Modal = ({ setModal, setAnimateModal, saveExpense, animateModal, expenseEdit, setExpenseEdit }) => {

    const [message, setMessage] = useState("")
    const [name, setName] = useState("")
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState("")
    const [date, setDate] = useState("")
    const [id, setId] = useState("")

    useEffect(() => {
        if (Object.keys(expenseEdit).length > 0) {
            setName(expenseEdit.name)
            setAmount(expenseEdit.amount)
            setCategory(expenseEdit.category)
            setId(expenseEdit.id)
            setDate(expenseEdit.date)
        }
    }, [])


    const dismissModal = () => {
        setAnimateModal(false)
        setExpenseEdit({})
        setTimeout(() => {
            setModal(false)
        }, 500);
    }

    const handleSubmit = e => {
        e.preventDefault()

        if ([name, amount, category].includes("")) {
            setMessage("Complete the information")

            setTimeout(() => {
                setMessage("")
            }, 2500);
            return
        }

        saveExpense({ name, amount, category, id, date })
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img src={CloseModal} alt="Close modal image" onClick={dismissModal} />
            </div>

            <form onSubmit={handleSubmit} className={`formulario ${animateModal ? "animar" : "cerrar"}`}>
                <legend>{expenseEdit.name ? "Edit your expense" : "New expense"}</legend>
                {message && <Message tipo="error">{message}</Message>}

                <div className="campo">
                    <label htmlFor="name">Expense Name</label>
                    <input type="text" id="name" placeholder="Add expense" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="campo">
                    <label htmlFor="amount">Amont</label>
                    <input type="number" id="amount" placeholder="Amount" value={amount} onChange={e => setAmount(Number(e.target.value))} />
                </div>
                <div className="campo">
                    <label htmlFor="category">Category</label>
                    <select id="category" value={category} onChange={e => setCategory(e.target.value)} >
                        <option value="">-- Select one category --</option>
                        <option value="saving">Saving</option>
                        <option value="food">Food</option>
                        <option value="house">House</option>
                        <option value="leisure">Leisure</option>
                        <option value="health">Health</option>
                        <option value="subscriptions">Subscriptions</option>
                        <option value="others">Others</option>
                    </select>
                </div>

                <input type="submit" value="Confirm" />
            </form>
        </div>
    )
}

export default Modal