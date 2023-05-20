import { Product } from "@medusajs/medusa"
import { useAdminDeleteProduct, useAdminUpdateProduct } from "medusa-react"
import { useNavigate } from "react-router-dom"
import useImperativeDialog from "../../../hooks/use-imperative-dialog"
import useNotification from "../../../hooks/use-notification"
import { getErrorMessage } from "../../../utils/error-messages"
import DuplicateIcon from "../../fundamentals/icons/duplicate-icon"
import EditIcon from "../../fundamentals/icons/edit-icon"
import PublishIcon from "../../fundamentals/icons/publish-icon"
import TrashIcon from "../../fundamentals/icons/trash-icon"
import UnpublishIcon from "../../fundamentals/icons/unpublish-icon"
import { ActionType } from "../../molecules/actionables"
import useCopyProduct from "./use-copy-product"

const useProductActions = (product: Product) => {
  const navigate = useNavigate()
  const notification = useNotification()
  const dialog = useImperativeDialog()
  const copyProduct = useCopyProduct()
  const deleteProduct = useAdminDeleteProduct(product?.id)
  const updateProduct = useAdminUpdateProduct(product?.id)

  const handleDelete = async () => {
    const shouldDelete = await dialog({
      heading: "Kustuta toode",
      text: "Kas olete kindel, et soovite selle toote kustutada?",
    })

    if (shouldDelete) {
      deleteProduct.mutate()
    }
  }

  const getActions = (): ActionType[] => [
    {
      label: "Muuda",
      onClick: () => navigate(`/a/products/${product.id}`),
      icon: <EditIcon size={20} />,
    },
    {
      label: product.status === "published" ? "Unpublish" : "Publish",
      onClick: () => {
        const newStatus = product.status === "published" ? "draft" : "published"
        updateProduct.mutate(
          {
            status: newStatus,
          },
          {
            onSuccess: () => {
              notification(
                "Õnnestus",
                `Edukalt ${
                  product.status === "published" ? "mitte avaldasid" : "avaldasid"
                } toote`,
                "success"
              )
            },
            onError: (err) =>
              notification("Error", getErrorMessage(err), "error"),
          }
        )
      },
      icon:
        product.status === "published" ? (
          <UnpublishIcon size={20} />
        ) : (
          <PublishIcon size={20} />
        ),
    },
    {
      label: "Dubleeri",
      onClick: () => copyProduct(product),
      icon: <DuplicateIcon size={20} />,
    },
    {
      label: "Kustuta",
      variant: "danger",
      onClick: handleDelete,
      icon: <TrashIcon size={20} />,
    },
  ]

  return {
    getActions,
  }
}

export default useProductActions