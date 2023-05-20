import { end, parse } from "iso8601-duration"
import { useMemo } from "react"
import { formatAmountWithSymbol } from "../../../utils/prices"
import Badge from "../../fundamentals/badge"
import StatusDot from "../../fundamentals/status-indicator"

enum PromotionStatus {
  SCHEDULED = "PLAANIS",
  EXPIRED = "AEGUNUD",
  ACTIVE = "AKTIIVNE",
  DISABLED = "KEELATUD",
}

const getPromotionStatus = (promotion) => {
  if (!promotion.is_disabled) {
    const date = new Date()
    if (new Date(promotion.starts_at) > date) {
      return PromotionStatus.SCHEDULED
    } else if (
      (promotion.ends_at && new Date(promotion.ends_at) < date) ||
      (promotion.valid_duration &&
        date >
          end(
            parse(promotion.valid_duration),
            new Date(promotion.starts_at)
          )) ||
      promotion.usage_count === promotion.usage_limit
    ) {
      return PromotionStatus.EXPIRED
    } else {
      return PromotionStatus.ACTIVE
    }
  }
  return PromotionStatus.DISABLED
}

const getPromotionStatusDot = (promotion) => {
  const status = getPromotionStatus(promotion)
  switch (status) {
    case PromotionStatus.SCHEDULED:
      return <StatusDot title="Plaanis" variant="warning" />
    case PromotionStatus.EXPIRED:
      return <StatusDot title="Aegunud" variant="danger" />
    case PromotionStatus.ACTIVE:
      return <StatusDot title="Aktiivne" variant="success" />
    case PromotionStatus.DISABLED:
      return <StatusDot title="Keelatud" variant="default" />
    default:
      return <StatusDot title="Keelatud" variant="default" />
  }
}

const getCurrencySymbol = (promotion) => {
  if (promotion.rule.type === "fixed") {
    if (!promotion.regions?.length) {
      return ""
    }
    return promotion.regions[0].currency_code.toUpperCase()
  }
  return ""
}

const getPromotionAmount = (promotion) => {
  switch (promotion.rule.type) {
    case "fixed":
      if (!promotion.regions?.length) {
        return ""
      }
      return formatAmountWithSymbol({
        currency: promotion.regions[0].currency_code,
        amount: promotion.rule.value,
      })
    case "percentage":
      return `${promotion.rule.value}%`
    case "free_shipping":
      return "Tasuta transport"
    default:
      return ""
  }
}

export const usePromotionTableColumns = () => {
  const columns = useMemo(
    () => [
      {
        Header: <div className="pl-2">Kood</div>,
        accessor: "code",
        Cell: ({ cell: { value } }) => (
          <div className="overflow-hidden">
            <Badge className="rounded-rounded" variant="default">
              <span className="inter-small-regular">{value}</span>
            </Badge>
          </div>
        ),
      },
      {
        Header: "Kirjeldus",
        accessor: "rule.description",
        Cell: ({ cell: { value } }) => value,
      },
      {
        Header: <div className="text-right">Summa</div>,
        id: "amount",
        Cell: ({ row: { original } }) => {
          return (
            <div className="text-right">{getPromotionAmount(original)}</div>
          )
        },
      },
      {
        Header: <div className="w-[60px]" />,
        id: "currency",
        Cell: ({ row: { original } }) => (
          <div className="text-grey-40 px-2">{getCurrencySymbol(original)}</div>
        ),
      },
      {
        Header: "Status",
        accessor: "ends_at",
        Cell: ({ row: { original } }) => (
          <div>{getPromotionStatusDot(original)}</div>
        ),
      },
      {
        Header: () => <div className="text-right">Lunastused</div>,
        accessor: "usage_count",
        Cell: ({ row: { original } }) => {
          return (
            <div className="text-right">
              {getUsageCount(original.usage_count)}
            </div>
          )
        },
      },
    ],
    []
  )

  return [columns]
}

const getUsageCount = (usageCount: number) => {
  switch (true) {
    case usageCount > 9999999:
      return `${Math.floor(usageCount / 1000000)}m`
    case usageCount > 9999:
      return `${Math.floor(usageCount / 1000)}k`
    default:
      return usageCount
  }
}