import React, { useState } from "react"

import { Box, TextField, Pagination } from "@mui/material"
import { LoadingButton } from "@mui/lab"

import { getGitHubIssueList } from "../../services/github.service"
import { IssueList } from "./issue-list/IssueList"
import { Select } from "../core/select/Select"

// https://api.github.com/repos/${repoPath}/issues
// https://docs.github.com/en/rest/reference/issues

// sort : created, updated, comments
// state: open, cloed, all
// per_page 30 max 100
// page = 1

const sortOptions = [
  { label: "Created Date", value: "created" },
  { label: "Updated Date", value: "updated" },
  { label: "Comments Date", value: "comments" },
]

export const GitHubIssues = () => {
  const [repoPath, setRepoPath] = useState("facebook/react")
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState("created")

  const [issueList, setIssueList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleRepoPathChange = event => {
    setRepoPath(event.target.value)
  }

  const getIssues = (newPage, newSortBy) => {
    setLoading(true)
    setError(false)
    getGitHubIssueList(repoPath, newPage || page, newSortBy || sortBy)
      .then(response => {
        setIssueList(response.data)
      })
      .catch(e => {
        setIssueList([])
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleSearch = () => {
    getIssues()
  }
  const handlePaginationChange = (_, value) => {
    setPage(value)
    getIssues(value)
  }

  const handleSort = e => {
    setSortBy(e)
    getIssues(null, e)
  }

  return (
    <Box sx={{ width: "100%", maxWidth: "500px", display: "grid", gridGap: 16, height: "100vh", padding: 2, margin: "0 auto", gridTemplateRows: "auto auto 1fr auto" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          columnGap: 2,
        }}
      >
        <TextField required value={repoPath} onChange={handleRepoPathChange} label="Repo Path" placehodler="Write Repo Path (eg:facebook/react)" />
        <LoadingButton loading={loading} variant="contained" color="primary" onClick={handleSearch} disableElevation>
          Search Issues
        </LoadingButton>
      </Box>
      {error && <h1>Something went wrong!</h1>}

      {issueList.length > 0 && (
        <>
          <Box>
            <Select label="Sorty By" value={sortBy} onChange={handleSort} datasource={sortOptions} />
          </Box>
          <Box sx={{ overflow: "auto" }}>
            <IssueList datasource={issueList} />
          </Box>
          <Pagination sx={{ justifyContent: "center" }} page={page} onChange={handlePaginationChange} color="primary" count={10} showFirstButton showLastButton />
        </>
      )}
    </Box>
  )
}

export default GitHubIssues
