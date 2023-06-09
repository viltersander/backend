import { Order } from "@medusajs/medusa"
import { renderHook, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useForm, UseFormReturn } from "react-hook-form"
import ClaimTypeForm from ".."
import { fixtures } from "../../../../../../test/fixtures"
import { renderWithProviders } from "../../../../../../test/utils/render-with-providers"
import { nestedForm } from "../../../../../utils/nested-form"
import { CreateClaimFormType } from "../../../details/claim/register-claim-menu"
import { getDefaultClaimValues } from "../../../details/utils/get-default-values"

describe("ClaimTypeForm", () => {
  let form: UseFormReturn<CreateClaimFormType, any>

  beforeEach(() => {
    const order = fixtures.get("order") as unknown as Order

    const { result } = renderHook(() =>
      useForm<CreateClaimFormType>({
        defaultValues: getDefaultClaimValues(order),
      })
    )

    form = result.current

    renderWithProviders(<ClaimTypeForm form={nestedForm(form, "claim_type")} />)
  })

  it("should render correctly with the initial value of refund", async () => {
    const {
      claim_type: { type },
    } = form.getValues()

    expect(screen.getByText("Tagasimakse")).toBeInTheDocument()
    expect(screen.getByText("Asenda")).toBeInTheDocument()

    expect(type).toEqual("refund")
  })

  it("should update the value of the form when a new type is selected", async () => {
    const {
      claim_type: { type: initialType },
    } = form.getValues()

    const user = userEvent.setup()

    expect(initialType).toEqual("refund")

    const replace = screen.getByLabelText("Asenda")

    await user.click(replace)

    const {
      claim_type: { type },
    } = form.getValues()

    expect(type).toEqual("replace")
  })
})
