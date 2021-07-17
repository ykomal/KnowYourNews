import React, { useEffect } from "react";
var Component = React.Component;

interface Props {
  icon : string,
  link: string
}

class Links extends React.Component<Props, any> {
	constructor(props: any) {
    super(props);
	}
	render() {
    return (
      <div className="links">
        <a href={this.props.link} target="_blank">
          <i className={this.props.icon}></i>
        </a>
      </div>
		);
	}
}

export default Links;