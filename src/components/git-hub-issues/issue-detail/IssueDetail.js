import React from "react"

import { Box } from "@mui/material"

export const IssueDetail = ({ issue }) => {
  return (
    <Box p={2}>
      <span>Url:</span>
      <span>{issue?.url}</span>
    </Box>
  )
}

export default IssueDetail
