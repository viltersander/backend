import { useAdminProducts } from "medusa-react"
import { useContext, useState } from "react"
import Button from "../../../../../../../components/fundamentals/button"
import Modal from "../../../../../../../components/molecules/modal"
import { LayeredModalContext } from "../../../../../../../components/molecules/modal/layered-modal"
import { SelectableTable } from "../../../../../../../components/templates/selectable-table"
import useQueryFilters from "../../../../../../../hooks/use-query-filters"
import { defaultQueryProps } from "../../../../..//new/discount-form/condition-tables/shared/common"
import {
  ProductRow,
  ProductsHeader,
  useProductColumns,
} from "../../../../../new/discount-form/condition-tables/shared/products"
import { useEditConditionContext } from "../../edit-condition-provider"

const AddProductConditionsScreen = () => {
  const params = useQueryFilters(defaultQueryProps)

  const { pop } = useContext(LayeredModalContext)

  const [selectedResources, setSelectedResources] = useState<string[]>([])

  const columns = useProductColumns()

  const { isLoading, count, products } = useAdminProducts(params.queryObject, {
    keepPreviousData: true,
  })

  const { saveAndClose, saveAndGoBack } = useEditConditionContext()

  return (
    <>
      <Modal.Content>
        <SelectableTable
          options={{
            enableSearch: true,
            immediateSearchFocus: true,
            searchPlaceholder: "Otsi...",
          }}
          resourceName="Tooted"
          totalCount={count ?? 0}
          selectedIds={selectedResources}
          data={products || []}
          columns={columns}
          isLoading={isLoading}
          onChange={(ids) => setSelectedResources(ids)}
          renderRow={ProductRow}
          renderHeaderGroup={ProductsHeader}
          {...params}
        />
      </Modal.Content>
      <Modal.Footer>
        <div className="space-x-xsmall flex w-full justify-end">
          <Button variant="secondary" size="small" onClick={pop}>
            Tühista
          </Button>
          <Button
            variant="primary"
            size="small"
            onClick={() => saveAndGoBack(selectedResources)}
          >
            Salvesta ja mine tagasi
          </Button>
          <Button
            variant="primary"
            size="small"
            onClick={() => saveAndClose(selectedResources)}
          >
            Salvesta ja sule
          </Button>
        </div>
      </Modal.Footer>
    </>
  )
}

export default AddProductConditionsScreen
