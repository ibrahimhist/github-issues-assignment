import React, { useState } from 'react';

import { Dialog, DialogTitle, DialogContent, Button } from '@mui/material';

import { IssueList } from '../issue-list/IssueList';

import { IIssue } from '../../../models/Issue.model';

export type BookmarkedIssuesButtonProps = {
  bookmarkedIssues: IIssue[];
};

export const BookmarkedIssuesButton: React.FC<BookmarkedIssuesButtonProps> = ({ bookmarkedIssues = [] }) => {
  const [show, setShow] = useState<boolean>(false);

  const handleShow = () => {
    if (bookmarkedIssues.length) setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Button disableElevation color="secondary" variant="contained" disabled={bookmarkedIssues.length === 0} onClick={handleShow}>
        {bookmarkedIssues.length}
      </Button>

      <Dialog onClose={handleClose} open={show}>
        <DialogTitle>Bookmakred Issues</DialogTitle>
        <DialogContent>
          <IssueList datasource={bookmarkedIssues} hideBookmark />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookmarkedIssuesButton;
