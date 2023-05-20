import clsx from "clsx"
import { Controller } from "react-hook-form"
import RadioGroup from "../../../../../components/organisms/radio-group"
import { AllocationType } from "../../../types"
import { useDiscountForm } from "../form/discount-form-context"

const DiscountAllocation = () => {
  const { control } = useDiscountForm()

  return (
    <Controller
      name="rule.allocation"
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange, value } }) => {
        return (
          <RadioGroup.Root
            value={value}
            onValueChange={onChange}
            className={clsx("gap-base mt-base flex items-center px-1")}
          >
            <RadioGroup.Item
              value={AllocationType.TOTAL}
              className="flex-1"
              label="Kogu summa"
              description="Rakenda kogusummale"
            />
            <RadioGroup.Item
              value={AllocationType.ITEM}
              className="flex-1"
              label="Kauba spetsiifiline"
              description="Rakenda igale lubatud üksusele"
            />
          </RadioGroup.Root>
        )
      }}
    />
  )
}

export default DiscountAllocation
