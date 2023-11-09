import {Component} from 'react'

class Counter extends Component {
  state = {gitData: []}

  fetchData = async () => {
    try {
      const url =
        'https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc'
      const username = 'chandrasekharrebba99'
      const token = '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'
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Basic ${btoa(`${username}:${token}`)}`,
        },
      }
      const response = await fetch(url, options)

      if (response.ok) {
        const data = await response.json()
        // Assuming you want to update the 'gitData' state with the fetched data
        this.setState({gitData: data})
      } else {
        console.error('Failed to fetch data from GitHub API')
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error)
    }
  }

  render() {
    const {gitData} = this.state
    console.log(gitData)
    return (
      <div>
        <button type="button" onClick={this.onDecrement}>
          -
        </button>

        <div>0</div>
        <button type="button" onClick={this.onIncrement}>
          +
        </button>
      </div>
    )
  }
}

export default Counter
