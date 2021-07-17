import React, {useState} from "react";
import { Button, Card } from "react-bootstrap";
import ReactDOM from "react-dom";
import { WebsiteActions } from './WebsiteActions';
import * as Website from './Website';
import { SocialMediaHandles } from './Constants';
import { HTMLParsers } from "./HTMLParsers";
import PieChart from './PieChart';

const Popup = () => {

  const [state, setState] = useState(
    {
      newsViews: 0,
      miscViews: 0,
      socialMediaViews: 0,
      type: Website.WebsiteType.NA
    }
  )

  return (
    <div>
        <Card className="cardBody" style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title className="heading"> <i className="far fa-newspaper"></i> KNOW YOUR NEWS <i className="fas fa-search"></i></Card.Title>
            <PieChart newsViews={state.newsViews} socialMediaViews={state.socialMediaViews} miscViews={state.miscViews} type={state.type} />
          </Card.Body>
        </Card>
      </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);

