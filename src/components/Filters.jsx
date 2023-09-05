import { useState, useEffect } from "react"

const Filters = ({filter, setFilter}) => {
    return (
        <div className="filtros sombra contenedor">
            <form>
                <div className="campo">
                    <label htmlFor="">Filter your expenses</label>
                    <select value={filter} onChange={e => setFilter(e.target.value)}>
                        <option value="">-- All categories --</option>
                        <option value="saving">Saving</option>
                        <option value="food">Food</option>
                        <option value="house">House</option>
                        <option value="leisure">Leisure</option>
                        <option value="health">Health</option>
                        <option value="subscriptions">Subscriptions</option>
                        <option value="others">Others</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default Filters