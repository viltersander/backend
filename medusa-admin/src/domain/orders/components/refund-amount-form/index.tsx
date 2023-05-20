import { Order } from "@medusajs/medusa"
import { Controller, useWatch } from "react-hook-form"
import Button from "../../../../components/fundamentals/button"
import CrossIcon from "../../../../components/fundamentals/icons/cross-icon"
import EditIcon from "../../../../components/fundamentals/icons/edit-icon"
import { AmountInput } from "../../../../components/molecules/amount-input"
import { NestedForm } from "../../../../utils/nested-form"
import { formatAmountWithSymbol } from "../../../../utils/prices"

type Props = {
  form: NestedForm<RefundAmountFormType>
  order: Order
  initialValue?: number
}

export type RefundAmountFormType = {
  amount?: number
}

const RefundAmountForm = ({ form, initialValue = 0, order }: Props) => {
  const {
    control,
    path,
    setValue,
    clearErrors,
    formState: { errors },
  } = form

  const refundAmount = useWatch({
    control,
    name: path("amount"),
  })

  const enableEdit = () => {
    setValue(path("amount"), initialValue)
  }

  const disableEdit = () => {
    setValue(path("amount"), undefined)
    clearErrors(path("amount"))
  }

  return (
    <div className="gap-x-xsmall grid grid-cols-[40px_1fr] justify-end">
      <div className="flex flex-shrink justify-end">
        {refundAmount !== undefined ? (
          <Button
            variant="secondary"
            size="small"
            type="button"
            className="h-10 w-10"
            aria-label="Tühista tagasimakse summa muutmine"
            onClick={disableEdit}
          >
            <CrossIcon size={16} className="text-grey-40" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="small"
            type="button"
            onClick={enableEdit}
            aria-label="Muuda tagasimakse summat"
            className="h-10 w-10"
          >
            <EditIcon size={16} className="text-grey-40" />
          </Button>
        )}
      </div>
      <div>
        {refundAmount !== undefined ? (
          <Controller
            control={control}
            name={path("amount")}
            rules={{
              min: {
                value: 0,
                message: "Tagasimakse summa ei saa olla negatiivne",
              },
              required: true,
              validate: (value) => {
                if (value === undefined || !(value >= 0)) {
                  return "Tagasimakse summa peab olema vähemalt 0"
                }
              },
            }}
            render={({ field: { value, onChange, name } }) => {
              return (
                <AmountInput
                  currencyCode={order.currency_code}
                  onChange={onChange}
                  name={name}
                  value={value}
                  errors={errors}
                />
              )
            }}
          />
        ) : (
          <div className="flex h-10 items-center">
            <p>
              {formatAmountWithSymbol({
                amount: initialValue,
                currency: order.currency_code,
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default RefundAmountForm
