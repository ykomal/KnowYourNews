import React, { useEffect } from "react";
var Component = React.Component;
import ReactApexChart from "react-apexcharts";
import { WebsiteType } from './Website';
import { WebsiteActions } from './WebsiteActions';
import * as Website from './Website';
import { SocialMediaHandles } from './Constants';
import { HTMLParsers } from "./HTMLParsers";
import Report from './Report';
import { Chart } from "react-google-charts";
import Links from './Links';

interface Props {
	newsViews: number,
	socialMediaViews: number
	miscViews: number,
	type: Website.WebsiteType
}

class PieChart extends React.Component<Props, any> {
	constructor(props: any) {
		super(props);
		console.log("props : "+ this.props.newsViews);
		this.state = {
			newsViews: 0,
			miscViews: 0,
			socialMediaViews: 0,
			series:[],
			websiteDownloadInfo: [],
			websiteData: [
				['Language', 'Speakers (in millions)']
			],
			oldestLog: Website.getDateToday(),
			newestLog: "2020/08/08",
		};

		this.getInitialViews = this.getInitialViews.bind(this);
		this.updateState = this.updateState.bind(this);
	}

	compareDate(date1:string, date2: string){
		var d1=new Date(date1);
		var d2=new Date(date2);
		if(d1 > d2){
			return 1;
		}
		return 2;
	}

	updateState(type: Website.WebsiteType) {
		const websiteActions = new WebsiteActions('totalViews');
		websiteActions.getViews(type).then((value: Website.WebsiteData[]) => {
			console.log(value + "pie chart");
			value.forEach((val: Website.WebsiteData, index = 0) => {

				var newOptions = []
				newOptions.push(val.url)
				newOptions.push(val.totalTimeSpent/(1000*60))
				this.setState({
					websiteData: [...this.state.websiteData, newOptions],
				});

				var newWebsiteData = {
          url: val.url,
          noOfTimesVisited: val.noOfTimesVisited,
					firstVisitDate: val.firstVisitDate,
  				lastVisitDate: val.lastVisitDate,
        };

				if(this.compareDate(val.firstVisitDate, this.state.oldestLog) === 2){
					this.setState({
						oldestLog: val.firstVisitDate
					})
				}

				if(this.compareDate(val.lastVisitDate, this.state.newestLog) === 1){
					this.setState({
						newestLog: val.lastVisitDate
					})
				}

				this.setState({
					websiteDownloadInfo: [...this.state.websiteDownloadInfo, newWebsiteData],
				});
			});
		});
	}

	getInitialViews() {
		this.updateState(Website.WebsiteType.News);
		this.updateState(Website.WebsiteType.SocialMedia);
	}

	componentDidMount() {
		this.getInitialViews();
	}
	
	render() {
		return (
			<div id="chart" className="pieChartBody">
				<Chart
					style={{ fill: "black" }}
					width={'250px'}
					height={'250px'}
					chartType="PieChart"
					loader={<div>Loading Chart</div>}
					data={this.state.websiteData}
					options={{
						title: 'Websites visit count',
						legend: 'none',
						backgroundColor: 'black',
						is3D: true,
						pieSliceText: 'label',
						slices: {
						},
					}}
					rootProps={{ 'data-testid': '5' }}
				/>
				<div className = "leftElements"> 
					<div className="left">
						<i className="fad fa-calendar fa-2x"></i>
					</div>
					<div className="right">
						<p> OLDEST - RECENT LOG </p>
						<p className = "date"> {this.state.oldestLog} - {this.state.newestLog}</p>
					</div>
				</div>
				<div className = "rightElements">
					<Links link = "https://fontawesome.com/v5.15/icons/github" icon="fab fa-github" />
        	<Links link = "https://fontawesome.com/v5.15/icons/github" icon="fab fa-twitter" />
          <Links link = "https://fontawesome.com/v5.15/icons/github" icon="fab fa-discord" />
          <Links link = "https://fontawesome.com/v5.15/icons/github" icon="fas fa-envelope" />
          <div className="linksWithTexts">
						<a href="https://fontawesome.com/v5.15/icons/github" target="_blank">
							<i className="fab fa-neos notionIcon"></i>
							<div className="linkText">Know more</div>
						</a>
					</div>
				</div>
				<Report data = {this.state.websiteDownloadInfo} />
			</div>
		);
	}
}

export default PieChart;