import React from "react"
import PageDescription from "../atoms/page-description"
import Spacer from "../atoms/spacer"

const SettingsOverview: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <PageDescription
        title={"Seaded"}
        subtitle={"Hallake oma Medusa poe sätteid"}
      />
      <div className="medium:grid-cols-2 gap-x-base gap-y-xsmall grid auto-cols-fr grid-cols-1">
        {children}
      </div>
      <Spacer />
    </div>
  )
}

export default SettingsOverview
