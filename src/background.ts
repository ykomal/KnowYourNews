import React, {useState} from "react";
import { WebsiteActions } from './WebsiteActions';
import * as Website from './Website';
import { SocialMediaHandles } from './Constants';
import { HTMLParsers } from "./HTMLParsers";

const getWebsiteUrl = (tabs: any) => {
  var websiteUrl = '';
  const staticUrlFirst = '://';
  websiteUrl = tabs[0].url;
  const indexOfStaticUrl = websiteUrl.indexOf(staticUrlFirst);
  const indexOfNextSlash = websiteUrl.indexOf('/', indexOfStaticUrl + staticUrlFirst.length); // extracting website parent page 
  return websiteUrl.substring(0, indexOfNextSlash);
}
  
const handleOpenOptions = () => {
  chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
    function (tabs) {
      const websiteUrl = getWebsiteUrl(tabs);
      const websiteActions = new WebsiteActions(websiteUrl);
      
      console.log("website url" + websiteUrl);

      // getting website source code
      var request = Website.makeHttpObject();
      request.open("GET", websiteUrl, true);
      request.send(null);

      request.onreadystatechange = function() {
        if (request.readyState == 4) {
          let htmlParser = new HTMLParsers(request.responseText);
          var titleText = htmlParser.getTitleTagValue();
          var metaTags = Array.from(htmlParser.getTagsFromHead("meta"));

          if (titleText && titleText.indexOf("news") !== -1) {
            //chrome.browserAction.setIcon({path: 'icon-green.png'});
            websiteActions.AddActiveTab(websiteUrl, Website.WebsiteType.News);
          }
          else {
            // indicates whether the current website is news or not
            var flag = 0;

            // checking all the meta tags for news keyword
            metaTags.forEach((tag) => {
              if (tag.innerHTML.indexOf("news") !== -1) {
                flag = 1;
              }
            });

            if (!flag) {
              if (SocialMediaHandles.indexOf(websiteUrl) === -1) {
                websiteActions.AddActiveTab(websiteUrl, Website.WebsiteType.Misc);
              }
              else {
                websiteActions.AddActiveTab(websiteUrl, Website.WebsiteType.SocialMedia);
              }
            }
            else {
              websiteActions.AddActiveTab(websiteUrl, Website.WebsiteType.News);
            }
          };
        };
      };
    }
  );
  
}

chrome.tabs.onActivated.addListener(() => {
  setTimeout(() => { 
    handleOpenOptions()
  }, 500); 
});

chrome.idle.onStateChanged.addListener((newState) => {
  setTimeout(() => {
    console.log("new state : " + newState);
    if (newState !== 'active') {
      console.log("Hello");
      console.log("Hello");
      console.log("Hello");
      console.log("Hello");
      console.log("Hello");
      console.log("Hello");
      console.log("Hello");
      console.log("Hello");
      console.log("Hello");
    }
  }, 500); 
})
