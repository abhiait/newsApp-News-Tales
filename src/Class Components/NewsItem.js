import React, { Component } from "react";
import { Link } from "react-router-dom";

export class NewsItem extends Component {
  render() {
      let {title, description, imageUrl, newsUrl, author, source, date}= this.props;
    return (
      <div className="my-3 mx-2" style={{padding:'0'}}>
        <div className="card" >
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"100%", zIndex:"1"}}>
    {source}
   
  </span>
          <img className="card-img-top" src={!imageUrl?"https://minerescue.org/wp-content/uploads/2020/03/Marketplace-Lending-News.jpg":imageUrl} alt="Card cap" />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">
              {description}...
            </p>
            <p className="card-text"><small className="text-muted">By {!author?"unknown": author} on {new Date(date).toGMTString()}</small></p>
            <Link rel="noreferrer" to={newsUrl} target='_blank' className="btn btn-sm btn-primary">
              Read More
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
