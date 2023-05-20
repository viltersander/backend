import ArrowDownIcon from "../../fundamentals/icons/arrow-down-icon"
import ArrowUpIcon from "../../fundamentals/icons/arrow-up-icon"
import DownLeftIcon from "../../fundamentals/icons/down-left"
import PointerIcon from "../../fundamentals/icons/pointer-icon"

const KeyboardShortcuts = ({ ...props }) => {
  return (
    <p {...props}>
      <span className="bg-grey-10 rounded p-1">
        <PointerIcon color="#9CA3AF" size="16px" />
      </span>
      või
      <span className="bg-grey-10 rounded p-1">
        <ArrowUpIcon color="#9CA3AF" size="16px" />
      </span>
      <span className="bg-grey-10 -ml-1 rounded p-1">
        <ArrowDownIcon color="#9CA3AF" size="16px" />
      </span>
      navigeerimiseks,
      <span className="bg-grey-10 rounded p-1">
        <DownLeftIcon color="#9CA3AF" size="16px" />
      </span>
      valimiseks ja
      <span className="bg-grey-10 leading-small font-small rounded px-1.5 py-0.5 font-semibold">
        <OSCommandIcon />
      </span>
      <span className="-mx-2">+</span>
      <span className="bg-grey-10 leading-small font-small rounded px-1.5 py-0.5 font-semibold">
        K
      </span>
      igal ajal otsida
    </p>
  )
}

const OSCommandIcon = () => {
  const isMac =
    typeof window !== "undefined" &&
    navigator?.platform?.toUpperCase().indexOf("MAC") >= 0
      ? true
      : false
  return <>{isMac ? "⌘" : "Ctrl"}</>
}

export default KeyboardShortcuts
