import React, { useState } from "react"

import { Box, TextField, Pagination, Typography } from "@mui/material"
import { LoadingButton } from "@mui/lab"

import { getGitHubIssueList } from "../../services/github.service"
import { IssueList } from "./issue-list/IssueList"
import { Select } from "../core/select/Select"
import { BookmarkedIssuesButton } from "./bookmarked-issues-button/BookmarkedIssuesButton"

const sortOptions = [
  { label: "Created Date", value: "created" },
  { label: "Updated Date", value: "updated" },
  { label: "Comments Date", value: "comments" },
]

export const GitHubIssues = () => {
  const [repoPath, setRepoPath] = useState("facebook/react")
  const [prevRepoPath, setPrevRepoPath] = useState("")

  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState("created")

  const [issueList, setIssueList] = useState([])
  const [bookmarkedIssues, setBookmarkedIssues] = useState([])
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
        if (prevRepoPath !== repoPath) setBookmarkedIssues([])
        setIssueList(response.data)
      })
      .catch(e => {
        setIssueList([])
        setError(true)
      })
      .finally(() => {
        setLoading(false)
        setPrevRepoPath(repoPath)
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

  const handleBookmark = issue => {
    setBookmarkedIssues(prev => {
      const currentIndex = prev.findIndex(x => x.id === issue.id)
      const newBookmarks = [...prev]

      if (currentIndex === -1) newBookmarks.push(issue)
      else newBookmarks.splice(currentIndex, 1)

      return newBookmarks
    })
  }

  return (
    <Box sx={{ width: "100%", maxWidth: "500px", display: "grid", gridGap: 16, height: "100vh", padding: 2, margin: "0 auto", gridTemplateRows: "auto auto auto 1fr auto" }}>
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
          <Box>
            <Typography variant="subtitle2">
              Bookmark Count: <BookmarkedIssuesButton bookmarkedIssues={bookmarkedIssues} />
            </Typography>
          </Box>
          <Box sx={{ overflow: "auto" }}>
            <IssueList datasource={issueList} bookmarks={bookmarkedIssues} onChangeBookmark={handleBookmark} />
          </Box>
          <Pagination sx={{ justifyContent: "center" }} page={page} onChange={handlePaginationChange} color="primary" count={10} showFirstButton showLastButton />
        </>
      )}
    </Box>
  )
}

export default GitHubIssues
