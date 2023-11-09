import {Component} from 'react'

class Home extends Component {
  state = {
    userData: [],
    requestState: 'Initial',
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    try {
      const response = await fetch(
        'https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc',
      )

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const parsedData = await response.json()
      console.log(parsedData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  render() {
    const {userData} = this.state

    return (
      <div>
        <h1>Github Repos Application</h1>
        <p>{userData}</p>
      </div>
    )
  }
}

export default Home
