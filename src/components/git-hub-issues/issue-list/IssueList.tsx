import React, { useState } from 'react';

import { List, ListItem, ListItemText, Avatar, ListItemAvatar, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import { Star, StarOutline } from '@mui/icons-material';

import { IssueDetail } from '../issue-detail/IssueDetail';
import { IIssue } from '../../../models/Issue.model';

export type IssueListProps = {
  datasource: IIssue[];
  bookmarks?: IIssue[];
  onChangeBookmark?: (issue: IIssue) => void;
  hideBookmark?: boolean;
};

export const IssueList: React.FC<IssueListProps> = ({ datasource = [], bookmarks = [], onChangeBookmark, hideBookmark }) => {
  const [issueDetail, setIssueDetail] = useState<IIssue>();

  const showIssueDetail = (issue: IIssue) => setIssueDetail(issue);
  const handleClose = () => setIssueDetail(null);

  const isBookmarked = (id: string) => bookmarks.some((x) => x.id === id);
  const handleBookmarked = (e: any, issue: IIssue) => {
    e.stopPropagation();
    onChangeBookmark && onChangeBookmark(issue);
  };

  return (
    <>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {datasource.map((issue: IIssue) => {
          const bookmarked = isBookmarked(issue.id);
          return (
            <ListItem key={issue.id} onClick={() => showIssueDetail(issue)} sx={{ cursor: 'pointer' }}>
              {!hideBookmark && (
                <IconButton sx={{ mr: 1 }} onClick={(e) => handleBookmarked(e, issue)} color={bookmarked ? 'warning' : 'primary'}>
                  {bookmarked ? <Star /> : <StarOutline />}
                </IconButton>
              )}

              <ListItemAvatar>
                <Avatar alt={issue.title}>{issue.title[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={issue.title} secondary={new Date(issue.created_at).toLocaleDateString()} />
            </ListItem>
          );
        })}
      </List>

      <Dialog onClose={handleClose} open={!!issueDetail}>
        <DialogTitle>Issue Detail: {issueDetail?.title}</DialogTitle>
        <DialogContent>
          <IssueDetail issue={issueDetail} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default IssueList;
