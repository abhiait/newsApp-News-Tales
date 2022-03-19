import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';


class News extends Component {

  static defaultProps = {
country : "in",
pageSize : 8,
category : "general"
  }

  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string,
  }
 capitalizeFirstLetter =(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
    constructor(props){
        super(props);
        // console.log('hello');
        this.state = {
            articles : [],
            loading: false,
            page:1
        }
document.title = `NewsTales-${this.capitalizeFirstLetter(this.props.category)}`
    }

async updatedNews(){
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ac3dff13e68f4c379fb8d996115f1871&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parsedData = await data.json();
      
      this.setState({articles : parsedData.articles,
         totalResults:parsedData.totalResults,
        loading:false
      })
}

   async componentDidMount(){
      this.updatedNews()
    }

    handlePrevClick = async()=>{
      // console.log('clicked prev')
      // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ac3dff13e68f4c379fb8d996115f1871&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
      // this.setState({loading:true});
      // let data = await fetch(url);
      // let parsedData = await data.json();
    
      // this.setState({
      //   articles : parsedData.articles,        
      //   page: this.state.page-1,
      //   loading: false
      // })
      this.setState({page:this.state.page -1})
      this.updatedNews()
    }

    handleNextClick =async ()=>{
      // console.log('clicked Next')
      // if (!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize) )){

      // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ac3dff13e68f4c379fb8d996115f1871&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      // this.setState({loading:true});
      // let data = await fetch(url);
      // let parsedData = await data.json();
    
      // this.setState({
      //   articles : parsedData.articles,        
      //   page: this.state.page+1,
      //   loading: false
      // })
      // }
      this.setState({page:this.state.page +1})
      this.updatedNews()
    }


  render() {
    return (
      <div className="container my-3"> 
      <h1 className="text-center" style={{marginTop:"90px"}}>
      News-Tales Headlines from {this.capitalizeFirstLetter(this.props.category)}
      </h1>
      {this.state.loading && <Spinner/>}
      <div className="row">
          {!this.state.loading && this.state.articles.map ( (element)=>{
              
              return <div className="col-md-4 my-3" key={element.url}>
                <NewsItem  title={element.title?element.title:""} description={element.description? element.description:""} 
                imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                </div>
              

          }
          )
          }
          
         
      </div>
      <div className="container my-3 d-flex justify-content-between">
      <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePrevClick}>&laquo; Previous</button>
      <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &raquo;</button>
      </div>

          
          
      </div>
    );
  }
}

export default News;
