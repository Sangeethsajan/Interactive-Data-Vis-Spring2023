# Final portfolio

## List of Tutorials and Projects

| Section | Tutorial | Topic | Live Code | Deployed Website |
| ------ | ------ | ----- | ------ | ----- | 
| Section 1 | Tutorial 1 | Getting Started | [Code](https://github.com/Sangeethsajan/Interactive-Data-Vis-Spring2023/tree/main/1_1_getting_started) | [Website](https://sangeethsajan.github.io/Interactive-Data-Vis-Spring2023/1_1_getting_started/)
  | Section 1 | Tutorial 2 | Basic HTML | [Code](https://github.com/Sangeethsajan/Interactive-Data-Vis-Spring2023/tree/main/1_2_basic_html) | [Website](https://sangeethsajan.github.io/Interactive-Data-Vis-Spring2023/1_2_basic_html/)
| Section 1 | Tutorial 3 | Intro to JS | [Code](https://github.com/Sangeethsajan/Interactive-Data-Vis-Spring2023/tree/main/1_3_intro_to_js) | [Website](https://github.com/Sangeethsajan/Interactive-Data-Vis-Spring2023/tree/main/1_3_intro_to_js)
| Section 2 | Tutorial 1 | Quantities and Amounts | [Code](https://github.com/Sangeethsajan/Interactive-Data-Vis-Spring2023/tree/main/2_1_quantities_and_amounts) | [Website](https://sangeethsajan.github.io/Interactive-Data-Vis-Spring2023/2_1_quantities_and_amounts/)
| Section 2 | Tutorial 2 | Distributions | [Code](https://github.com/Sangeethsajan/Interactive-Data-Vis-Spring2023/tree/main/2_2_distributions) | [Website](https://sangeethsajan.github.io/Interactive-Data-Vis-Spring2023/2_2_distributions/)
| Section 2 | Tutorial 3 | Timeseries | [Code](https://github.com/Sangeethsajan/Interactive-Data-Vis-Spring2023/tree/main/2_3_time_series) | [Website](https://sangeethsajan.github.io/Interactive-Data-Vis-Spring2023/2_3_time_series/)
| Section 2 | Tutorial 4 | Geographic | [Code](https://github.com/Sangeethsajan/Interactive-Data-Vis-Spring2023/tree/main/2_4_geographic) | [Website](https://sangeethsajan.github.io/Interactive-Data-Vis-Spring2023/2_4_geographic/)
| Project | Project | Means of Transportation | [Code](https://github.com/Sangeethsajan/Interactive-Data-Vis-Spring2023/tree/main/Project/Main) | [Website](https://sangeethsajan.github.io/Interactive-Data-Vis-Spring2023/Project/Main/)

For doing this project I have formulated three research questions.
	1. Which state have the highest number of vehicles usage for traveling to work?
	2. Which is the most used means of transportation?
	3. What is the peak time which people are using various means of transportation?
  
This is obtained from this link. This is a part of the ACS survey. I’m selecting the data of 2021. From this dataset I’m using Labels(time frame and means of transportation) and States variables for the analysis. I believe since the means of transportation plays a major roles our day to day life, the project could give a great insight into the way everyone commute to work.

<img width="1440" alt="Screenshot 2023-05-15 at 8 54 54 PM" src="https://github.com/Sangeethsajan/Interactive-Data-Vis-Spring2023/assets/31395590/fb7edc6e-0268-42e9-abf4-4f4b81ec7fd2">
<img width="1439" alt="Screenshot 2023-05-15 at 8 57 48 PM" src="https://github.com/Sangeethsajan/Interactive-Data-Vis-Spring2023/assets/31395590/443ee755-1713-4fcc-89e6-720f87816f38">

## About the Data
I considered two dataset for implementation of the project, the MEANS OF TRANSPORTATION TO WORK BY TIME ARRIVING AT WORK FOR WORKPLACE GEOGRAPHY and HISPANIC OR LATINO, AND NOT HISPANIC OR LATINO BY RACE datasets from the data.census.gov website The first one have hour wise data of the means of transportaion for work by people in the different geographies and the second dataset contains state wise data of the people in different race.

Since the Means of Transportation dataset is much more interesting as it have the time wise data of various means of transportaion in different geographies, I'm selecting this dataset for the implementation of the project. Through this project I am trying to visualize

1. The Time ~ Geography(State) data,
2. The Time ~ Mode of Transporation data,
3. The Geography(State) ~ Mode of Transporation data

For the implementation, the page will contain graphs, which shows the Count and Mode of transportation in different axes and there will be a sliding control for controling the time. As we move the sliding controller, The graph will show the count of the mode of transportation at different time. The same will be replicated for the Geography also.

## Sketches
![20230418_140058](https://github.com/Sangeethsajan/Interactive-Data-Vis-Spring2023/assets/31395590/0384e54b-c7fe-4bfd-accf-c5607ebc36c8)

## Final Reflection

Final Reflection
While starting this course, I have Zero idea about interactive data visualization and never heard about D3.js But I do have a clear set of goals to learn interactive data visualization. Over the past 4 months, I learned about HTML, CSS, JavaScript and D3.js and completed few tutorials and projects. In the project, the first and foremost task is to take design decisions. For this I gathered feedbacks from different students from my classroom. This process helped me to arrive at a conclusion on what are the design methods that I need to use. For arriving a conclusion or a design decision, I need to take care of three different things, The first one is how I represent my data. Since I’m dealing the data related with states, I was confused between which graphs I should use, After the collab session, I gathered feedbacks from the peers and landed on Choropleth map, Scatter plot and box plot to show my data. The second thing is how the data should be shown in each plot. For that I arrived at a decision of fixing the name of the states at the x axis of the scatter and box plot. The third thing is the color to represent the choropleth map. After the collab session, I decided to go with the shades of blue since it is very pleasing a vibrant at the same time. Along with that while I was developing the box plot, I need to show different data of different vehicles at different time. After the first presentation may peers gave me a design idea on incorporating two dropdowns to switch between these data.

Creating the choropleth map was the most interesting job in the whole project. With little available recourses that too in older version of d3, developing the map was interesting. For this my experience in completing the tutorial in geographical map gave me a great push. After completing the project which includes a scatter plot, a box plot and a choropleth map I learned about the basics of scales and state management which is essential to become a data visualizing engineer. Plotting the latitude and longitude using the geo JSON files was an amazing job and I learned a lot about it. Another interesting thing that I learned was is to implement the tooltips. While creating the tooltips, it was not showing properly on the screen, as a result I need to debug the code in a deeper manner. This pushed me to investigate the documentation of the CSS. After some research I could rectify the errors and could easily show the tooltips in the correct position.

After the initial discussion with the peers, I had an idea about how should my whole project looks like. But one of my concerns was the third person understandability. Since I’m the person who created the project, I have the greater knowledge about the project. But that is not the case with a new person who see the project. After the presentation I got several feedback and critiques which made me understand on which areas that I need to concentrate. Rather than a static scatter plot that I initially designed, I created a dynamic one with varying time in the Y axis which will give user a better understandability in how time affects the total number of vehicles in each state. From the feedbacks I redeveloped the bar plot with two dropdown menus which can switch between the mode of transportation and the time of the day. One important update I added after the critiques were I added a landing page that shows relevant information about the whole data which gives the user, a glance about the Mode of travel, time and states.

My initial idea about the project includes bubble plot and pie chart for the representation of the data. For the representation of the number of different modes of transportation at different time, I initially thought of creating a pie chart embedded with a dropdown menu with time in it. But in the final version, it is replaced with a bar plot with two dropdown menus, one having the time of the day and the other having the mode of transportation. The second idea was to create a bubble plot where each bubble is a state and size of the bubble depends on the number of the means of transportation used by the people at a particular time. Later while developing the project, it was replaced with a choropleth map with different grade of color that differ according to the total number of each mode of transportation.

There were two major challenges that I faced while implementing this project. The first one in is the state management. There were a lot of confusions between the things that should be static in the webpage and the thing that should be dynamic in the webpage. Even though I had a clear picture in the mind, I couldn’t translate it to the code of the project. The second challenge in the version issues of the D3.js. While looking for the references on the internet it was hard to find the correct recourses for the D3 v6. These were the major challenges that I faced during creating the project. If I had more time, I would like to create map of each state and represent the means of transportation at different time.

From the experience that I got from doing the project and other tutorials I updated one of my class tutorials. I updated the vertical bar plot showing the various activities of the squirrels. The first updation that I done in the tutorial was to add a transition effect of loading the bar plot with a delay of 1000 ms for each bars. The second updation was adding the tooltip to each bars. In addition to that I also updated the code so as when the mouse is hover on a particular bar, the color and stroke will be changed.

