import axios from "axios"

// https://api.github.com/repos/${repoPath}/issues
// https://docs.github.com/en/rest/reference/issues

// sort : created, updated, comments
// state: open, cloed, all
// per_page 30 max 100
// page = 1

const buildURLQuery = obj =>
  Object.entries(obj)
    .map(pair => pair.map(encodeURIComponent).join("="))
    .join("&")

export const getGitHubIssueList = async (repoPath, page = 1, sort = "created", state = "all") => {
  const searchParams = buildURLQuery({ page, sort, state })

  return axios.get(`https://api.github.com/repos/${repoPath}/issues?${searchParams}`)
}
