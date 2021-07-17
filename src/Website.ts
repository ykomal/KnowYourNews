
export enum WebsiteType {
  News = "News",
  SocialMedia = "SocialMedia",
  Misc = "Miscellaneous",
  NA = "default",
  ActiveTab = "ActiveTab"
}

export interface WebsiteData {
  noOfTimesVisited: number,
  totalTimeSpent: number,
  url: string,
  firstVisitDate: string,
  lastVisitDate: string,
}

export interface ActiveTabData {
  url: string,
  type: WebsiteType,
  startTime: number,
}

export const synchronizeDataSaved = (type : WebsiteType) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(type, (data: any) => {
      switch (type) {
        case WebsiteType.News: resolve(data?.News??[]);
          break;
        case WebsiteType.SocialMedia: resolve(data?.SocialMedia??[]);
          break;
        case WebsiteType.Misc: resolve(data?.Miscellaneous??[]);
          break;
      }
      
    });
  });    
}

export const makeHttpObject = () => {
  try {return new XMLHttpRequest();}
  catch (error) {}
  try {return new ActiveXObject("Msxml2.XMLHTTP");}
  catch (error) {}
  try {return new ActiveXObject("Microsoft.XMLHTTP");}
  catch (error) {}

  throw new Error("Could not create HTTP request object.");
};

export const getDateToday = () => { 
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  var date = yyyy + '/' + mm + '/' + dd;
  console.log(date);
  return date;
};

export const getInitialWebsiteData = (url: string, startTime: number): WebsiteData => {
  return {
    url,
    noOfTimesVisited: 1,
    firstVisitDate: getDateToday(),
    lastVisitDate: getDateToday(),
    totalTimeSpent: Date.now() - startTime,
  };
}

export const getInitialActiveTabData = (url: string, type: WebsiteType): ActiveTabData => {
  return {
    url,
    type,
    startTime: Date.now()
  };
}

export const getStorageData = (key: WebsiteType) =>
  new Promise((resolve, reject) =>
    chrome.storage.sync.get(key, result => {
      if (chrome.runtime.lastError) {
        reject(Error(chrome.runtime.lastError.message));
      }
      else {
        console.log(result);
        console.log(key);
        switch (key) {
          case WebsiteType.News: resolve(result?.News??[]);
            break;
          case WebsiteType.SocialMedia: resolve(result?.SocialMedia??[]);
            break;
          case WebsiteType.Misc: resolve(result?.Miscellaneous??[]);
            break;
          case WebsiteType.ActiveTab: resolve(result?.ActiveTab ?? {});
            break;
        }
      }
    })
  )

export const setStorageData = (data: any) =>
  new Promise((resolve, reject) =>
    chrome.storage.sync.set(data, () =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve("success")
    )
  )
