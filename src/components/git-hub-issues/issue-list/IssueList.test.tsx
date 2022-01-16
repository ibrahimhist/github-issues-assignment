import React from 'react';

import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { IIssue } from '../../../models/Issue.model';
import { IssueList } from './IssueList';

const datasource: IIssue[] = [
  {
    id: '1',
    title: 'title',
    state: 'state',
    comments: 1,
    created_at: 'created_at',
    updated_at: 'updated_at',
    user: {
      login: 'login',
      avatar_url: 'avatar_url',
      html_url: 'html_url'
    },
    body: 'body'
  }
];

// data-testid={'bookmark-' + issue.id}

describe('Issue List Comp', () => {
  test('renders issue list if datasource provided', () => {
    // Arrange
    render(<IssueList datasource={datasource} />);
    //  Act
    const litItemElements = screen.getAllByRole('listitem');
    // Assertion
    expect(litItemElements).not.toHaveLength(0);
  });

  test('renders bookmarks (button) on default', () => {
    // Arrange
    const { getByTestId } = render(<IssueList datasource={datasource} />);
    //  Act
    const bookmarkButton = getByTestId('bookmark-' + datasource[0].id);
    // Assertion
    expect(bookmarkButton).toBeTruthy();
  });

  test('NOT renders bookmarks (button) if hideBookmark provided', () => {
    // Arrange
    const { queryByTestId } = render(<IssueList datasource={datasource} hideBookmark />);
    //  Act
    const bookmarkButton = queryByTestId('bookmark-' + datasource[0].id);
    // Assertion
    expect(bookmarkButton).not.toBeTruthy();
  });

  test('renders bookmarked icon if issue inside bookmarks list ', () => {
    // Arrange
    const { getByTestId } = render(<IssueList datasource={datasource} bookmarks={datasource} />);
    //  Act
    const bookmarkedIcon = getByTestId('bookmark-yes-' + datasource[0].id);
    // Assertion
    expect(bookmarkedIcon).toBeTruthy();
  });

  test('renders NOT bookmarked icon if issue not inside bookmarks list ', () => {
    // Arrange
    const { getByTestId } = render(<IssueList datasource={datasource} />);
    //  Act
    const bookmarkedIcon = getByTestId('bookmark-no-' + datasource[0].id);
    // Assertion
    expect(bookmarkedIcon).toBeTruthy();
  });

  test('on click bookmark should call onChangeBookmark', async () => {
    // Arrange
    const mockCallback = jest.fn();
    const { getByTestId } = render(<IssueList datasource={datasource} onChangeBookmark={mockCallback} />);

    //  Act
    const listItem = getByTestId('bookmark-' + datasource[0].id);
    fireEvent.click(listItem);

    // Assertion
    await waitFor(() => expect(mockCallback).toHaveBeenCalled());
  });

  test('on click issue should show Detail Dialog', () => {
    // Arrange
    const { getByTestId } = render(<IssueList datasource={datasource} />);
    //  Act
    const listItem = getByTestId('list-item-' + datasource[0].id);
    userEvent.click(listItem);

    // Assertion
    const dialog = getByTestId('detail-dialog');
    expect(dialog).toBeInTheDocument();
  });
});
