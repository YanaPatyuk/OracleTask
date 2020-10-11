# Google guide-Oracle Full-stack technical test

By Yana Patyuk


##### The Best Guid for Google!
  - find where Images button
  - Understand how to search

##### How to run the guide?
1. Open google.com and make sure you are on English mode.
2. click ```ctrl+shift+i ```to open console.
3. To run player script you can copy-past to console ןin Input OR 
Go to Sources>clicked Snipped. add new Snniped and copy-paste the code there. right click on the new snipped>run.

##### How to run the Test?
1. Run the Test after running the guide itself(see above).
2. On console line, write 
```Testing() ```
and pess Enter.


## Assumptions
Since it was not clear how general the task should be so as to suit as many situations as possible, I had to make some assumptions.
1. Given that I do not have access to the server, it is not clear to me what to do with the "Remind me later" button. Although the current user phase could be saved locally, I chose not to build this option. Theoretically, it was possible at the beginning of the charge to check if there was a memory of the last stage performed. Also, it is my assumption that this is a step save for the purpose of continuing work.
2. There is no incorrect information in one of the entries. There is a check for an ERROR category error during the JSON callback, but no in-depth content check is performed. For example, if the ">" tag is missing in the tags, the program will crash.
3. The ```querySelector``` can't find text in css. Means, ```contains:``` not working and gives an error for ```.gb_g:contains("Images")```. I changed it to different query. More info:  https://www.w3.org/TR/selectors-3/#content-selectors 
4. Which style to choose? In the style tag, there are lots of options, I chose what looks the simplest that works.
5. The role of the "next". I assumed that the function of this tag is for the user to click on the image link without going to the image window but only to go to the next step in the guide. This assumption is due to the fact that the next step can only occur in the main Google window because the SELECTOR in the image tag does not find the location.
6. I'm not supposed to change the JSONP link. Otherwise, I would rename the CALLBACK function.


## Step location
I was unable to position the tag correctly. Currently, in the default mode the tag is placed after all the information. However, it is clear to me that it should be located close to the information to which it refers.
I tried to add it after I found the SELECTOR element and also inside the element, but in both situations the result does not look good. I guess one of the settings in the design can fix this, I have not yet figured out how to position correctly.
You can find in the script in the comment my attempts to place next to the text. While it works, it is not aesthetically pleasing.
I tried to keep the script as general as possible. I was able to accurately locate the location of the various elements, and then perform tests of what input I received. However, it felt like "cheating" to me.
