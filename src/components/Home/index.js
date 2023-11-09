import React, {useEffect, useState} from 'react'
import './index.css'

function Home() {
  const [issues, setIssues] = useState([])
  const [datagi, setGitdata] = useState([])
  const [loading, setLoading] = useState(true)

  const [urlsuserapi, setApiUrl] = useState('')

  // Set the correct API URL here
  const onClickRepo = async () => {
    const api = document.getElementById('repourl').value // Assuming you want to get the value from an input element
    const username = 'chandrasekharrebba99'
    const token = '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'

    try {
      const response = await fetch(api, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${btoa(`${username}:${token}`)}`,
        },
      })

      if (response.ok) {
        const result = await response.json()
        console.log(result)
        setApiUrl(result)
      } else {
        console.error('Failed to fetch data from the API')
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error)
    }
  }

  useEffect(() => {
    // Replace with your GitHub username and personal access token
    const username = 'chandrasekharrebba99'
    const token = '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'

    // Construct the API URL
    const repoOwner = 'user' // Replace with the repository owner
    const repoName = 'repo' // Replace with the repository name
    const apiUrl = `https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc`

    // Make the authenticated request to GitHub API
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${btoa(`${username}:${token}`)}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        const dataArray = Object.values(data)

        // Slice and map the first 20 elements
        const alldata = dataArray.slice(0, 50)[2]

        const newfresh = alldata.map(arr => ({
          description: arr.description,
          stars: arr.stargazers_count,
          imageurl: arr.url,
          avatar: arr.owner.avatar_url,
          lastupdate: arr.created_at,
          noissues: arr.open_issues_count,
          name: arr.name,
        }))

        setIssues(newfresh)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
        setLoading(false)
      })
  }, [])
  console.log(issues)
  return (
    <div className="backdiv">
      <h1>GitHub Most Stared Repos</h1>
      <ul>
        {issues.map(item => (
          <li className="card" key={item.imageurl}>
            <img src={item.avatar} alt="Avatar" />
            <h2>name:{item.name}</h2>
            <p>description:{item.description}</p>
            <p>Stars: {item.stars}</p>
            <p>Last Update: {item.lastupdate}</p>
            <p>Open Issues: {item.noissues}</p>
            <button
              className="button"
              type="button"
              value={item.imageurl}
              id="repourl"
            >
              Repository URL
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
