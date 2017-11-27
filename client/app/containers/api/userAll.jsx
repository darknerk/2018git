import React,{Component} from 'react'

class UserAll extends React.Component {
  constructor(){
    super();
    this.state={
      users: []
    }
    
  }
  componentDidMount(){
    fetch('/auth/all')
    .then(response=>response.json())
    .then(data => {
      this.setState({ users: data })
    }) 
    .catch(error=> {
      console.log('There has been a problem with your fetch operation: ' + error.message)
    }); 
  }
  render() {
    return (<div> 
        {this.state.users.map(user =>
          <url key={user.username}>
            <li>{user.username}</li>
          </url>
        )}

      </div> 
    )
  }
}

export default UserAll;