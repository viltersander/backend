import { Store } from "@medusajs/medusa"
import Button from "../../../../../components/fundamentals/button"
import useToggleState from "../../../../../hooks/use-toggle-state"
import EditCurrenciesModal from "./edit-currencies-modal"

type Props = {
  store: Store
}

const StoreCurrencies = ({ store }: Props) => {
  const { state, close, toggle } = useToggleState()

  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="inter-large-semibold mb-2xsmall">Poe valuutad</h3>
          <p className="inter-base-regular text-grey-50">
            Kõik teie poes saadaolevad valuutad.
          </p>
        </div>
        <Button variant="secondary" size="small" onClick={toggle}>
          Muutke valuutasid
        </Button>
      </div>
      <EditCurrenciesModal store={store} open={state} onClose={close} />
    </>
  )
}

export default StoreCurrencies
