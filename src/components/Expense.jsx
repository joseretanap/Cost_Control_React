import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from 'react-swipeable-list'
import { formatDate } from '../helpers'
import "react-swipeable-list/dist/styles.css"

import IconSaving from '../img/icono_ahorro.svg'
import IconHouse from '../img/icono_casa.svg'
import IconFood from '../img/icono_comida.svg'
import IconOthers from '../img/icono_gastos.svg'
import IconLeisure from '../img/icono_ocio.svg'
import IconHealth from '../img/icono_salud.svg'
import IconSubscriptions from '../img/icono_suscripciones.svg'

const dictionaryIcons = {
  saving: IconSaving,
  food: IconFood,
  house: IconHouse,
  leisure: IconLeisure,
  health: IconHealth,
  subscriptions: IconSubscriptions,
  others: IconOthers
}

const Expense = ({ expense, setExpenseEdit, deletedExpense }) => {

  const { category, name, amount, id, date } = expense

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setExpenseEdit(expense)}>
        Edit
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() => deletedExpense(id)} destructive={true}>
        Delete
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
          leadingActions={leadingActions()}
          trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={dictionaryIcons[category]} alt="Image of the category" />
            <div className="descripcion-gasto">
              <p className="categoria">{category}</p>
              <p className="nombre-gasto">{name}</p>
              <p className="fecha-gasto">
                Day of expense: {''}
                <span>{formatDate(date)}</span>
              </p>
            </div>
          </div>
          <p className='cantidad-gasto'>${amount}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default Expense