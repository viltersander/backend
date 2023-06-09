import { Region } from "@medusajs/medusa"
import { useAdminShippingOptions } from "medusa-react"
import Section from "../../../../../components/organisms/section"
import useToggleState from "../../../../../hooks/use-toggle-state"
import ShippingOptionCard from "../../components/shipping-option-card"
import CreateReturnShippingOptionModal from "./create-return-shipping-option.modal"

type Props = {
  region: Region
}

const ReturnShippingOptions = ({ region }: Props) => {
  const { shipping_options: returnShippingOptions } = useAdminShippingOptions({
    region_id: region.id,
    is_return: true,
  })

  const { state, toggle, close } = useToggleState()

  return (
    <>
      <Section
        title="Tagastamisvõimalused"
        actions={[
          {
            label: "Lisa valik",
            onClick: toggle,
          },
        ]}
      >
        <div className="gap-y-large flex flex-col">
          <p className="inter-base-regular text-grey-50">
            Sisestage saadaolevate piirkondlike tagastamisviiside üksikasjad.
          </p>
          <div className="gap-y-small flex flex-col">
            {returnShippingOptions?.map((option) => {
              return <ShippingOptionCard option={option} key={option.id} />
            })}
          </div>
        </div>
      </Section>
      <CreateReturnShippingOptionModal
        onClose={close}
        open={state}
        region={region}
      />
    </>
  )
}

export default ReturnShippingOptions
