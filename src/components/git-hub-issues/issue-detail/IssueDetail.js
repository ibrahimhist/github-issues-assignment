import React from "react"

import { Box, Typography, Avatar } from "@mui/material"

// user user.avatar_url, user.login
export const IssueDetail = ({ issue }) => {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gridGap: "8px" }}>
      <Typography variant="h6">User</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gridGap: "8px" }}>
        <Avatar alt={issue?.user?.login} src={issue?.user?.avatar_url} />
        <a rel="noreferrer" target="_blank" href={issue?.user?.html_url}>
          {issue?.user?.login}
        </a>
      </Box>
      <Typography variant="h6">State</Typography>
      <Typography variant="subtitle2">{issue?.state}</Typography>

      <Typography variant="h6">Comments</Typography>
      <Typography variant="subtitle2">{issue?.comments}</Typography>

      <Typography variant="h6">Updated At</Typography>
      <Typography variant="subtitle2">{new Date(issue?.updated_at).toLocaleDateString()}</Typography>

      <Typography variant="h6">Created At</Typography>
      <Typography variant="subtitle2">{new Date(issue?.created_at).toLocaleDateString()}</Typography>
    </Box>
  )
}

export default IssueDetail
