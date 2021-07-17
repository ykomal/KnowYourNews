import React, { useEffect } from "react";
var Component = React.Component;
import ReactApexChart from "react-apexcharts";
import { WebsiteType } from './Website';
import { WebsiteActions } from './WebsiteActions';
import * as Website from './Website';
import { SocialMediaHandles } from './Constants';
import { HTMLParsers } from "./HTMLParsers";
import { Button, Card } from "react-bootstrap";
import CsvDownload from 'react-json-to-csv'
import {
  JsonToCsv,
  useJsonToCsv
} from 'react-json-csv';
const { saveAsCsv } = useJsonToCsv();

interface Props {
  data: []
}

class Report extends React.Component<Props, any> {
	constructor(props: any) {
		super(props);
    this.downloadFile = this.downloadFile.bind(this);
	}
	
  downloadFile() {
    console.log(this.props.data);
    const filename = 'Csv-file',
      fields = {
        "url": "URL",
        "noOfTimesVisited": "NO Of TIMES VISITED",
        "firstVisitDate": "FIRST VISIT DATE (yyyy-mm-dd)",
        "lastVisitDate": "LAST VISIT DATE (yyyy-mm-dd)",
        "totalTimeSpent": "TOTAL TIME SPENT"
      },
      style = {
        padding: "5px"
      },
      data = this.props.data,
      text = "Convert Json to Csv";
      saveAsCsv({ data, fields, filename })
  }

	render() {
		return (
      <div>
				<span className = "download"> <button className="downloadButton" onClick={this.downloadFile}> <i className="fa fa-download" aria-hidden="true"></i></button> <div className = "downloadText"> DOWNLOAD CSV </div></span>
			</div>
		);
	}
}

export default Report;