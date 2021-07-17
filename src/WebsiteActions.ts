import * as Website from './Website';

export class WebsiteActions {
  websiteUrl: string

  constructor(websiteUrl: string) {
    this.websiteUrl = websiteUrl;
  }

  private getIndexOf(value: Website.WebsiteData[], websiteUrl: string, startTime: number) {
    value.forEach((val, index = 0) => {
      if (val.url === websiteUrl) {
        value[index].noOfTimesVisited = +value[index].noOfTimesVisited + 1;
        value[index].lastVisitDate = Website.getDateToday();
        value[index].totalTimeSpent += (Date.now() - startTime);
        return;
      }
    });
  }

  public getTotalViews(type: Website.WebsiteType) {
    return Website.getStorageData(type)
  }

  public getViews(type: Website.WebsiteType) {
    return this.getTotalViews(type)
    .then((value: any) => {
      return value;
    })
    .catch((error) => {
      alert(error);
    });
  }

  public parseViews(value: Website.WebsiteData[]) {
    var noOfTimes = 0
    value.forEach((val, index = 0) => {
      if (val.url.indexOf("://") === -1) {
        noOfTimes = value[index].noOfTimesVisited
      }
    });
    return new Promise((resolve, reject) => {
      resolve(noOfTimes);
    });
  }

  public AddWebsite(activeTabData: Website.ActiveTabData) {
    console.log("Add website");
    Website.getStorageData(activeTabData.type).then((value: Website.WebsiteData[]) => {
      var newsDataJson = JSON.stringify(value);
      if (value.length === 0) {
        value = [Website.getInitialWebsiteData(activeTabData.url, activeTabData.startTime)];
      }
      else if (newsDataJson.indexOf(activeTabData.url) === -1) {
        var currentWebsite = Website.getInitialWebsiteData(activeTabData.url, activeTabData.startTime);
        value.push(currentWebsite);
      }
      else {
        this.getIndexOf(value, activeTabData.url, activeTabData.startTime);
      }
      Website.setStorageData({ [activeTabData.type]: value });
    });
  }

  public AddActiveTab(url: string, type: Website.WebsiteType) {

    Website.getStorageData(Website.WebsiteType.ActiveTab).then((value: Website.ActiveTabData) => {
      console.log(value);
      if (value.type !== Website.WebsiteType.Misc) {
        this.AddWebsite(value);
      }

      value = Website.getInitialActiveTabData(url, type);
      Website.setStorageData({ [Website.WebsiteType.ActiveTab]: value });
    }).catch(() => {
      console.log("error active");
    });
  }

  public RemoveActiveTab() {

    Website.getStorageData(Website.WebsiteType.ActiveTab).then((value: Website.ActiveTabData) => {
      console.log(value);
      if (value.type !== Website.WebsiteType.Misc) {
        value.startTime += 2 * 60 * 1000; // adding 2 mins of inactivity time
        this.AddWebsite(value);
      }

      Website.setStorageData({ [Website.WebsiteType.ActiveTab]: {} });
    }).catch(() => {
      console.log("error active");
    });
  }
}

