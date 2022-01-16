import React, { useState } from "react"

import { Box, TextField, Button } from "@mui/material"

import { getGitHubIssueList } from "../../services/github.service"
import { IssueList } from "./issue-list/IssueList"

// https://api.github.com/repos/${repoPath}/issues
// https://docs.github.com/en/rest/reference/issues

// sort : created, updated, comments
// state: open, cloed, all
// per_page 30 max 100
// page = 1

export const GitHubIssues = () => {
  const [repoPath, setRepoPath] = useState("facebook/react")
  const [issueList, setIssueList] = useState([])

  const handleChange = event => {
    setRepoPath(event.target.value)
  }

  const handleSearch = async () => {
    const { data } = await getGitHubIssueList(repoPath)
    setIssueList(data)
  }

  return (
    <Box sx={{ width: "100%", maxWidth: "500px", display: "grid", gridGap: 16, height: "100vh", padding: 2, margin: "0 auto", gridTemplateRows: "auto 1fr" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          columnGap: 2,
        }}
      >
        <TextField required value={repoPath} onChange={handleChange} label="Repo Path" placehodler="Write Repo Path (eg:facebook/react)" />
        <Button variant="contained" color="primary" onClick={handleSearch} disableElevation>
          Search Issues
        </Button>
      </Box>
      <Box sx={{ overflow: "auto" }}>
        <IssueList datasource={issueList} />
      </Box>
    </Box>
  )
}

export default GitHubIssues
