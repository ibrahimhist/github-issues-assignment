import React, { useState } from 'react';

import { Box, TextField, Pagination, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { getGitHubIssueList } from '../../services/github.service';
import { IssueList } from './issue-list/IssueList';
import { Select } from '../core/select/Select';
import { BookmarkedIssuesButton } from './bookmarked-issues-button/BookmarkedIssuesButton';

import { IIssue } from '../../models/Issue.model';

const sortOptions = [
  { label: 'Created Date', value: 'created' },
  { label: 'Updated Date', value: 'updated' },
  { label: 'Comments Date', value: 'comments' }
];

export const GitHubIssues = () => {
  const [repoPath, setRepoPath] = useState<string>('facebook/react');
  const [prevRepoPath, setPrevRepoPath] = useState<string>('');

  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>('created');

  const [issueList, setIssueList] = useState<IIssue[]>([] as IIssue[]);
  const [bookmarkedIssues, setBookmarkedIssues] = useState<IIssue[]>([] as IIssue[]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleRepoPathChange = (event) => {
    setRepoPath(event.target.value || '');
  };

  const getIssues = (newPage?: number, newSortBy?: string) => {
    setLoading(true);
    setError(false);

    getGitHubIssueList(repoPath, newPage || page, newSortBy || sortBy)
      .then((response) => {
        if (prevRepoPath !== repoPath) setBookmarkedIssues([]);
        setIssueList(response.data);
      })
      .catch((e) => {
        setIssueList([]);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
        setPrevRepoPath(repoPath);
      });
  };

  const handleSearch = () => {
    getIssues();
  };
  const handlePaginationChange = (_: any, value: number) => {
    setPage(value);
    getIssues(value);
  };

  const handleSort = (e: string) => {
    setSortBy(e);
    getIssues(null, e);
  };

  const handleBookmark = (issue: IIssue) => {
    setBookmarkedIssues((prev) => {
      const currentIndex = prev.findIndex((x) => x.id === issue.id);
      const newBookmarks = [...prev];

      if (currentIndex === -1) newBookmarks.push(issue);
      else newBookmarks.splice(currentIndex, 1);

      return newBookmarks;
    });
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '500px',
        display: 'grid',
        gridGap: 16,
        height: '100vh',
        padding: 2,
        margin: '0 auto',
        gridTemplateRows: 'auto auto auto 1fr auto'
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          columnGap: 2
        }}
      >
        <TextField required value={repoPath} onChange={handleRepoPathChange} label="Repo Path" />
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
          <Box sx={{ overflow: 'auto' }}>
            <IssueList datasource={issueList} bookmarks={bookmarkedIssues} onChangeBookmark={handleBookmark} />
          </Box>
          <Pagination sx={{ justifyContent: 'center' }} page={page} onChange={handlePaginationChange} color="primary" count={10} showFirstButton showLastButton />
        </>
      )}
    </Box>
  );
};

export default GitHubIssues;
