import React, { useState } from "react"

import { List, ListItem, ListItemText, Avatar, ListItemAvatar, Dialog, DialogTitle } from "@mui/material"
import { Image } from "@mui/icons-material"

import { IssueDetail } from "../issue-detail/IssueDetail"

export const IssueList = ({ datasource = [] }) => {
  const [issueDetail, setIssueDetail] = useState()

  const showIssueDetail = issue => setIssueDetail(issue)
  const handleClose = () => setIssueDetail(null)

  return (
    <>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {datasource.map(issue => (
          <ListItem key={issue.id} onClick={() => showIssueDetail(issue)}>
            <ListItemAvatar>
              <Avatar>
                <Image />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={issue.title} secondary={issue.created_at} />
          </ListItem>
        ))}
      </List>

      <Dialog onClose={handleClose} open={!!issueDetail}>
        <DialogTitle>Issue Detail: {issueDetail?.title}</DialogTitle>
        <IssueDetail issue={issueDetail} />
      </Dialog>
    </>
  )
}

export default IssueList
