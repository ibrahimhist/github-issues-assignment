import React from "react"

import { List, ListItem, ListItemText, Avatar, ListItemAvatar } from "@mui/material"
import { Image } from "@mui/icons-material"

export const IssueList = ({ datasource = [] }) => {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {datasource.map(issue => (
        <ListItem key={issue.id}>
          <ListItemAvatar>
            <Avatar>
              <Image />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={issue.title} secondary={issue.created_at} />
        </ListItem>
      ))}
    </List>
  )
}

export default IssueList
