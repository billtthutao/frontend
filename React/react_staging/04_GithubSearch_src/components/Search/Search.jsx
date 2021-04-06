import React,{Component} from 'react'
import axios from 'axios'

export default class Search extends Component{

    savekeyWord = (event) => {
      let keyWord = event.target.value;
      this.setState({keyWord})      
    }

    searchUsers = () => {
      this.props.updateAppState({users:[],isFirst:false,isLoading:true,isError:false,error:null})
      let {keyWord} = this.state;
      //axios
      axios.get(`/api1/search/users?q=${keyWord}`).then(
        response => {
          let users = [];
          response.data.items.forEach(item => {
            let user = {name:item.login,href:item.html_url,imgSrc:item.avatar_url}
            users.push(user)
          })
          this.props.updateAppState({users:users,isFirst:false,isLoading:false,isError:false,error:null})
        },
        error => {
          this.props.updateAppState({users:[],isFirst:false,isLoading:false,isError:true,error:error.message})
        }
      )
    }

    render(){
        return (
            <section className="jumbotron">
            <h3 className="jumbotron-heading">Search Github Users</h3>
            <div>
              <input onChange={this.savekeyWord} type="text" placeholder="enter the name you search"/>&nbsp;
              <button onClick={this.searchUsers}>Search</button>
            </div>
          </section>
        )
    }
}